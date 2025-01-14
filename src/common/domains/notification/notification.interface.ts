import { NotificationProperties } from 'src/common/types/notification/notification.types';

export default interface INotification {
  update(): void;
  get(): NotificationProperties;
}
