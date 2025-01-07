import { Role } from '@prisma/client';

export const USERS = [
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-1234567890ef',
    email: 'dreamer1@test.com',
    nickName: '호랑이',
    phoneNumber: '01012341234',
    password: '12345678',
    role: Role.DREAMER
  },
  {
    id: 'b2c3d4e5-f678-90ab-cdef-2345678901ab',
    email: 'dreamer2@test.com',
    nickName: '고양이',
    phoneNumber: '01012341234',
    password: '12345678',
    role: Role.DREAMER
  },
  {
    id: 'c3d4e5f6-7890-abcd-ef01-3456789012bc',
    email: 'dreamer3@test.com',
    nickName: '하마',
    phoneNumber: '01012341234',
    password: '12345678',
    role: Role.DREAMER
  },
  {
    id: 'd4e5f678-90ab-cdef-0123-4567890123cd',
    email: 'dreamer4@test.com',
    nickName: '돌고래',
    phoneNumber: '01012341234',
    password: '12345678',
    role: Role.DREAMER
  },
  {
    id: 'e5f67890-abcd-ef01-2345-6789012345de',
    email: 'dreamer5@test.com',
    nickName: '미어캣',
    phoneNumber: '01012341234',
    password: '12345678',
    role: Role.DREAMER
  },
  {
    id: 'f1a2b3c4-d5e6-7890-1234-567890abcdef',
    email: 'maker1@test.com',
    nickName: '장미',
    phoneNumber: '01012341234',
    password: '12345678',
    role: Role.MAKER
  },
  {
    id: 'a2b3c4d5-e6f7-8901-2345-67890abcdef1',
    email: 'maker2@test.com',
    nickName: '아카시아',
    phoneNumber: '01012341234',
    password: '12345678',
    role: Role.MAKER
  },
  {
    id: 'b3c4d5e6-f789-0123-4567-890abcdef123',
    email: 'maker3@test.com',
    nickName: '개나리',
    phoneNumber: '01012341234',
    password: '12345678',
    role: Role.MAKER
  },
  {
    id: 'c4d5e6f7-8901-2345-6789-0abcdef12345',
    email: 'maker4@test.com',
    nickName: '무궁화',
    phoneNumber: '01012341234',
    password: '12345678',
    role: Role.MAKER
  },
  {
    id: 'd5e6f789-0123-4567-890a-bcdef1234567',
    email: 'maker5@test.com',
    nickName: '해바라기',
    phoneNumber: '01012341234',
    password: '12345678',
    role: Role.MAKER
  }
];
