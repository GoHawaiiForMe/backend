import 'dotenv/config';
import mongoose from 'mongoose';
import { ChatRoomModel } from './chatRoom.schema';
import { ChatModel } from './chat.schema';
import CHAT_ROOMS from './mock/chatRoom.mock';
import { NotificationModel } from './notification.schema';
import NOTIFICATIONS from './mock/notification.mock';

async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI);
}

export async function seed() {
  await connectDB();

  await ChatModel.deleteMany();
  await ChatRoomModel.deleteMany();
  await NotificationModel.deleteMany();

  await ChatRoomModel.insertMany(CHAT_ROOMS);
  await NotificationModel.insertMany(NOTIFICATIONS);

  console.log('🌱 Mongoose Seeding completed!');
  mongoose.connection.close();
}

seed().catch((e) => {
  console.error(e);
  mongoose.connection.close();
});
