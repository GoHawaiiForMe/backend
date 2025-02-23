import { ChatRoomProperties } from './chatRoom.properties';

export default interface IChatRoom {
  toDB(): ChatRoomProperties;
  toClient(): ChatRoomProperties;
  update(data: { deActive?: boolean; chatId?: string }): void;
  getId(): string;
  getUserIds(): string[];
  getIsActive(): boolean;
}
