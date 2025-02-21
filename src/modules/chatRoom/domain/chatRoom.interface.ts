import { ChatRoomProperties } from './chatRoom.properties';

export default interface IChatRoom {
  toDB(): ChatRoomProperties;
  toClient(): ChatRoomProperties;
  update(): void;
  getId(): string;
  getUserIds(): string[];
  getIsActive(): boolean;
}
