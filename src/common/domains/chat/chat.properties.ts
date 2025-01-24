export interface ChatProperties {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  senderId: string | null;
  chatRoomId: string;
  content: string;
}
