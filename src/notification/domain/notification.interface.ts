import { NotificationProperties } from '../type/notification.types';

export default interface INotification {
  update(): void;
  get(): NotificationProperties;
}
