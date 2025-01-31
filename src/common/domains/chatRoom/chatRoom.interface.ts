import { ChatRoomProperties } from './chatRoom.properties';

export default interface IChatRoom {
  toDB(): ChatRoomProperties;
  toClient(): ChatRoomProperties;
  getId(): string;
  getUserIds(): string[];
  getIsActive(): boolean;
}
