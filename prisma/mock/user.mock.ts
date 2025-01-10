import { Role } from '@prisma/client';

export const USERS = [
  {
    id: '66885a3c-50f4-427b-8a92-3702c6976fb0',
    email: 'dreamer1@test.com',
    nickName: '호랑이',
    phoneNumber: '01012341234',
    password: '12345678',
    role: Role.DREAMER,
    coconut: 1000
  },
  {
    id: '555d463e-37b6-410b-9061-11a9d6822bdd',
    email: 'dreamer2@test.com',
    nickName: '고양이',
    phoneNumber: '01012341234',
    password: '12345678',
    role: Role.DREAMER,
    coconut: 1000
  },
  {
    id: '30106a60-200d-467c-8b0d-5817ee604904',
    email: 'dreamer3@test.com',
    nickName: '하마',
    phoneNumber: '01012341234',
    password: '12345678',
    role: Role.DREAMER,
    coconut: 1000
  },
  {
    id: '4cb5e51b-072e-4ca2-a4ae-bf432ea8ef76',
    email: 'dreamer4@test.com',
    nickName: '돌고래',
    phoneNumber: '01012341234',
    password: '12345678',
    role: Role.DREAMER,
    coconut: 1000
  },
  {
    id: 'e5f67890-abcd-ef01-2345-6789012345de',
    email: 'dreamer5@test.com',
    nickName: '미어캣',
    phoneNumber: '01012341234',
    password: '12345678',
    role: Role.DREAMER,
    coconut: 1000
  },
  {
    id: '032d7bd4-116c-467b-9352-a14b0d494ef9',
    email: 'maker1@test.com',
    nickName: '장미',
    phoneNumber: '01012341234',
    password: '12345678',
    role: Role.MAKER,
    coconut: 1000
  },
  {
    id: 'ef846519-2b73-4be4-807e-f6ef1c07eb60',
    email: 'maker2@test.com',
    nickName: '아카시아',
    phoneNumber: '01012341234',
    password: '12345678',
    role: Role.MAKER,
    coconut: 1000
  },
  {
    id: 'a08d9856-adfa-4f83-9e9a-48401f3d0ef3',
    email: 'maker3@test.com',
    nickName: '개나리',
    phoneNumber: '01012341234',
    password: '12345678',
    role: Role.MAKER,
    coconut: 1000
  },
  {
    id: '6b4ded82-e680-410d-b86d-ce6974e53f37',
    email: 'maker4@test.com',
    nickName: '무궁화',
    phoneNumber: '01012341234',
    password: '12345678',
    role: Role.MAKER,
    coconut: 1000
  },
  {
    id: '49be61b8-0905-448a-8534-fe5b1a0004c2',
    email: 'maker5@test.com',
    nickName: '해바라기',
    phoneNumber: '01012341234',
    password: '12345678',
    role: Role.MAKER,
    coconut: 1000
  }
];
