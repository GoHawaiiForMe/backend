export interface ChatRoomProperties {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  planId: string;
  userIds: string[];
  chatIds?: string[] | { content: string };
  lastChat?: string;
  isActive?: boolean;
}
