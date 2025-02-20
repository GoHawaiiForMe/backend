import { ChatType } from 'src/common/constants/chat.type';
import 'dotenv/config';

const TEST_CHATS = [
  {
    _id: '67b32df2e96b9068eb17deae',
    type: ChatType.TEXT,
    senderId: '032d7bd4-116c-467b-9352-a14b0d494ef9',
    chatRoomId: '67b43a3c80d1dac1d2567382',
    content: '안녕하세요! 이 채팅방에 오신 걸 환영합니다.'
  },
  {
    _id: '67b32e0199d100acacbad373',
    isDeletedAt: new Date(),
    type: ChatType.TEXT,
    senderId: '66885a3c-50f4-427b-8a92-3702c6976fb0',
    chatRoomId: '67a4bd750881d4415b0f304e',
    content: '반갑습니다! 잘 부탁드려요.'
  },
  {
    _id: '67a4bd750881d4415b0f304f',
    isDeletedAt: null,
    type: ChatType.TEXT,
    senderId: '66885a3c-50f4-427b-8a92-3702c6976fb0',
    chatRoomId: '67a4bd750881d4415b0f304f',
    content: '반갑습니다! 잘 부탁드려요.'
  }
];
const PRODUCTION_CHATS = [
  {
    _id: '67b32df2e96b9068eb17deae',
    type: ChatType.TEXT,
    senderId: '032d7bd4-116c-467b-9352-a14b0d494ef9',
    chatRoomId: '67a4bd750881d4415b0f304e',
    content: '안녕하세요! 이 채팅방에 오신 걸 환영합니다.'
  },
  {
    _id: '67b32e0199d100acacbad373',
    isDeletedAt: new Date(),
    type: ChatType.TEXT,
    senderId: '66885a3c-50f4-427b-8a92-3702c6976fb0',
    chatRoomId: '67a4bd750881d4415b0f304e',
    content: '반갑습니다! 잘 부탁드려요.'
  }
  // {
  //   _id: '67a4bd750881d4415b0f304f',
  //   isDeletedAt: null,
  //   type: ChatType.TEXT,
  //   senderId: '66885a3c-50f4-427b-8a92-3702c6976fb0',
  //   chatRoomId: '67a4bd750881d4415b0f304f',
  //   content: '반갑습니다! 잘 부탁드려요.'
  // }
];

const CHATS = process.env.ENV === 'test' ? TEST_CHATS : PRODUCTION_CHATS;

export default CHATS;
