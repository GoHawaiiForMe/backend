import { ChatRoomProperties } from './chatRoom.properties';

export default interface IChatRoom {
  toDB(): ChatRoomProperties;
  toClient(): ChatRoomProperties;
  getUserIds(): string[];
  getIsActive(): boolean;
}
