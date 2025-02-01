export interface ChatQueryOptions {
  userId: string;
  chatRoomId?: string;
  page?: number;
  pageSize?: number;
}

export interface ChatCreateData {
  senderId: string;
  chatRoomId: string;
  content: string;
}
