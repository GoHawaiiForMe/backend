import { ServiceArea, Status, TripType } from '@prisma/client';

export const PLANS = [
  // OVERDUE 상태 (2024년 날짜)
  {
    id: 'b198135d-9865-445b-a04b-742ca9939ee1',
    createdAt: '2024-07-25T00:00:00.000Z', // 5개월 전
    title: '플랜1타이틀',
    tripDate: '2024-12-25T00:00:00.000Z',
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
    dreamerId: '555d463e-37b6-410b-9061-11a9d6822bdd'
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
    assignees: [{ id: 'ef846519-2b73-4be4-807e-f6ef1c07eb60' }]
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
    dreamerId: '66885a3c-50f4-427b-8a92-3702c6976fb0'
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
    dreamerId: '555d463e-37b6-410b-9061-11a9d6822bdd'
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
    dreamerId: '30106a60-200d-467c-8b0d-5817ee604904'
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
    dreamerId: '30106a60-200d-467c-8b0d-5817ee604904'
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
    dreamerId: '4cb5e51b-072e-4ca2-a4ae-bf432ea8ef76'
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
    dreamerId: '66885a3c-50f4-427b-8a92-3702c6976fb0'
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
    serviceArea: ServiceArea.SEOUL,
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
  }
];

// import { Plan, ServiceArea, Status, TripType } from '@prisma/client';

// export const PLANS = [
//   {
//     id: 'd7a56f8d-94b9-4b9d-8bdf-3b6295a3b3b4',
//     title: '서울 이태원 딸기케이크 푸파 할 분 구함',
//     tripDate: new Date('2025-01-10T09:00:00'),
//     tripType: TripType.FOOD_TOUR,
//     serviceArea: ServiceArea.SEOUL,
//     details: '서울 이태원 리틀빅아이디어 카페에서 딸기케이크 복스럽게 먹는거 보여주실 분 구합니다.',
//     status: Status.OVERDUE,
//     dreamerId: '66885a3c-50f4-427b-8a92-3702c6976fb0'
//   },
//   {
//     id: 'e7b60f0a-c89f-43ad-beb8-9b16702b2927',
//     title: '서울 이태원 딸기케이크 푸파 할 분 구함',
//     tripDate: new Date('2025-03-01T09:00:00'),
//     tripType: TripType.FOOD_TOUR,
//     serviceArea: ServiceArea.SEOUL,
//     details: '서울 이태원 리틀빅아이디어 카페에서 딸기케이크 복스럽게 먹는거 보여주실 분 구합니다.',
//     status: Status.PENDING,
//     dreamerId: '66885a3c-50f4-427b-8a92-3702c6976fb0'
//   },
//   {
//     id: 'f7b24e3a-734b-47f0-9d2f-42d2446944cd',
//     title: '서울 경복궁 문화체험',
//     tripDate: new Date('2025-03-02T09:00:00'),
//     tripType: TripType.CULTURE,
//     serviceArea: ServiceArea.SEOUL,
//     details: '서울 경복궁에서 조선이라는 나라를 카메라에 담아와 줄 사람 구해요.',
//     status: Status.PENDING,
//     dreamerId: '66885a3c-50f4-427b-8a92-3702c6976fb0'
//   },
//   {
//     id: 'c6e6fd6e-ccac-4b1d-bd75-44f3c9a68bb0',
//     title: '서울 롯데면세점에서 가방 사와주실 분',
//     tripDate: new Date('2025-03-08T09:00:00'),
//     tripType: TripType.SHOPPING,
//     serviceArea: ServiceArea.SEOUL,
//     details: '서울 롯데면세점에서 가방 사와주실 분 구합니다.',
//     address: '경상북도 경주시 불국로 385',
//     status: Status.PENDING,
//     dreamerId: '66885a3c-50f4-427b-8a92-3702c6976fb0'
//   },
//   /**서울 */
//   /**전남 광주 */
//   {
//     id: 'b4f4db1e-b32d-44f6-9026-d74c38b8d899',
//     title: '여수에서 바다 속 풍경 찍어와주세요.',
//     tripDate: new Date('2025-04-05T09:00:00'),
//     tripType: TripType.ACTIVITY,
//     serviceArea: ServiceArea.JEONNAM,
//     details: '여수에서 스킨스쿠버로 바다 속 풍경 찍어와주세요.',
//     status: Status.PENDING,
//     dreamerId: '555d463e-37b6-410b-9061-11a9d6822bdd'
//   },
//   {
//     id: '8fc40908-9269-4db3-ad7d-fb6e69b0ba0d',
//     title: '땅끝마을 풍경 찍어와주실 분',
//     tripDate: new Date('2025-01-01T09:00:00'),
//     tripType: TripType.RELAXATION,
//     serviceArea: ServiceArea.JEONNAM,
//     details: '평화로운 전남 해남 땅끝마을 풍경 찍어와주실 분 구해요.',
//     status: Status.OVERDUE,
//     dreamerId: '555d463e-37b6-410b-9061-11a9d6822bdd'
//   },
//   {
//     id: '991f3cbd-c9a6-4429-bb34-221327df7cc8',
//     title: '땅끝마을 풍경 찍어와주실 분',
//     tripDate: new Date('2025-03-15T09:00:00'),
//     tripType: TripType.RELAXATION,
//     serviceArea: ServiceArea.JEONNAM,
//     details: '평화로운 전남 해남 땅끝마을 풍경 찍어와주실 분 구해요.',
//     status: Status.PENDING,
//     dreamerId: '555d463e-37b6-410b-9061-11a9d6822bdd'
//   },
//   {
//     id: '7f1d4fd9-9364-4daa-8f00-5e368e91f9ff',
//     title: '진도 신비의 바닷길 축제에서 한바탕 놀아줄 분 구해요.',
//     tripDate: new Date('2025-04-05T09:00:00'),
//     tripType: TripType.FESTIVAL,
//     serviceArea: ServiceArea.JEONNAM,
//     details: '진도 신비의 바닷길 축제에서 한바탕 놀아줄 분 구해요.',
//     status: Status.PENDING,
//     dreamerId: '555d463e-37b6-410b-9061-11a9d6822bdd'
//   },
//   /**전남 */
//   /**대구 경북 경남 */
//   {
//     id: '7d37a0b0-23e2-4509-b478-1256a2a41d8d',
//     title: '대구 동성로에서 쇼핑할 분 구해요!',
//     tripDate: new Date('2025-01-10T09:00:00'),
//     tripType: TripType.SHOPPING,
//     serviceArea: ServiceArea.DAEGU,
//     details: '대구 동성로에서 쇼핑할 분 구합니다.',
//     address: '미쿡 하와이 CU사거리 4번지',
//     status: Status.OVERDUE,
//     dreamerId: '30106a60-200d-467c-8b0d-5817ee604904',
//     assignees: [{ id: '032d7bd4-116c-467b-9352-a14b0d494ef9' }]
//   },
//   {
//     id: '0373ced8-c000-4020-9ecc-66e9b908e174',
//     title: '경북 안동에서 전통문화 체험하실 분!',
//     tripDate: new Date('2025-05-01T09:00:00'),
//     tripType: TripType.CULTURE,
//     serviceArea: ServiceArea.GYEONGBUK,
//     details: '경북 안동에서 전통문화 체험하실 분 구합니다.',
//     status: Status.PENDING,
//     dreamerId: '30106a60-200d-467c-8b0d-5817ee604904'
//   },
//   {
//     id: '4322531b-6ca2-4623-9428-3f17b487305c',
//     title: '경남 거제도에서 바다 즐기실 분!',
//     tripDate: new Date('2025-06-10T09:00:00'),
//     tripType: TripType.ACTIVITY,
//     serviceArea: ServiceArea.GYEONGNAM,
//     details: '경남 거제도에서 바다를 즐기실 분 구합니다.',
//     status: Status.CONFIRMED,
//     dreamerId: '30106a60-200d-467c-8b0d-5817ee604904'
//   },
//   {
//     id: 'cd19295c-8c4d-4888-811a-92df766eab2b',
//     title: '경남 창원에서 산업체험하실 분!',
//     tripDate: new Date('2025-06-15T09:00:00'),
//     tripType: TripType.ACTIVITY,
//     serviceArea: ServiceArea.GYEONGNAM,
//     details: '경남 창원에서 산업체험하실 분 구합니다.',
//     status: Status.COMPLETED,
//     dreamerId: '30106a60-200d-467c-8b0d-5817ee604904'
//   },

//   // 대전, 충남, 충북 지역
//   {
//     id: 'd913d89c-f2b8-4eac-8283-5572e67aac70',
//     title: '대전 유성온천에서 휴식 즐기실 분!',
//     tripDate: new Date('2024-07-01T09:00:00'),
//     tripType: TripType.RELAXATION,
//     serviceArea: ServiceArea.DAEJEON,
//     details: '대전 유성온천에서 여유롭게 휴식을 즐기실 분 구합니다.',
//     status: Status.OVERDUE,
//     dreamerId: '4cb5e51b-072e-4ca2-a4ae-bf432ea8ef76'
//   },
//   {
//     id: 'de5bd337-32c2-4472-bda1-ae886f54f8eb',
//     title: '충남 공주에서 역사 탐방하실 분!',
//     tripDate: new Date('2025-08-05T09:00:00'),
//     tripType: TripType.CULTURE,
//     serviceArea: ServiceArea.CHUNGNAM,
//     details: '충남 공주에서 역사 탐방하실 분 구합니다.',
//     status: Status.PENDING,
//     dreamerId: '4cb5e51b-072e-4ca2-a4ae-bf432ea8ef76'
//   },
//   {
//     id: '13323ce0-f34d-448f-a82f-aecf14c0e228',
//     title: '충북 청주에서 쇼핑하실 분!',
//     tripDate: new Date('2025-09-01T09:00:00'),
//     tripType: TripType.SHOPPING,
//     serviceArea: ServiceArea.CHUNGBUK,
//     details: '충북 청주에서 쇼핑하실 분 구합니다.',
//     status: Status.CONFIRMED,
//     dreamerId: '4cb5e51b-072e-4ca2-a4ae-bf432ea8ef76'
//   },
//   {
//     id: '4f51184e-72fb-4dd0-acd9-a4dd3ba905',
//     title: '대전 한화 이글스 파크에서 야구 관람하실 분!',
//     tripDate: new Date('2025-09-10T09:00:00'),
//     tripType: TripType.ACTIVITY,
//     serviceArea: ServiceArea.DAEJEON,
//     details: '대전 한화 이글스 파크에서 야구 관람하실 분 구합니다.',
//     status: Status.COMPLETED,
//     dreamerId: '4cb5e51b-072e-4ca2-a4ae-bf432ea8ef76'
//   },

//   // 강원 지역
//   {
//     id: 'f8ab94d0-16b6-4bf5-861d-d09eda905811',
//     title: '강원 평창에서 스키 즐기실 분!',
//     tripDate: new Date('2024-12-01T09:00:00'),
//     tripType: TripType.ACTIVITY,
//     serviceArea: ServiceArea.GANGWON,
//     details: '강원 평창에서 스키를 즐기실 분 구합니다.',
//     status: Status.OVERDUE,
//     dreamerId: 'e5f67890-abcd-ef01-2345-6789012345de'
//   },
//   {
//     id: '8e0db478-78c9-48f3-9c57-450a65fff5a9',
//     title: '강원 강릉에서 해변 산책할 분!',
//     tripDate: new Date('2025-12-10T09:00:00'),
//     tripType: TripType.RELAXATION,
//     serviceArea: ServiceArea.GANGWON,
//     details: '강원 강릉에서 해변 산책을 하실 분 구합니다.',
//     status: Status.PENDING,
//     dreamerId: 'e5f67890-abcd-ef01-2345-6789012345de'
//   },
//   {
//     id: '2dd4b082-e818-4992-a234-62242487d48f',
//     title: '강원 속초에서 낚시할 분!',
//     tripDate: new Date('2025-12-20T09:00:00'),
//     tripType: TripType.ACTIVITY,
//     serviceArea: ServiceArea.GANGWON,
//     details: '강원 속초에서 낚시를 즐기실 분 구합니다.',
//     status: Status.CONFIRMED,
//     dreamerId: 'e5f67890-abcd-ef01-2345-6789012345de'
//   },
//   {
//     id: '64d06bc2-72bf-42da-9949-946d30201635',
//     title: '강원 춘천에서 자연속 힐링 하실 분!',
//     tripDate: new Date('2025-12-25T09:00:00'),
//     tripType: TripType.RELAXATION,
//     serviceArea: ServiceArea.GANGWON,
//     details: '강원 춘천에서 자연속 힐링을 즐기실 분 구합니다.',
//     status: Status.COMPLETED,
//     dreamerId: 'e5f67890-abcd-ef01-2345-6789012345de'
//   }
// ];
