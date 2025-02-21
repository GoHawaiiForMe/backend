import { TripType } from 'src/common/constants/tripType.type';

export interface NotificationProperties {
  id?: string;
  userId: string;
  event: keyof NotificationEvent;
  payload: NotificationEvent[keyof NotificationEvent];
  isRead?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface NotificationPayload {
  nickName?: string;
  tripType?: TripType;
  planTitle?: string;
}

export interface NotificationEvent {
  ARRIVE_QUOTE: { nickName: string; tripType: TripType };
  CONFIRM_QUOTE: { nickName: string };
  ARRIVE_REQUEST: { nickName: string; tripType: TripType };
  CONFIRM_REQUEST: { nickName: string };
  REJECT_REQUEST: { nickName: string; planTitle: string };
  REJECT_QUOTE: { nickName: string; planTitle: string };
  SCHEDULE: { planTitle: string };
}

export enum NotificationEventName {
  ARRIVE_QUOTE = 'ARRIVE_QUOTE',
  CONFIRM_QUOTE = 'CONFIRM_QUOTE',
  ARRIVE_REQUEST = 'ARRIVE_REQUEST',
  CONFIRM_REQUEST = 'CONFIRM_REQUEST',
  REJECT_REQUEST = 'REJECT_REQUEST',
  REJECT_QUOTE = 'REJECT_QUOTE',
  SCHEDULE = 'SCHEDULE'
}
