import 'dotenv/config';

const TEST_NOTIFICATIONS = [
  {
    _id: '67918968c27c4c4cfe5c47fe',
    isDeletedAt: null,
    userId: '66885a3c-50f4-427b-8a92-3702c6976fb0',
    event: 'ARRIVE_REQUEST',
    payload: { nickName: '호랑이', tripType: 'FOOD_TOUR' },
    isRead: false
  }
];
const PRODUCTION_NOTIFICATIONS = [{}];

const NOTIFICATIONS = process.env.ENV === 'test' ? TEST_NOTIFICATIONS : PRODUCTION_NOTIFICATIONS;
export default NOTIFICATIONS;
