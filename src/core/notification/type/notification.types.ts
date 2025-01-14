export interface NotificationProperties {
  id?: string;
  userId: string;
  content: string;
  isRead: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
