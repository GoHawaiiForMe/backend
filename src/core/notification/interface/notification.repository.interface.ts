import INotification from '../domain/notification.interface';

export default interface INotificationRepository {
  get(userId: string): Promise<INotification[]>;
  create(userId: string, content: string): Promise<INotification>;
  update(id: string): Promise<INotification>;
}
