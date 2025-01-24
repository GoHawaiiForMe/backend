import { ChatObjectProperties, ChatProperties } from './chat.properties';

export default interface IChat {
  toDB(): ChatObjectProperties;
  toClient(): ChatProperties;
}
