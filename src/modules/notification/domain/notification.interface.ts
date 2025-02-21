import { NotificationProperties } from 'src/modules/notification/types/notification.types';

export default interface INotification {
  update(): void;
  get(): NotificationProperties;
}
