import { ChatProperties, ChatToClientProperties } from './chat.properties';

export default interface IChat {
  toDB(): ChatProperties;
  toClient(): ChatToClientProperties;
}
