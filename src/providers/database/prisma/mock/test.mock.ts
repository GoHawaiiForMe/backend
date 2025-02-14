import { ProfileImageValues } from 'src/common/constants/image.type';
import { RoleValues } from 'src/common/constants/role.type';
import { ServiceAreaValues } from 'src/common/constants/serviceArea.type';
import { StatusValues } from 'src/common/constants/status.type';
import { TripTypeValues } from 'src/common/constants/tripType.type';

export const USERS = [
  {
    id: '66885a3c-50f4-427b-8a92-3702c6976fb0',
    email: 'dreamer1@test.com',
    nickName: '호랑이',
    phoneNumber: '01012341234',
    password: '12345678',
    role: RoleValues.DREAMER,
    coconut: 1000
  },
  {
    id: '555d463e-37b6-410b-9061-11a9d6822bdd',
    email: 'dreamer2@test.com',
    nickName: '고양이',
    phoneNumber: '01012341234',
    password: '12345678',
    role: RoleValues.DREAMER,
    coconut: 1000
  },
  {
    id: '032d7bd4-116c-467b-9352-a14b0d494ef9',
    email: 'maker1@test.com',
    nickName: '장미',
    phoneNumber: '01012341234',
    password: '12345678',
    role: RoleValues.MAKER,
    coconut: 1000
  }
];
export const MAKER_PROFILES = [
  {
    userId: '032d7bd4-116c-467b-9352-a14b0d494ef9',
    image: ProfileImageValues.DEFAULT_4,
    serviceTypes: [TripTypeValues.RELAXATION, TripTypeValues.SHOPPING],
    serviceArea: [ServiceAreaValues.SEOUL],
    gallery: 'https://www.instagram.com/codeit_kr/',
    description: '여행의 꿈을 대신 이루어 드립니다!',
    detailDescription:
      '안녕하세요! 여행을 좋아하고, 저희 지역을 소개하고 싶은 드림 메이커입니다 :) 드리머 여러분이 꿈꾸는 여행을 대신해서 이루어 드릴게요!'
  }
];

export const DREAMER_PROFILES = [
  {
    userId: '66885a3c-50f4-427b-8a92-3702c6976fb0',
    tripTypes: [TripTypeValues.CULTURE],
    serviceArea: [ServiceAreaValues.BUSAN],
    image: ProfileImageValues.DEFAULT_1
  },
  {
    userId: '555d463e-37b6-410b-9061-11a9d6822bdd',
    tripTypes: [TripTypeValues.FOOD_TOUR, TripTypeValues.SHOPPING],
    serviceArea: [ServiceAreaValues.CHUNGNAM, ServiceAreaValues.SEOUL],
    image: ProfileImageValues.DEFAULT_2
  }
];

export const PLANS = [
  {
    id: 'b198135d-9865-445b-a04b-742ca9939ee1',
    createdAt: '2024-07-25T00:00:00.000Z',
    title: '플랜1타이틀', //OVERDUE
    tripDate: '2024-12-05T00:00:00.000Z',
    tripType: TripTypeValues.ACTIVITY,
    serviceArea: ServiceAreaValues.SEOUL,
    details: '플랜1디테일',
    status: StatusValues.OVERDUE,
    dreamerId: '66885a3c-50f4-427b-8a92-3702c6976fb0'
  },
  {
    id: '16865772-f792-4bb6-8ac8-504fcb4064e3',
    createdAt: '2024-09-01T00:00:00.000Z',
    title: '플랜5타이틀', //PENDING
    tripDate: '2025-03-01T00:00:00.000Z',
    tripType: TripTypeValues.ACTIVITY,
    serviceArea: ServiceAreaValues.SEOUL,
    details: '플랜5디테일',
    status: StatusValues.PENDING,
    dreamerId: '66885a3c-50f4-427b-8a92-3702c6976fb0'
  },
  {
    id: '6d201a98-1d06-4497-806a-fa123599019a',
    createdAt: '2024-09-09T00:00:00.000Z',
    title: '플랜13타이틀', //CONFIRMED
    tripDate: '2025-03-09T00:00:00.000Z',
    tripType: TripTypeValues.ACTIVITY,
    serviceArea: ServiceAreaValues.SEOUL,
    details: '플랜13디테일',
    status: StatusValues.CONFIRMED,
    dreamerId: '66885a3c-50f4-427b-8a92-3702c6976fb0',
    assignees: [{ id: '032d7bd4-116c-467b-9352-a14b0d494ef9' }]
  },
  {
    id: '9004bc52-a8b0-4587-af53-59914168582f',
    createdAt: '2024-09-10T00:00:00.000Z', // 5개월 전
    title: '플랜14타이틀',
    tripDate: '2025-03-10T00:00:00.000Z',
    tripType: TripTypeValues.FOOD_TOUR,
    serviceArea: ServiceAreaValues.SEOUL,
    details: '플랜14디테일',
    status: StatusValues.CONFIRMED,
    dreamerId: '66885a3c-50f4-427b-8a92-3702c6976fb0'
  }
];
