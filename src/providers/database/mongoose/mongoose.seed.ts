import mongoose from 'mongoose';
import { ChatRoomModel } from './chatRoom.schema';
import { ChatModel } from './chat.schema';
import CHAT_ROOMS from './mock/chatRoom.mock';
import 'dotenv/config';

async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI);
}

export async function seed() {
  await connectDB();

  await ChatModel.deleteMany();
  await ChatRoomModel.deleteMany();

  await ChatRoomModel.insertMany(CHAT_ROOMS);

  console.log('🌱 Mongoose Seeding completed!');
  mongoose.connection.close();
}

seed().catch((e) => {
  console.error(e);
  mongoose.connection.close();
});
