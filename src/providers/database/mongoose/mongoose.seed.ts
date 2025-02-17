import mongoose from 'mongoose';
import { ChatRoomModel } from './chatRoom.schema';
import { ChatModel } from './chat.schema';
import CHAT_ROOMS from './mock/chatRoom.mock';
import 'dotenv/config';

async function connectDB() {
  try {
    console.log(`process.env.MONGO_URI: ${process.env.MONGO_URI}`);
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB 연결 성공');
  } catch (error) {
    console.error('MongoDB 연결 실패', error);
  }
}

export async function seed() {
  await connectDB();

  await ChatModel.deleteMany();
  await ChatRoomModel.deleteMany();

  await ChatRoomModel.insertMany(CHAT_ROOMS);

  console.log('Mongoose 시딩 완료!');
  mongoose.connection.close();
}

seed().catch((error) => {
  console.error('시딩 실패', error);
  mongoose.connection.close();
});
