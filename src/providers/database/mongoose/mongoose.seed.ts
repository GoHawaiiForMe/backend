import mongoose from 'mongoose';
import { ChatRoomModel } from './chatRoom.schema';
import { ChatModel } from './chat.schema';
import CHAT_ROOMS from './mock/chatRoom.mock';
import 'dotenv/config';
import CHATS from './mock/chat.mock';

async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI);
}
let isSeeded = false;
export async function mongooseSeed() {
  if (isSeeded) {
    return;
  }
  await connectDB();

  await ChatModel.deleteMany();
  await ChatRoomModel.deleteMany();

  const chatRooms = await ChatRoomModel.insertMany(CHAT_ROOMS);
  await ChatModel.insertMany(CHATS);

  console.log('🌱 Mongoose Seeding completed!');
  isSeeded = true;
  mongoose.connection.close();
}

mongooseSeed().catch((e) => {
  console.error(e);
  mongoose.connection.close();
});
