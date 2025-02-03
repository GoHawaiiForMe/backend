export interface ChatReference {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  chatRoomId: string;
  senderId: string | null;
  content: string;
}

export interface FindChatRoomByIdOptions {
  userId: string;
  chatRoomId: string;
}
