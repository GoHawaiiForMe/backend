import { ChatType } from 'src/common/constants/chat.type';
import { ChatProperties, ChatToClientProperties, ChatToS3Properties } from './chat.properties';

export default interface IChat {
  toDB(): ChatProperties;
  toClient(): ChatToClientProperties;
  toS3(): ChatToS3Properties;
  setS3Key(s3key: string): void;
  getChatRoomId(): string;
  getSenderId(): string;
  getIsDeleted(): boolean;
  getChatType(): ChatType;
  getChatContent(): string;
}
