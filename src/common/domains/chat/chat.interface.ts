import { ChatProperties } from './chat.properties';

export default interface IChat {
  toDB(): ChatProperties;
  toClient(): ChatProperties;
}
