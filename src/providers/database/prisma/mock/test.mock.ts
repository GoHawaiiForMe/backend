import { ProfileImageValues } from 'src/common/constants/image.type';
import { OAuthProviderValues } from 'src/common/constants/oauth.type';
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
  },
  {
    id: 'ef846519-2b73-4be4-807e-f6ef1c07eb60',
    email: 'maker2@test.com',
    nickName: '아카시아',
    phoneNumber: '01012341234',
    password: '12345678',
    role: RoleValues.MAKER,
    coconut: 1000
  },
  {
    id: 'ad3436a3-f163-4af7-8892-3a19f61894d0',
    nickName: '구글메이커',
    phoneNumber: '01012341234',
    role: RoleValues.MAKER,
    coconut: 1000,
    provider: OAuthProviderValues.GOOGLE,
    providerId: '1234'
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
  },
  {
    userId: 'ef846519-2b73-4be4-807e-f6ef1c07eb60',
    image: ProfileImageValues.DEFAULT_3,
    serviceTypes: [TripTypeValues.RELAXATION, TripTypeValues.SHOPPING],
    serviceArea: [ServiceAreaValues.SEOUL],
    gallery: 'https://www.instagram.com/codeit_kr/',
    description: '여행의 꿈을 대신 이루어 드립니다!',
    detailDescription:
      '안녕하세요! 여행을 좋아하고, 저희 지역을 소개하고 싶은 드림 메이커입니다 :) 드리머 여러분이 꿈꾸는 여행을 대신해서 이루어 드릴게요!'
  },
  {
    userId: 'ad3436a3-f163-4af7-8892-3a19f61894d0',
    image: ProfileImageValues.DEFAULT_3,
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

export const STATS = [
  {
    userId: '032d7bd4-116c-467b-9352-a14b0d494ef9',
    averageRating: 3.6875,
    totalReviews: 16,
    totalFollows: 10,
    totalConfirms: 20
  },
  {
    userId: 'ef846519-2b73-4be4-807e-f6ef1c07eb60',
    averageRating: 3.6875,
    totalReviews: 16,
    totalFollows: 10,
    totalConfirms: 20
  },
  {
    userId: 'ad3436a3-f163-4af7-8892-3a19f61894d0',
    averageRating: 3.6875,
    totalReviews: 16,
    totalFollows: 10,
    totalConfirms: 20
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
    id: '415037fb-b4da-43dc-a9e0-a68399fd5667',
    createdAt: '2024-09-02T00:00:00.000Z', // 5개월 전
    title: '플랜6타이틀',
    tripDate: '2025-03-02T00:00:00.000Z',
    tripType: TripTypeValues.FOOD_TOUR,
    serviceArea: ServiceAreaValues.SEOUL,
    details: '플랜6디테일',
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
  },
  {
    id: 'ded63481-0cbb-4556-acc5-9c193fd1643b',
    createdAt: '2024-12-27T00:00:00.000Z',
    title: '잠실 스카이타워 대신 올라가주세요',
    tripDate: '2025-01-27T00:00:00.000Z',
    tripType: TripTypeValues.ACTIVITY,
    serviceArea: ServiceAreaValues.SEOUL,
    details: '고소공포증이 있어서 메이커님이 대신 제가 스카이타워 올라가는 것처럼 영상 찍어주세요',
    status: StatusValues.COMPLETED,
    dreamerId: '66885a3c-50f4-427b-8a92-3702c6976fb0'
  }
];

export const QUOTES = [
  {
    id: '1c9cde67-ccbf-4c00-a53a-63d79f4772c3',
    createdAt: '2024-08-25T00:00:00.000Z',
    price: 175,
    content: '서울 플랜1 견적',
    planId: 'b198135d-9865-445b-a04b-742ca9939ee1',
    makerId: '032d7bd4-116c-467b-9352-a14b0d494ef9',
    isConfirmed: false,
    isAssigned: true
  },
  {
    id: 'f4a8cdbd-3f67-4e79-9056-8e80fe4dc7e7',
    createdAt: '2024-08-26T00:00:00.000Z',
    price: 165,
    content: '서울 플랜1 견적',
    planId: 'b198135d-9865-445b-a04b-742ca9939ee1',
    makerId: 'ef846519-2b73-4be4-807e-f6ef1c07eb60',
    isConfirmed: false,
    isAssigned: false
  },
  {
    id: '4cefee11-a095-4005-9158-67d3b49519ba',
    createdAt: '2024-10-03T00:00:00.000Z',
    price: 170,
    content: '서울 플랜6 견적',
    planId: '415037fb-b4da-43dc-a9e0-a68399fd5667',
    makerId: '032d7bd4-116c-467b-9352-a14b0d494ef9',
    isConfirmed: false,
    isAssigned: false
  },
  {
    id: '7f6babc8-5f5c-47e3-a626-bc9da5687b16',
    createdAt: '2024-12-28T00:00:00.000Z',
    price: 100,
    content: '높은 곳 좋아합니다!',
    planId: 'ded63481-0cbb-4556-acc5-9c193fd1643b',
    makerId: '032d7bd4-116c-467b-9352-a14b0d494ef9',
    isConfirmed: true,
    isAssigned: false
  }
];
