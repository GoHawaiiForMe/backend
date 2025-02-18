import 'dotenv/config';
import mongoose from 'mongoose';
import { ChatRoomModel } from './chatRoom.schema';
import { ChatModel } from './chat.schema';
import CHAT_ROOMS from './mock/chatRoom.mock';
import { NotificationModel } from './notification.schema';
import NOTIFICATIONS from './mock/notification.mock';
import CHATS from './mock/chat.mock';

async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI);
}
let isSeeded = false;
export async function mongooseSeed() {
  if (isSeeded) return;

  await connectDB();

  await ChatModel.deleteMany();
  await ChatRoomModel.deleteMany();
  await NotificationModel.deleteMany();

  await ChatRoomModel.insertMany(CHAT_ROOMS);
  await ChatModel.insertMany(CHATS);
  await NotificationModel.insertMany(NOTIFICATIONS);

  console.log('🌱 Mongoose Seeding completed!');
  isSeeded = true;
  mongoose.connection.close();
}

mongooseSeed().catch((e) => {
  console.error(e);
  mongoose.connection.close();
});
