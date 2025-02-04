import { ServiceArea, Status, TripType } from '@prisma/client';

export const PLANS = [
  // OVERDUE 상태 (2024년 날짜)
  {
    id: 'b198135d-9865-445b-a04b-742ca9939ee1',
    createdAt: '2024-07-25T00:00:00.000Z', // 5개월 전
    title: '플랜1타이틀',
    tripDate: '2024-12-05T00:00:00.000Z',
    tripType: TripType.ACTIVITY,
    serviceArea: ServiceArea.SEOUL,
    details: '플랜1디테일',
    status: Status.OVERDUE,
    dreamerId: '66885a3c-50f4-427b-8a92-3702c6976fb0',
    assignees: [{ id: '032d7bd4-116c-467b-9352-a14b0d494ef9' }]
  },
  {
    id: '10502cab-f60f-4ba5-8031-abf89e367b01',
    createdAt: '2024-07-26T00:00:00.000Z', // 5개월 전
    title: '플랜2타이틀',
    tripDate: '2024-12-26T00:00:00.000Z',
    tripType: TripType.FOOD_TOUR,
    serviceArea: ServiceArea.SEOUL,
    details: '플랜2디테일',
    status: Status.OVERDUE,
    dreamerId: '555d463e-37b6-410b-9061-11a9d6822bdd',
    assignees: [{ id: '032d7bd4-116c-467b-9352-a14b0d494ef9' }]
  },
  {
    id: 'b32d8b23-76cc-45b9-b086-985c965829fb',
    createdAt: '2024-07-27T00:00:00.000Z', // 5개월 전
    title: '플랜3타이틀',
    tripDate: '2024-12-27T00:00:00.000Z',
    tripType: TripType.SHOPPING,
    serviceArea: ServiceArea.GYEONGGI,
    details: '플랜3디테일',
    status: Status.OVERDUE,
    dreamerId: '30106a60-200d-467c-8b0d-5817ee604904',
    assignees: [{ id: 'ef846519-2b73-4be4-807e-f6ef1c07eb60' }, { id: '032d7bd4-116c-467b-9352-a14b0d494ef9' }]
  },
  {
    id: 'febaa030-b1ee-4bc5-9e99-1c554831ac83',
    createdAt: '2024-07-28T00:00:00.000Z', // 5개월 전
    title: '플랜4타이틀',
    tripDate: '2024-12-28T00:00:00.000Z',
    tripType: TripType.CULTURE,
    serviceArea: ServiceArea.GYEONGGI,
    details: '플랜4디테일',
    status: Status.OVERDUE,
    dreamerId: '4cb5e51b-072e-4ca2-a4ae-bf432ea8ef76',
    assignees: [{ id: '032d7bd4-116c-467b-9352-a14b0d494ef9' }]
  },

  // PENDING 상태 (2025년 3월 이후)
  {
    id: '16865772-f792-4bb6-8ac8-504fcb4064e3',
    createdAt: '2024-09-01T00:00:00.000Z', // 5개월 전
    title: '플랜5타이틀',
    tripDate: '2025-03-01T00:00:00.000Z',
    tripType: TripType.ACTIVITY,
    serviceArea: ServiceArea.SEOUL,
    details: '플랜5디테일',
    status: Status.PENDING,
    dreamerId: '66885a3c-50f4-427b-8a92-3702c6976fb0',
    assignees: [{ id: '032d7bd4-116c-467b-9352-a14b0d494ef9' }]
  },
  {
    id: '415037fb-b4da-43dc-a9e0-a68399fd5667',
    createdAt: '2024-09-02T00:00:00.000Z', // 5개월 전
    title: '플랜6타이틀',
    tripDate: '2025-03-02T00:00:00.000Z',
    tripType: TripType.FOOD_TOUR,
    serviceArea: ServiceArea.SEOUL,
    details: '플랜6디테일',
    status: Status.PENDING,
    dreamerId: '66885a3c-50f4-427b-8a92-3702c6976fb0',
    assignees: [{ id: '032d7bd4-116c-467b-9352-a14b0d494ef9' }]
  },
  {
    id: '072bb272-bf10-4e9b-9334-41c4dc2504b8',
    createdAt: '2024-09-03T00:00:00.000Z', // 5개월 전
    title: '플랜7타이틀',
    tripDate: '2025-03-03T00:00:00.000Z',
    tripType: TripType.SHOPPING,
    serviceArea: ServiceArea.SEOUL,
    details: '플랜7디테일',
    status: Status.PENDING,
    dreamerId: '555d463e-37b6-410b-9061-11a9d6822bdd',
    assignees: [{ id: '032d7bd4-116c-467b-9352-a14b0d494ef9' }]
  },
  {
    id: 'e329c3de-3f36-46e2-8f01-baafcecbd8e4',
    createdAt: '2024-09-04T00:00:00.000Z', // 5개월 전
    title: '플랜8타이틀',
    tripDate: '2025-03-04T00:00:00.000Z',
    tripType: TripType.SHOPPING,
    serviceArea: ServiceArea.SEOUL,
    details: '플랜8디테일',
    status: Status.PENDING,
    dreamerId: '555d463e-37b6-410b-9061-11a9d6822bdd',
    assignees: [{ id: '032d7bd4-116c-467b-9352-a14b0d494ef9' }]
  },
  {
    id: '437bf5e9-f755-4764-bb4c-9c716632e8aa',
    createdAt: '2024-09-05T00:00:00.000Z', // 5개월 전
    title: '플랜9타이틀',
    tripDate: '2025-03-05T00:00:00.000Z',
    tripType: TripType.FESTIVAL,
    serviceArea: ServiceArea.SEOUL,
    details: '플랜9디테일',
    status: Status.PENDING,
    dreamerId: '30106a60-200d-467c-8b0d-5817ee604904',
    assignees: [{ id: '032d7bd4-116c-467b-9352-a14b0d494ef9' }]
  },
  {
    id: '7be7551a-44ae-41db-a344-c05b9a76ef5c',
    createdAt: '2024-09-06T00:00:00.000Z', // 5개월 전
    title: '플랜10타이틀',
    tripDate: '2025-03-06T00:00:00.000Z',
    tripType: TripType.FOOD_TOUR,
    serviceArea: ServiceArea.GYEONGGI,
    details: '플랜10디테일',
    status: Status.PENDING,
    dreamerId: '30106a60-200d-467c-8b0d-5817ee604904',
    assignees: [{ id: '032d7bd4-116c-467b-9352-a14b0d494ef9' }]
  },
  {
    id: '76db280a-af2b-4f0b-b7f6-a98a7456fa42',
    createdAt: '2024-09-07T00:00:00.000Z', // 5개월 전
    title: '플랜11타이틀',
    tripDate: '2025-03-07T00:00:00.000Z',
    tripType: TripType.SHOPPING,
    serviceArea: ServiceArea.GYEONGGI,
    details: '플랜11디테일',
    status: Status.PENDING,
    dreamerId: '4cb5e51b-072e-4ca2-a4ae-bf432ea8ef76',
    assignees: [{ id: '032d7bd4-116c-467b-9352-a14b0d494ef9' }]
  },
  {
    id: '62d8e271-03e2-4080-8428-44180813cde6',
    createdAt: '2024-09-08T00:00:00.000Z', // 5개월 전
    title: '플랜12타이틀',
    tripDate: '2025-03-08T00:00:00.000Z',
    tripType: TripType.CULTURE,
    serviceArea: ServiceArea.GYEONGGI,
    details: '플랜12디테일',
    status: Status.PENDING,
    dreamerId: '4cb5e51b-072e-4ca2-a4ae-bf432ea8ef76',
    assignees: [{ id: '032d7bd4-116c-467b-9352-a14b0d494ef9' }]
  },

  // CONFIRMED 상태 (2025년 3월 이후)
  {
    id: '6d201a98-1d06-4497-806a-fa123599019a',
    createdAt: '2024-09-09T00:00:00.000Z', // 5개월 전
    title: '플랜13타이틀',
    tripDate: '2025-03-09T00:00:00.000Z',
    tripType: TripType.ACTIVITY,
    serviceArea: ServiceArea.SEOUL,
    details: '플랜13디테일',
    status: Status.CONFIRMED,
    dreamerId: '66885a3c-50f4-427b-8a92-3702c6976fb0',
    assignees: [{ id: '032d7bd4-116c-467b-9352-a14b0d494ef9' }]
  },
  {
    id: '9004bc52-a8b0-4587-af53-59914168582f',
    createdAt: '2024-09-10T00:00:00.000Z', // 5개월 전
    title: '플랜14타이틀',
    tripDate: '2025-03-10T00:00:00.000Z',
    tripType: TripType.FOOD_TOUR,
    serviceArea: ServiceArea.SEOUL,
    details: '플랜14디테일',
    status: Status.CONFIRMED,
    dreamerId: '66885a3c-50f4-427b-8a92-3702c6976fb0',
    assignees: [{ id: '032d7bd4-116c-467b-9352-a14b0d494ef9' }]
  },
  {
    id: '068eb509-ab56-4a95-b750-09be1e8db28e',
    createdAt: '2024-09-11T00:00:00.000Z', // 5개월 전
    title: '플랜15타이틀',
    tripDate: '2025-03-11T00:00:00.000Z',
    tripType: TripType.SHOPPING,
    serviceArea: ServiceArea.GYEONGGI,
    details: '플랜15디테일',
    status: Status.CONFIRMED,
    dreamerId: '555d463e-37b6-410b-9061-11a9d6822bdd',
    assignees: [{ id: 'a08d9856-adfa-4f83-9e9a-48401f3d0ef3' }]
  },
  {
    id: '07cb9492-2685-4890-806c-c0e502b9853e',
    createdAt: '2024-09-12T00:00:00.000Z', // 5개월 전
    title: '플랜16타이틀',
    tripDate: '2025-03-12T00:00:00.000Z',
    tripType: TripType.CULTURE,
    serviceArea: ServiceArea.SEOUL,
    details: '플랜16디테일',
    status: Status.CONFIRMED,
    dreamerId: '555d463e-37b6-410b-9061-11a9d6822bdd'
  },
  {
    id: '156961b9-8bf1-48b0-81a2-f42ee99ea4df',
    createdAt: '2024-09-13T00:00:00.000Z', // 5개월 전
    title: '플랜17타이틀',
    tripDate: '2025-03-13T00:00:00.000Z',
    tripType: TripType.ACTIVITY,
    serviceArea: ServiceArea.GYEONGGI,
    details: '플랜17디테일',
    status: Status.CONFIRMED,
    dreamerId: '30106a60-200d-467c-8b0d-5817ee604904',
    assignees: [{ id: 'a08d9856-adfa-4f83-9e9a-48401f3d0ef3' }]
  },
  {
    id: '1b3920d2-5489-400a-8488-207f242b8960',
    createdAt: '2024-09-14T00:00:00.000Z', // 5개월 전
    title: '플랜18타이틀',
    tripDate: '2025-03-14T00:00:00.000Z',
    tripType: TripType.FOOD_TOUR,
    serviceArea: ServiceArea.GYEONGGI,
    details: '플랜18디테일',
    status: Status.CONFIRMED,
    dreamerId: '30106a60-200d-467c-8b0d-5817ee604904'
  },
  {
    id: '3acd4926-382a-48f2-b44c-c4055e30d07a',
    createdAt: '2024-09-15T00:00:00.000Z', // 5개월 전
    title: '플랜19타이틀',
    tripDate: '2025-03-15T00:00:00.000Z',
    tripType: TripType.SHOPPING,
    serviceArea: ServiceArea.GYEONGGI,
    details: '플랜19디테일',
    status: Status.CONFIRMED,
    dreamerId: '4cb5e51b-072e-4ca2-a4ae-bf432ea8ef76'
  },
  {
    id: '3cb4fe49-de44-43cc-b8b7-a52c6cc1c7a3',
    createdAt: '2024-09-16T00:00:00.000Z', // 5개월 전
    title: '플랜20타이틀',
    tripDate: '2025-03-16T00:00:00.000Z',
    tripType: TripType.CULTURE,
    serviceArea: ServiceArea.GYEONGGI,
    details: '플랜20디테일',
    status: Status.CONFIRMED,
    dreamerId: '4cb5e51b-072e-4ca2-a4ae-bf432ea8ef76',
    assignees: [{ id: 'a08d9856-adfa-4f83-9e9a-48401f3d0ef3' }]
  },

  // COMPLETED 상태 (2024년 날짜)
  {
    id: 'c1d848c2-2ee2-49c6-aad7-ed6933497d42',
    createdAt: '2024-05-25T00:00:00.000Z', // 5개월 전
    title: '플랜21타이틀',
    tripDate: '2024-11-25T00:00:00.000Z',
    tripType: TripType.ACTIVITY,
    serviceArea: ServiceArea.SEOUL,
    details: '플랜21디테일',
    status: Status.COMPLETED,
    dreamerId: '66885a3c-50f4-427b-8a92-3702c6976fb0',
    assignees: [{ id: 'a08d9856-adfa-4f83-9e9a-48401f3d0ef3' }]
  },
  {
    id: '5744034e-7c08-4a63-8cf5-e90579adcadf',
    createdAt: '2024-05-26T00:00:00.000Z', // 5개월 전
    title: '플랜22타이틀',
    tripDate: '2024-11-26T00:00:00.000Z',
    tripType: TripType.FOOD_TOUR,
    serviceArea: ServiceArea.SEOUL,
    details: '플랜22디테일',
    status: Status.COMPLETED,
    dreamerId: '66885a3c-50f4-427b-8a92-3702c6976fb0'
  },
  {
    id: '307449fd-b592-463e-80a4-862520b938e3',
    createdAt: '2024-05-27T00:00:00.000Z', // 5개월 전
    title: '플랜23타이틀',
    tripDate: '2024-11-27T00:00:00.000Z',
    tripType: TripType.SHOPPING,
    serviceArea: ServiceArea.SEOUL,
    details: '플랜23디테일',
    status: Status.COMPLETED,
    dreamerId: '555d463e-37b6-410b-9061-11a9d6822bdd'
  },
  {
    id: 'b4faa9ff-a867-481f-9fb4-a6e595c4efe0',
    createdAt: '2024-05-28T00:00:00.000Z', // 5개월 전
    title: '플랜24타이틀',
    tripDate: '2024-11-28T00:00:00.000Z',
    tripType: TripType.CULTURE,
    serviceArea: ServiceArea.SEOUL,
    details: '플랜24디테일',
    status: Status.COMPLETED,
    dreamerId: '555d463e-37b6-410b-9061-11a9d6822bdd',
    assignees: [{ id: 'a08d9856-adfa-4f83-9e9a-48401f3d0ef3' }]
  },
  {
    id: '6b314ec7-aeb4-4227-a332-ef72c16394eb',
    createdAt: '2024-05-29T00:00:00.000Z', // 5개월 전
    title: '플랜25타이틀',
    tripDate: '2024-11-29T00:00:00.000Z',
    tripType: TripType.ACTIVITY,
    serviceArea: ServiceArea.GYEONGGI,
    details: '플랜25디테일',
    status: Status.COMPLETED,
    dreamerId: '30106a60-200d-467c-8b0d-5817ee604904'
  },
  {
    id: 'de56436d-2662-4d43-9a8f-830f736f1dbf',
    createdAt: '2024-05-30T00:00:00.000Z', // 5개월 전
    title: '플랜26타이틀',
    tripDate: '2024-11-30T00:00:00.000Z',
    tripType: TripType.FOOD_TOUR,
    serviceArea: ServiceArea.GYEONGGI,
    details: '플랜26디테일',
    status: Status.COMPLETED,
    dreamerId: '30106a60-200d-467c-8b0d-5817ee604904',
    assignees: [{ id: 'a08d9856-adfa-4f83-9e9a-48401f3d0ef3' }]
  },
  {
    id: '2d09f3d4-39d1-423b-8806-23fdd2bac6e1',
    createdAt: '2024-06-01T00:00:00.000Z', // 5개월 전
    title: '플랜27타이틀',
    tripDate: '2024-12-01T00:00:00.000Z',
    tripType: TripType.SHOPPING,
    serviceArea: ServiceArea.GYEONGGI,
    details: '플랜27디테일',
    status: Status.COMPLETED,
    dreamerId: '4cb5e51b-072e-4ca2-a4ae-bf432ea8ef76',
    assignees: [{ id: 'a08d9856-adfa-4f83-9e9a-48401f3d0ef3' }]
  },
  {
    id: '5fea4a39-5853-40c2-802a-41960bdc4fcb',
    createdAt: '2024-06-02T00:00:00.000Z', // 5개월 전
    title: '플랜28타이틀',
    tripDate: '2024-12-02T00:00:00.000Z',
    tripType: TripType.CULTURE,
    serviceArea: ServiceArea.GYEONGGI,
    details: '플랜28디테일',
    status: Status.COMPLETED,
    dreamerId: '4cb5e51b-072e-4ca2-a4ae-bf432ea8ef76'
  },
  /********************************************************************** */
  {
    id: '64a5676a-0dee-4d14-ad5f-8dd0cdb0fa21',
    createdAt: '2025-01-05T00:00:00.000Z', // 5개월 전
    title: '플랜29타이틀',
    tripDate: '2025-04-05T00:00:00.000Z',
    tripType: TripType.ACTIVITY,
    serviceArea: ServiceArea.SEOUL,
    details: '플랜1디테일',
    status: Status.PENDING,
    dreamerId: '66885a3c-50f4-427b-8a92-3702c6976fb0',
    assignees: [{ id: '032d7bd4-116c-467b-9352-a14b0d494ef9' }]
  },
  {
    id: '9f619a84-5a27-4ae2-94dc-fbd4a5bdba28',
    createdAt: '2025-01-06T00:00:00.000Z', // 5개월 전
    title: '플랜30타이틀',
    tripDate: '2025-04-06T00:00:00.000Z',
    tripType: TripType.CULTURE,
    serviceArea: ServiceArea.SEOUL,
    details: '플랜1디테일',
    status: Status.PENDING,
    dreamerId: '66885a3c-50f4-427b-8a92-3702c6976fb0',
    assignees: [{ id: '032d7bd4-116c-467b-9352-a14b0d494ef9' }]
  },
  {
    id: '6e624f6f-bf11-4c84-b53a-8635a2f79f92',
    createdAt: '2025-01-07T00:00:00.000Z', // 5개월 전
    title: '플랜31타이틀',
    tripDate: '2025-04-07T00:00:00.000Z',
    tripType: TripType.FESTIVAL,
    serviceArea: ServiceArea.SEOUL,
    details: '플랜1디테일',
    status: Status.PENDING,
    dreamerId: '66885a3c-50f4-427b-8a92-3702c6976fb0',
    assignees: [{ id: '032d7bd4-116c-467b-9352-a14b0d494ef9' }]
  },
  {
    id: '6d3557a3-f6ad-4413-97f0-923fadec4a3f',
    createdAt: '2025-01-08T00:00:00.000Z', // 5개월 전
    title: '플랜32타이틀',
    tripDate: '2025-04-08T00:00:00.000Z',
    tripType: TripType.FOOD_TOUR,
    serviceArea: ServiceArea.SEOUL,
    details: '플랜1디테일',
    status: Status.PENDING,
    dreamerId: '66885a3c-50f4-427b-8a92-3702c6976fb0',
    assignees: [{ id: '032d7bd4-116c-467b-9352-a14b0d494ef9' }]
  },
  {
    id: '4d9fdaa5-daf0-4c74-a14b-c20f5d769a6f',
    createdAt: '2025-01-09T00:00:00.000Z', // 5개월 전
    title: '플랜33타이틀',
    tripDate: '2025-04-09T00:00:00.000Z',
    tripType: TripType.RELAXATION,
    serviceArea: ServiceArea.SEOUL,
    details: '플랜1디테일',
    status: Status.PENDING,
    dreamerId: '66885a3c-50f4-427b-8a92-3702c6976fb0',
    assignees: [{ id: '032d7bd4-116c-467b-9352-a14b0d494ef9' }]
  },
  {
    id: '1fae7b51-a14e-450d-8c71-777bfa429185',
    createdAt: '2025-01-10T00:00:00.000Z', // 5개월 전
    title: '플랜34타이틀',
    tripDate: '2025-04-10T00:00:00.000Z',
    tripType: TripType.SHOPPING,
    serviceArea: ServiceArea.SEOUL,
    details: '플랜1디테일',
    status: Status.PENDING,
    dreamerId: '66885a3c-50f4-427b-8a92-3702c6976fb0',
    assignees: [{ id: '032d7bd4-116c-467b-9352-a14b0d494ef9' }]
  },
  {
    id: '34a5c86e-f587-4bf0-b671-8a177fa2331f',
    createdAt: '2025-01-11T00:00:00.000Z', // 5개월 전
    title: '플랜35타이틀',
    tripDate: '2025-04-11T00:00:00.000Z',
    tripType: TripType.ACTIVITY,
    serviceArea: ServiceArea.SEOUL,
    details: '플랜1디테일',
    status: Status.PENDING,
    dreamerId: '66885a3c-50f4-427b-8a92-3702c6976fb0',
    assignees: [{ id: '032d7bd4-116c-467b-9352-a14b0d494ef9' }]
  },
  {
    id: 'caa9876f-b3a8-4f7d-b137-316ddba3ac78',
    createdAt: '2025-01-12T00:00:00.000Z', // 5개월 전
    title: '플랜36타이틀',
    tripDate: '2025-04-12T00:00:00.000Z',
    tripType: TripType.CULTURE,
    serviceArea: ServiceArea.SEOUL,
    details: '플랜1디테일',
    status: Status.PENDING,
    dreamerId: '66885a3c-50f4-427b-8a92-3702c6976fb0',
    assignees: [{ id: '032d7bd4-116c-467b-9352-a14b0d494ef9' }]
  },
  {
    id: '953b4831-2db5-4eb5-b8bf-56624e227a92',
    createdAt: '2025-01-13T00:00:00.000Z', // 5개월 전
    title: '플랜37타이틀',
    tripDate: '2025-04-13T00:00:00.000Z',
    tripType: TripType.FESTIVAL,
    serviceArea: ServiceArea.SEOUL,
    details: '플랜1디테일',
    status: Status.PENDING,
    dreamerId: '66885a3c-50f4-427b-8a92-3702c6976fb0',
    assignees: [{ id: '032d7bd4-116c-467b-9352-a14b0d494ef9' }]
  },
  {
    id: '10ceb118-9682-4c9e-9841-bca818022369',
    createdAt: '2025-01-14T00:00:00.000Z', // 5개월 전
    title: '플랜38타이틀',
    tripDate: '2025-04-14T00:00:00.000Z',
    tripType: TripType.FOOD_TOUR,
    serviceArea: ServiceArea.SEOUL,
    details: '플랜1디테일',
    status: Status.PENDING,
    dreamerId: '66885a3c-50f4-427b-8a92-3702c6976fb0',
    assignees: [{ id: '032d7bd4-116c-467b-9352-a14b0d494ef9' }]
  },
  /** dreamer1, maker1 리뷰 생성용 목데이터 */
  {
    id: 'cf7abc6d-eca3-405a-bf6e-9071802b78ca',
    createdAt: '2024-12-27T00:00:00.000Z',
    title: '잠실 스카이타워 대신 올라가주세요',
    tripDate: '2025-01-27T00:00:00.000Z',
    tripType: TripType.ACTIVITY,
    serviceArea: ServiceArea.SEOUL,
    details: '고소공포증이 있어서 메이커님이 대신 제가 스카이타워 올라가는 것처럼 영상 찍어주세요',
    status: Status.COMPLETED,
    dreamerId: '66885a3c-50f4-427b-8a92-3702c6976fb0'
  },
  {
    id: 'fc83c658-e960-4f50-bbad-390deda3979c',
    createdAt: '2024-12-27T00:00:00.000Z',
    title: '잠실 스카이타워 대신 올라가주세요',
    tripDate: '2025-01-27T00:00:00.000Z',
    tripType: TripType.ACTIVITY,
    serviceArea: ServiceArea.SEOUL,
    details: '고소공포증이 있어서 메이커님이 대신 제가 스카이타워 올라가는 것처럼 영상 찍어주세요',
    status: Status.COMPLETED,
    dreamerId: '66885a3c-50f4-427b-8a92-3702c6976fb0'
  },
  {
    id: 'feccc484-4dce-48c0-8ccb-ffaeba1aca91',
    createdAt: '2024-12-27T00:00:00.000Z',
    title: '잠실 스카이타워 대신 올라가주세요',
    tripDate: '2025-01-27T00:00:00.000Z',
    tripType: TripType.ACTIVITY,
    serviceArea: ServiceArea.SEOUL,
    details: '고소공포증이 있어서 메이커님이 대신 제가 스카이타워 올라가는 것처럼 영상 찍어주세요',
    status: Status.COMPLETED,
    dreamerId: '66885a3c-50f4-427b-8a92-3702c6976fb0'
  },
  {
    id: '62fa5235-b585-4e9a-8656-9bdc193f7349',
    createdAt: '2024-12-27T00:00:00.000Z',
    title: '잠실 스카이타워 대신 올라가주세요',
    tripDate: '2025-01-27T00:00:00.000Z',
    tripType: TripType.ACTIVITY,
    serviceArea: ServiceArea.SEOUL,
    details: '고소공포증이 있어서 메이커님이 대신 제가 스카이타워 올라가는 것처럼 영상 찍어주세요',
    status: Status.COMPLETED,
    dreamerId: '66885a3c-50f4-427b-8a92-3702c6976fb0'
  },
  {
    id: '0f61f8b9-7b29-4b82-86c7-f7ce8e418baa',
    createdAt: '2024-12-27T00:00:00.000Z',
    title: '잠실 스카이타워 대신 올라가주세요',
    tripDate: '2025-01-27T00:00:00.000Z',
    tripType: TripType.ACTIVITY,
    serviceArea: ServiceArea.SEOUL,
    details: '고소공포증이 있어서 메이커님이 대신 제가 스카이타워 올라가는 것처럼 영상 찍어주세요',
    status: Status.COMPLETED,
    dreamerId: '66885a3c-50f4-427b-8a92-3702c6976fb0'
  },
  {
    id: 'b89de5c8-da59-4400-b6b8-87a2badae2ab',
    createdAt: '2024-12-27T00:00:00.000Z',
    title: '잠실 스카이타워 대신 올라가주세요',
    tripDate: '2025-01-27T00:00:00.000Z',
    tripType: TripType.ACTIVITY,
    serviceArea: ServiceArea.SEOUL,
    details: '고소공포증이 있어서 메이커님이 대신 제가 스카이타워 올라가는 것처럼 영상 찍어주세요',
    status: Status.COMPLETED,
    dreamerId: '66885a3c-50f4-427b-8a92-3702c6976fb0'
  },
  {
    id: '0a171359-56da-4384-9f54-36cb796e5412',
    createdAt: '2024-12-27T00:00:00.000Z',
    title: '잠실 스카이타워 대신 올라가주세요',
    tripDate: '2025-01-27T00:00:00.000Z',
    tripType: TripType.ACTIVITY,
    serviceArea: ServiceArea.SEOUL,
    details: '고소공포증이 있어서 메이커님이 대신 제가 스카이타워 올라가는 것처럼 영상 찍어주세요',
    status: Status.COMPLETED,
    dreamerId: '66885a3c-50f4-427b-8a92-3702c6976fb0'
  },
  {
    id: '8c10d119-d5fe-4773-bd26-0d47cd57f530',
    createdAt: '2024-12-27T00:00:00.000Z',
    title: '잠실 스카이타워 대신 올라가주세요',
    tripDate: '2025-01-27T00:00:00.000Z',
    tripType: TripType.ACTIVITY,
    serviceArea: ServiceArea.SEOUL,
    details: '고소공포증이 있어서 메이커님이 대신 제가 스카이타워 올라가는 것처럼 영상 찍어주세요',
    status: Status.COMPLETED,
    dreamerId: '66885a3c-50f4-427b-8a92-3702c6976fb0'
  },
  {
    id: '9a411e0b-7a54-4c84-b9fb-53cddbce5485',
    createdAt: '2024-12-27T00:00:00.000Z',
    title: '잠실 스카이타워 대신 올라가주세요',
    tripDate: '2025-01-27T00:00:00.000Z',
    tripType: TripType.ACTIVITY,
    serviceArea: ServiceArea.SEOUL,
    details: '고소공포증이 있어서 메이커님이 대신 제가 스카이타워 올라가는 것처럼 영상 찍어주세요',
    status: Status.COMPLETED,
    dreamerId: '66885a3c-50f4-427b-8a92-3702c6976fb0'
  },
  {
    id: 'e6df9e0b-f3d2-42cf-a4b9-998ca536f93e',
    createdAt: '2024-12-27T00:00:00.000Z',
    title: '잠실 스카이타워 대신 올라가주세요',
    tripDate: '2025-01-27T00:00:00.000Z',
    tripType: TripType.ACTIVITY,
    serviceArea: ServiceArea.SEOUL,
    details: '고소공포증이 있어서 메이커님이 대신 제가 스카이타워 올라가는 것처럼 영상 찍어주세요',
    status: Status.COMPLETED,
    dreamerId: '66885a3c-50f4-427b-8a92-3702c6976fb0'
  },
  {
    id: '095e42af-53af-4656-8335-2802b1cb369a',
    createdAt: '2024-12-27T00:00:00.000Z',
    title: '잠실 스카이타워 대신 올라가주세요',
    tripDate: '2025-01-27T00:00:00.000Z',
    tripType: TripType.ACTIVITY,
    serviceArea: ServiceArea.SEOUL,
    details: '고소공포증이 있어서 메이커님이 대신 제가 스카이타워 올라가는 것처럼 영상 찍어주세요',
    status: Status.COMPLETED,
    dreamerId: '66885a3c-50f4-427b-8a92-3702c6976fb0'
  },
  {
    id: '5b345767-eec1-4107-925f-0ba60d940f7e',
    createdAt: '2024-12-27T00:00:00.000Z',
    title: '잠실 스카이타워 대신 올라가주세요',
    tripDate: '2025-01-27T00:00:00.000Z',
    tripType: TripType.ACTIVITY,
    serviceArea: ServiceArea.SEOUL,
    details: '고소공포증이 있어서 메이커님이 대신 제가 스카이타워 올라가는 것처럼 영상 찍어주세요',
    status: Status.COMPLETED,
    dreamerId: '66885a3c-50f4-427b-8a92-3702c6976fb0'
  },
  {
    id: '01ec63ec-2c10-4a56-8aa2-638c8138ac8b',
    createdAt: '2024-12-27T00:00:00.000Z',
    title: '잠실 스카이타워 대신 올라가주세요',
    tripDate: '2025-01-27T00:00:00.000Z',
    tripType: TripType.ACTIVITY,
    serviceArea: ServiceArea.SEOUL,
    details: '고소공포증이 있어서 메이커님이 대신 제가 스카이타워 올라가는 것처럼 영상 찍어주세요',
    status: Status.COMPLETED,
    dreamerId: '66885a3c-50f4-427b-8a92-3702c6976fb0'
  },
  {
    id: '1e747bc1-d11f-449b-9f4e-4b061a4129e0',
    createdAt: '2024-12-27T00:00:00.000Z',
    title: '잠실 스카이타워 대신 올라가주세요',
    tripDate: '2025-01-27T00:00:00.000Z',
    tripType: TripType.ACTIVITY,
    serviceArea: ServiceArea.SEOUL,
    details: '고소공포증이 있어서 메이커님이 대신 제가 스카이타워 올라가는 것처럼 영상 찍어주세요',
    status: Status.COMPLETED,
    dreamerId: '66885a3c-50f4-427b-8a92-3702c6976fb0'
  },
  {
    id: 'bc9ad582-18f1-4825-9645-fe7d26bd0a78',
    createdAt: '2024-12-27T00:00:00.000Z',
    title: '잠실 스카이타워 대신 올라가주세요',
    tripDate: '2025-01-27T00:00:00.000Z',
    tripType: TripType.ACTIVITY,
    serviceArea: ServiceArea.SEOUL,
    details: '고소공포증이 있어서 메이커님이 대신 제가 스카이타워 올라가는 것처럼 영상 찍어주세요',
    status: Status.COMPLETED,
    dreamerId: '66885a3c-50f4-427b-8a92-3702c6976fb0'
  },
  {
    id: 'ded63481-0cbb-4556-acc5-9c193fd1643b',
    createdAt: '2024-12-27T00:00:00.000Z',
    title: '잠실 스카이타워 대신 올라가주세요',
    tripDate: '2025-01-27T00:00:00.000Z',
    tripType: TripType.ACTIVITY,
    serviceArea: ServiceArea.SEOUL,
    details: '고소공포증이 있어서 메이커님이 대신 제가 스카이타워 올라가는 것처럼 영상 찍어주세요',
    status: Status.COMPLETED,
    dreamerId: '66885a3c-50f4-427b-8a92-3702c6976fb0'
  }
];
