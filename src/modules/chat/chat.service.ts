import { forwardRef, Inject, Injectable } from '@nestjs/common';
import ChatRepository from './chat.repository';
import { ChatCreateData, ChatQueryOptions } from 'src/common/types/chat/chat.type';
import Chat from 'src/common/domains/chat/chat.domain';
import { ChatToClientProperties } from 'src/common/domains/chat/chat.properties';
import { FileUploadData } from 'src/common/types/chatRoom/chatRoom.type';
import { S3Service } from 'src/providers/storage/s3/s3.service';
import { ChatType } from 'src/common/constants/chat.type';
import ChatRoomService from '../chatRoom/chatRoom.service';
import BadRequestError from 'src/common/errors/badRequestError';
import ErrorMessage from 'src/common/constants/errorMessage.enum';
import NotFoundError from 'src/common/errors/notFoundError';
import ForbiddenError from 'src/common/errors/forbiddenError';
import ConflictError from 'src/common/errors/conflictError';
import { ORIGIN, RESIZE } from 'src/common/constants/s3.constants';

@Injectable()
export default class ChatService {
  constructor(
    private readonly chatRepository: ChatRepository,
    private readonly s3Service: S3Service,
    @Inject(forwardRef(() => ChatRoomService)) private readonly chatRoomService: ChatRoomService
  ) {}

  async getChatsByChatRoomId(
    options: ChatQueryOptions
  ): Promise<{ totalCount: number; list: ChatToClientProperties[] }> {
    const [totalCount, list] = await Promise.all([
      this.chatRepository.totalCount(options.chatRoomId),
      this.chatRepository.findChatsByChatRoomId(options)
    ]);

    const toClientListPromise = list?.map((chat) => this.convertToClient(chat.toClient()));
    const toClientList = await Promise.all(toClientListPromise);
    return { totalCount, list: toClientList };
  }

  async getChatDomain(data: { id: string; userId?: string }) {
    const { id, userId } = data || {};
    const chat = await this.chatRepository.findChatById(id);

    if (!chat) {
      throw new NotFoundError(ErrorMessage.CHAT_NOT_FOUND_ERROR);
    }

    if (userId) {
      const chatRoomId = chat.getChatRoomId();
      await this.chatRoomService.getChatRoomById({ userId, chatRoomId });
    } // NOTE. userId가 있으면 userId에 대한 권한체크

    return chat;
  }

  async getOriginFile(data: { id: string; userId: string }): Promise<string> {
    const chat = await this.getChatDomain(data);

    if (chat.getIsDeleted()) throw new BadRequestError(ErrorMessage.CHAT_IS_DELETE_FILE);
    if (chat.getChatType() === ChatType.TEXT) throw new BadRequestError(ErrorMessage.CHAT_IS_NOT_FILE);

    const presignedUrl = await this.updateContent({ type: chat.getChatType(), content: chat.getChatContent() }, true);
    return presignedUrl;
  }

  async postChat(data: ChatCreateData): Promise<ChatToClientProperties> {
    const chatData = Chat.create(data);
    const chat = await this.chatRepository.createChat(chatData);
    const convertChat = await this.convertToClient(chat.toClient());

    return convertChat;
  }

  async fileUpload(data: FileUploadData) {
    const chatData = Chat.create(data);
    const s3key = await this.s3Service.uploadFile(chatData.toS3());
    chatData.setS3Key(s3key);
    const chat = await this.chatRepository.createChat(chatData);
    const convertChat = await this.convertToClient(chat.toClient(), true);
    return convertChat;
  }

  async deleteChat(data: { id: string; userId: string }): Promise<void> {
    const { id, userId } = data;
    const chatDomain = await this.getChatDomain({ id });

    if (chatDomain.getSenderId() !== userId) {
      throw new ForbiddenError(ErrorMessage.CHAT_FORBIDDEN_DELETE);
    }

    if (chatDomain.getIsDeleted()) {
      throw new ConflictError(ErrorMessage.CHAT_CONFLICT_DELETE);
    }

    const chatRoomId = chatDomain.getChatRoomId();
    const isActive = await this.chatRoomService.getIsActiveById(chatRoomId);
    if (!isActive) throw new BadRequestError(ErrorMessage.CHAT_ROOM_NOT_IS_ACTIVE);

    await this.chatRepository.delete(id); //TODO. transaction
  }

  private handleDeletedMessage(chatData: ChatToClientProperties): ChatToClientProperties {
    const deletedMessages = {
      [ChatType.TEXT]: '삭제된 메시지입니다.',
      [ChatType.IMAGE]: '삭제된 이미지입니다.',
      [ChatType.VIDEO]: '삭제된 동영상입니다.'
    };

    return {
      ...chatData,
      content: deletedMessages[chatData.type] || '삭제된 콘텐츠입니다.',
      isDeleted: true
    };
  }

  private async updateContent(chatData: { type: ChatType; content: string }, isOrigin?: boolean): Promise<string> {
    const { type, content } = chatData;

    switch (type) {
      case ChatType.TEXT:
        return content;

      case ChatType.IMAGE:
        return isOrigin === true
          ? await this.s3Service.generatePresignedUrl(content, ORIGIN)
          : await this.s3Service.generatePresignedUrl(content, RESIZE);

      case ChatType.VIDEO:
        return await this.s3Service.generatePresignedUrl(content, ORIGIN);
    }
  }

  private async convertToClient(chatData: ChatToClientProperties, isOrigin?: boolean): Promise<ChatToClientProperties> {
    const { content, isDeletedAt, ...rest } = chatData;

    if (isDeletedAt) {
      const deletedMessage = this.handleDeletedMessage(chatData);
      return deletedMessage;
    }

    const updatedContent = await this.updateContent(chatData, isOrigin);
    return { ...rest, content: updatedContent, isDeleted: false };
  }
}
