import { ChatProperties, ChatToClientProperties, ChatToS3Properties } from './chat.properties';

export default interface IChat {
  toDB(): ChatProperties;
  toClient(): ChatToClientProperties;
  toS3(): ChatToS3Properties;
  setS3Key(s3key: string): IChat;
}
