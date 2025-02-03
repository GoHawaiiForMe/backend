export interface ChatProperties {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  chatRoomId: string;
  senderId: string | null;
  content: string;
}

export interface ChatToClientProperties {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  chatRoomId: string;
  senderId: string | null;
  content: string;
}
