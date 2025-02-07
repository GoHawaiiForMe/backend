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
    const convertChat = await this.convertToClient(chat.toClient());
    return convertChat;
  }

  async deleteChat(id: string): Promise<void> {
    const isActive = await this.chatRoomService.isActiveByChatId(id);
    if (!isActive) {
      throw new BadRequestError(ErrorMessage.CHAT_ROOM_NOT_IS_ACTIVE);
    }
    const chat = await this.chatRepository.delete(id); //TODO. transaction
    if (!chat) throw new NotFoundError(ErrorMessage.CHAT_NOT_FOUND_ERROR);
    console.log(this.convertToClient(chat.toClient()));
  }

  private async convertToClient(chatData: ChatToClientProperties): Promise<ChatToClientProperties> {
    const { content, isDeletedAt, ...rest }: ChatToClientProperties = chatData;
    let updatedContent = content;

    if (isDeletedAt) {
      rest.isDeleted = true;
      switch (chatData.type) {
        case 'TEXT':
          updatedContent = '삭제된 메시지입니다.';
          break;
        case 'IMAGE':
          updatedContent = '삭제된 이미지입니다.';
          break;
        case 'VIDEO':
          updatedContent = '삭제된 동영상입니다.';
          break;
      }
    } else {
      rest.isDeleted = false;
      if (chatData.type === 'TEXT') {
        updatedContent = content;
      } else {
        updatedContent = await this.s3Service.generatePresignedUrl(content);
      }
    }

    return { ...rest, content: updatedContent };
  }
}
