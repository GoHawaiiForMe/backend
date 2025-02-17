import 'dotenv/config';

const TEST_CHAT_ROOMS = [
  {
    _id: '67a4bd750881d4415b0f304e',
    isDeletedAt: null,
    planId: '6d201a98-1d06-4497-806a-fa123599019a',
    planTitle: '서울 플랜13 견적',
    planTripDate: '2024-10-06T00:00:00.000Z',
    quotePrice: 170,
    userIds: ['032d7bd4-116c-467b-9352-a14b0d494ef9', '66885a3c-50f4-427b-8a92-3702c6976fb0'],
    chatIds: [],
    isActive: true
  },
  {
    _id: '67a4bd750881d4415b0f304f',
    isDeletedAt: null,
    planId: '9004bc52-a8b0-4587-af53-59914168582f',
    planTitle: '서울 플랜14 견적',
    planTripDate: '2024-10-08T00:00:00.000Z',
    quotePrice: 175,
    userIds: ['032d7bd4-116c-467b-9352-a14b0d494ef9', '66885a3c-50f4-427b-8a92-3702c6976fb0'],
    chatIds: [],
    isActive: false
  }
];
const PRODUCTION_CHAT_ROOMS = [
  {
    _id: '67a4bd750881d4415b0f304e',
    isDeletedAt: null,
    planId: '6d201a98-1d06-4497-806a-fa123599019a',
    planTitle: '서울 플랜13 견적',
    planTripDate: '2024-10-06T00:00:00.000Z',
    quotePrice: 170,
    userIds: ['032d7bd4-116c-467b-9352-a14b0d494ef9', '66885a3c-50f4-427b-8a92-3702c6976fb0'],
    chatIds: [],
    isActive: true
  },
  {
    _id: '67a4bd750881d4415b0f304f',
    isDeletedAt: null,
    planId: '9004bc52-a8b0-4587-af53-59914168582f',
    planTitle: '서울 플랜14 견적',
    planTripDate: '2024-10-08T00:00:00.000Z',
    quotePrice: 175,
    userIds: ['032d7bd4-116c-467b-9352-a14b0d494ef9', '66885a3c-50f4-427b-8a92-3702c6976fb0'],
    chatIds: [],
    isActive: true
  },
  {
    _id: '67a4bd750881d4415b0f3050',
    isDeletedAt: null,
    planId: '068eb509-ab56-4a95-b750-09be1e8db28e',
    planTitle: '경기 플랜15 견적',
    planTripDate: '2024-11-01T00:00:00.000Z',
    quotePrice: 180,
    userIds: ['a08d9856-adfa-4f83-9e9a-48401f3d0ef3', '555d463e-37b6-410b-9061-11a9d6822bdd'],
    chatIds: [],
    isActive: true
  },
  {
    _id: '67a4bd750881d4415b0f3051',
    isDeletedAt: null,
    planId: '07cb9492-2685-4890-806c-c0e502b9853e',
    planTitle: '경기 플랜16 견적',
    planTripDate: '2024-11-03T00:00:00.000Z',
    quotePrice: 170,
    userIds: ['a08d9856-adfa-4f83-9e9a-48401f3d0ef3', '555d463e-37b6-410b-9061-11a9d6822bdd'],
    chatIds: [],
    isActive: true
  },
  {
    _id: '67a4bd750881d4415b0f3052',
    isDeletedAt: null,
    planId: '156961b9-8bf1-48b0-81a2-f42ee99ea4df',
    planTitle: '경기 플랜17 견적',
    planTripDate: '2024-11-05T00:00:00.000Z',
    quotePrice: 170,
    userIds: ['a08d9856-adfa-4f83-9e9a-48401f3d0ef3', '30106a60-200d-467c-8b0d-5817ee604904'],
    chatIds: [],
    isActive: true
  },
  {
    _id: '67a4bd750881d4415b0f3053',
    isDeletedAt: null,
    planId: '1b3920d2-5489-400a-8488-207f242b8960',
    planTitle: '경기 플랜18 견적',
    planTripDate: '2024-11-07T00:00:00.000Z',
    quotePrice: 165,
    userIds: ['a08d9856-adfa-4f83-9e9a-48401f3d0ef3', '30106a60-200d-467c-8b0d-5817ee604904'],
    chatIds: [],
    isActive: true
  },
  {
    _id: '67a4bd750881d4415b0f3054',
    isDeletedAt: null,
    planId: '3acd4926-382a-48f2-b44c-c4055e30d07a',
    planTitle: '경기 플랜19 견적',
    planTripDate: '2024-11-09T00:00:00.000Z',
    quotePrice: 165,
    userIds: ['a08d9856-adfa-4f83-9e9a-48401f3d0ef3', '4cb5e51b-072e-4ca2-a4ae-bf432ea8ef76'],
    chatIds: [],
    isActive: true
  },
  {
    _id: '67a4bd750881d4415b0f3055',
    isDeletedAt: null,
    planId: '3cb4fe49-de44-43cc-b8b7-a52c6cc1c7a3',
    planTitle: '경기 플랜20 견적',
    planTripDate: '2024-11-11T00:00:00.000Z',
    quotePrice: 175,
    userIds: ['a08d9856-adfa-4f83-9e9a-48401f3d0ef3', '4cb5e51b-072e-4ca2-a4ae-bf432ea8ef76'],
    chatIds: [],
    isActive: true
  }
];

const CHAT_ROOMS = process.env.ENV === 'test' ? TEST_CHAT_ROOMS : PRODUCTION_CHAT_ROOMS;
export default CHAT_ROOMS;
