import { Role } from '@prisma/client';

export const USERS = [
  {
    id: 'a3f3f3b7-84a9-4b2c-8289-345f607c4626',
    email: 'user1@example.com',
    nickName: 'User One',
    phoneNumber: '01012345678',
    password: 'password123',
    role: Role.DREAMER
  },
  {
    id: 'd1d4e4d0-f4a3-40f3-a290-5d4cc7c75b90',
    email: 'user2@example.com',
    nickName: 'User Two',
    phoneNumber: '01098765432',
    password: 'password123',
    role: Role.MAKER
  }
];
