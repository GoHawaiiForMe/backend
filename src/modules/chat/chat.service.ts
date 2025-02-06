import { Injectable } from '@nestjs/common';
import ChatRepository from './chat.repository';
import { ChatCreateData, ChatQueryOptions } from 'src/common/types/chat/chat.type';
import Chat from 'src/common/domains/chat/chat.domain';
import { ChatToClientProperties } from 'src/common/domains/chat/chat.properties';
import { FileUploadData } from 'src/common/types/chatRoom/chatRoom.type';
import { S3Service } from 'src/providers/storage/s3/s3.service';
import { ChatType } from 'src/common/constants/chat.type';

@Injectable()
export default class ChatService {
  constructor(
    private readonly chatRepository: ChatRepository,
    private readonly s3Service: S3Service
  ) {}

  async getChatsByChatRoomId(
    options: ChatQueryOptions
  ): Promise<{ totalCount: number; list: ChatToClientProperties[] }> {
    const [totalCount, list] = await Promise.all([
      this.chatRepository.totalCount(options.chatRoomId),
      this.chatRepository.findChatsByChatRoomId(options)
    ]);

    const toClientListPromise = list?.map((chat) => this.convertS3PresignedUrl(chat.toClient()));
    const toClientList = await Promise.all(toClientListPromise);
    return { totalCount, list: toClientList };
  }

  async postChat(data: ChatCreateData): Promise<ChatToClientProperties> {
    const chatData = Chat.create(data);
    const chat = await this.chatRepository.createChat(chatData);
    return chat.toClient();
  }

  async fileUpload(data: FileUploadData) {
    const chatData = Chat.create(data);
    const s3key = await this.s3Service.uploadFile(chatData.toS3());
    chatData.setS3Key(s3key);
    const chat = await this.chatRepository.createChat(chatData);
    const chatWithPresignedUrl = await this.convertS3PresignedUrl(chat.toClient());
    return chatWithPresignedUrl;
  }

  private async convertS3PresignedUrl(chatData: ChatToClientProperties): Promise<ChatToClientProperties> {
    const { type, content } = chatData;
    if (type === ChatType.TEXT) return chatData;

    const presignedUrl = await this.s3Service.generatePresignedUrl(content);
    return { ...chatData, content: presignedUrl };
  }
}
