import { ChatRoomObjectProperties, ChatRoomProperties } from './chatRoom.properties';

export default interface IChatRoom {
  toDB(): ChatRoomObjectProperties;
  toClient(): ChatRoomProperties;
  toClientSingle(): ChatRoomProperties;
  getUserIds(): string[];
  getIsActive(): boolean;
}
