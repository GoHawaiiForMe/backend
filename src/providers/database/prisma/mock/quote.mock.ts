const QUOTES = [
  // 서울
  {
    id: '8465d903-77ca-4808-984c-94679acad456',
    createdAt: '2025-03-02T10:00:00.000Z',
    updatedAt: '2025-03-02T10:15:00.000Z',
    isDeletedAt: null,
    price: 25,
    content: '아아를 곁들여서 딸기 케이크 먹는건 누구보다 자신있습니다. ',
    planId: 'e7b60f0a-c89f-43ad-beb8-9b16702b2927',
    makerId: '49be61b8-0905-448a-8534-fe5b1a0004c2',
    isConfirmed: false,
    isAssigned: false
  },
  {
    id: '9e1a9596-3525-438b-bc15-ca535cb7b690',
    createdAt: '2025-03-05T10:30:00.000Z',
    updatedAt: '2025-03-05T10:45:00.000Z',
    isDeletedAt: null,
    price: 30,
    content:
      '경복궁에서 전통적인 체험과 사진 촬영이 포함된 패키지입니다. 조선 왕국의 역사와 문화를 생생하게 체험해보세요.',
    planId: 'f7b24e3a-734b-47f0-9d2f-42d2446944cd',
    makerId: '49be61b8-0905-448a-8534-fe5b1a0004c2',
    isConfirmed: false,
    isAssigned: false
  },

  {
    id: '1a819224-21db-4491-9cc1-15673739a3e3',
    createdAt: '2025-03-10T11:30:00.000Z',
    updatedAt: '2025-03-10T11:45:00.000Z',
    isDeletedAt: null,
    price: 28,
    content: '서울 이태원 리틀빅아이디어 카페에서 맛있는 딸기케이크와 함께하는 여행을 제안합니다.',
    planId: 'e7b60f0a-c89f-43ad-beb8-9b16702b2927',
    makerId: '3ee03c9c-9ba5-43eb-a03d-fa7d3e546e41',
    isConfirmed: false,
    isAssigned: false
  },
  {
    id: '5abc024e-3439-41eb-a4f8-0b1399cf7e3f',
    createdAt: '2025-03-07T09:30:00.000Z',
    updatedAt: '2025-03-07T09:45:00.000Z',
    isDeletedAt: null,
    price: 32,
    content: '경복궁에서 전통 문화를 체험하면서 독특한 사진을 찍을 수 있는 패키지를 제공합니다.',
    planId: 'f7b24e3a-734b-47f0-9d2f-42d2446944cd',
    makerId: '3ee03c9c-9ba5-43eb-a03d-fa7d3e546e41',
    isConfirmed: false,
    isAssigned: false
  },

  // 전남
  {
    id: '080e2a29-1aca-4097-8d19-7b6801758eae',
    createdAt: '2025-04-03T10:00:00.000Z',
    updatedAt: '2025-04-03T10:30:00.000Z',
    isDeletedAt: null,
    price: 350,
    content: '여수에서 스킨스쿠버로 바다 속 풍경을 찍어올 수 있는 독특한 경험을 제공하는 패키지입니다.',
    planId: 'b4f4db1e-b32d-44f6-9026-d74c38b8d899',
    makerId: 'ef846519-2b73-4be4-807e-f6ef1c07eb60',
    isConfirmed: false,
    isAssigned: false
  },
  {
    id: 'db670839-f9f4-4929-97e9-89e1012079b3',
    createdAt: '2025-03-20T14:30:00.000Z',
    updatedAt: '2025-03-20T14:40:00.000Z',
    isDeletedAt: null,
    price: 220,
    content: '평화로운 전남 해남 땅끝마을에서 한적한 풍경을 담은 멋진 사진을 찍어올 수 있는 경험을 제공합니다.',
    planId: '8fc40908-9269-4db3-ad7d-fb6e69b0ba0d',
    makerId: 'ef846519-2b73-4be4-807e-f6ef1c07eb60',
    isConfirmed: false,
    isAssigned: false
  },
  {
    id: '504d260f-77aa-4ff1-85e3-82c5bfc441ba',
    createdAt: '2025-04-04T11:00:00.000Z',
    updatedAt: '2025-04-04T11:15:00.000Z',
    isDeletedAt: null,
    price: 210,
    content: '여수 바다에서 스킨스쿠버 체험 후 바다 속의 아름다운 풍경을 담을 수 있는 체험을 제안합니다.',
    planId: 'b4f4db1e-b32d-44f6-9026-d74c38b8d899',
    makerId: 'f0f6b3d9-529a-41cc-8ca1-3c29d0a3670a',
    isConfirmed: false,
    isAssigned: false
  },
  {
    id: '99871ebb-6f0f-4615-b719-1d3411bfafa8',
    createdAt: '2025-04-06T10:30:00.000Z',
    updatedAt: '2025-04-06T10:45:00.000Z',
    isDeletedAt: null,
    price: 270,
    content: '전남 해남 땅끝마을에서 평화로운 풍경을 찍어와줄 수 있는 견적입니다.',
    planId: '8fc40908-9269-4db3-ad7d-fb6e69b0ba0d',
    makerId: 'f0f6b3d9-529a-41cc-8ca1-3c29d0a3670a',
    isConfirmed: false,
    isAssigned: false
  },

  // 대구 경북 경남
  {
    id: 'ffbb0e97-d406-45b0-a89b-428d3aa00c8b',
    createdAt: '2025-01-12T10:00:00.000Z',
    updatedAt: '2025-01-12T10:15:00.000Z',
    isDeletedAt: null,
    price: 280,
    content:
      '대구 동성로에서 쇼핑하며 현지 인기 브랜드의 가방을 추천하고 구매할 수 있는 서비스를 제공하는 패키지입니다.',
    planId: '7d37a0b0-23e2-4509-b478-1256a2a41d8d',
    makerId: '032d7bd4-116c-467b-9352-a14b0d494ef9',
    isConfirmed: false,
    isAssigned: false
  },
  {
    id: '2a41c95b-c0ac-4613-9cf5-89a023d6790b',
    createdAt: '2025-04-30T10:30:00.000Z',
    updatedAt: '2025-04-30T10:45:00.000Z',
    isDeletedAt: null,
    price: 300,
    content: '경북 안동에서 전통문화 체험을 진행하며, 손에 쥔 전통 물건과 함께 사진 촬영도 가능합니다.',
    planId: '0373ced8-c000-4020-9ecc-66e9b908e174',
    makerId: '032d7bd4-116c-467b-9352-a14b0d494ef9',
    isConfirmed: false,
    isAssigned: false
  },
  {
    id: '71a3d28a-c36e-488d-9b62-1244bd42d703',
    createdAt: '2025-06-12T13:30:00.000Z',
    updatedAt: '2025-06-12T14:00:00.000Z',
    isDeletedAt: null,
    price: 330,
    content: '경남 거제도에서 바다를 즐기며, 바다의 파도와 함께 멋진 액티비티를 즐길 수 있는 패키지입니다.',
    planId: '4322531b-6ca2-4623-9428-3f17b487305c',
    makerId: '2555fe16-1649-48c8-8f3f-971b87dd34a7',
    isConfirmed: false,
    isAssigned: false
  },
  {
    id: '811f2b2c-d54a-441a-aea6-515f35c1a8b2',
    createdAt: '2025-06-15T14:30:00.000Z',
    updatedAt: '2025-06-15T14:45:00.000Z',
    isDeletedAt: null,
    price: 350,
    content: '경남 거제도에서 바다를 즐기며 특별한 액티비티를 경험할 수 있는 패키지를 제공합니다.',
    planId: '4322531b-6ca2-4623-9428-3f17b487305c',
    makerId: '2555fe16-1649-48c8-8f3f-971b87dd34a7',
    isConfirmed: false,
    isAssigned: false
  },

  // 강원
  {
    id: '7397c1b9-a049-4adb-877c-5f6ae2ad6375',
    createdAt: '2025-12-01T10:00:00.000Z',
    updatedAt: '2025-12-01T10:15:00.000Z',
    isDeletedAt: null,
    price: 400,
    content: '강원 평창에서 스키를 즐기며, 아름다운 스키장의 전경을 배경으로 사진 촬영도 가능합니다.',
    planId: 'f8ab94d0-16b6-4bf5-861d-d09eda905811',
    makerId: '6b4ded82-e680-410d-b86d-ce6974e53f37',
    isConfirmed: false,
    isAssigned: false
  },
  {
    id: '9b051dfa-9ea3-4ee2-810b-7c6375849b1e',
    createdAt: '2025-12-05T12:30:00.000Z',
    updatedAt: '2025-12-05T12:45:00.000Z',
    isDeletedAt: null,
    price: 380,
    content: '강원 강릉에서 해변 산책을 하며, 해변에서 즐기는 여유로운 시간을 사진으로 남길 수 있습니다.',
    planId: '8e0db478-78c9-48f3-9c57-450a65fff5a9',
    makerId: '6b4ded82-e680-410d-b86d-ce6974e53f37',
    isConfirmed: false,
    isAssigned: false
  },
  {
    id: '9b336a49-1171-4e9e-8f7f-1ca26bb2bad2',
    createdAt: '2025-12-15T14:00:00.000Z',
    updatedAt: '2025-12-15T14:30:00.000Z',
    isDeletedAt: null,
    price: 420,
    content: '강원 속초에서 낚시를 즐기며, 바다의 신비한 분위기를 경험할 수 있는 패키지를 제안합니다.',
    planId: '2dd4b082-e818-4992-a234-62242487d48f',
    makerId: '5441d657-f796-427a-b66d-cc5274c60c11',
    isConfirmed: false,
    isAssigned: false
  },
  {
    id: '3e414401-b78c-4cfc-a29f-118460e38c33',
    createdAt: '2025-12-22T11:00:00.000Z',
    updatedAt: '2025-12-22T11:30:00.000Z',
    isDeletedAt: null,
    price: 400,
    content: '강원 춘천에서 자연속 힐링을 즐기며 평온한 시간을 보내는 액티비티를 제공합니다.',
    planId: '64d06bc2-72bf-42da-9949-946d30201635',
    makerId: '5441d657-f796-427a-b66d-cc5274c60c11',
    isConfirmed: false,
    isAssigned: false
  },
  // 충남 공주
  {
    id: '8ecddb5a-7ca7-4aab-8c3f-cb4748341aa0',
    createdAt: '2025-07-20T09:00:00.000Z',
    updatedAt: '2025-07-20T09:15:00.000Z',
    isDeletedAt: null,
    price: 2500,
    content: '충남 공주에서 역사 탐방을 하며, 그 곳의 문화유산을 사진으로 남길 수 있는 특별한 경험을 제공합니다.',
    planId: 'de5bd337-32c2-4472-bda1-ae886f54f8eb',
    makerId: 'a08d9856-adfa-4f83-9e9a-48401f3d0ef3',
    isConfirmed: false,
    isAssigned: false
  },
  {
    id: '82dca899-35d2-4f5e-ba8e-c6ca5ee298e1',
    createdAt: '2025-07-22T14:00:00.000Z',
    updatedAt: '2025-07-22T14:20:00.000Z',
    isDeletedAt: null,
    price: 2700,
    content:
      '충남 공주에서 역사 탐방을 즐기며, 그 지역의 전통적인 문화와 아름다운 자연을 담아낼 수 있는 프로그램입니다.',
    planId: 'de5bd337-32c2-4472-bda1-ae886f54f8eb',
    makerId: 'eb3d9829-59f7-457f-8f09-beea8ca58dfc',
    isConfirmed: false,
    isAssigned: false
  },

  //충북 청주
  {
    id: '1810468e-518c-4523-bfcf-73932e09a0d4',
    createdAt: '2025-08-25T11:00:00.000Z',
    updatedAt: '2025-08-25T11:30:00.000Z',
    isDeletedAt: null,
    price: 3000,
    content: '충북 청주에서 쇼핑하며, 다양한 로컬 브랜드와 기념품을 구입할 수 있는 특별한 기회를 제공합니다.',
    planId: '13323ce0-f34d-448f-a82f-aecf14c0e228',
    makerId: 'a08d9856-adfa-4f83-9e9a-48401f3d0ef3',
    isConfirmed: false,
    isAssigned: false
  },
  {
    id: '6531ba27-40c6-41cc-9837-7d2e97412064',
    createdAt: '2025-08-27T10:00:00.000Z',
    updatedAt: '2025-08-27T10:30:00.000Z',
    isDeletedAt: null,
    price: 3200,
    content: '충북 청주에서 쇼핑하고, 현지의 특산물을 발견할 수 있는 흥미로운 쇼핑 투어를 제공합니다.',
    planId: '13323ce0-f34d-448f-a82f-aecf14c0e228',
    makerId: 'eb3d9829-59f7-457f-8f09-beea8ca58dfc',
    isConfirmed: false,
    isAssigned: false
  },

  //대전 한화 이글스 파크
  {
    id: '280970b5-9e18-414d-b4a2-bc5459928a1f',
    createdAt: '2025-09-01T10:00:00.000Z',
    updatedAt: '2025-09-01T10:30:00.000Z',
    isDeletedAt: null,
    price: 3500,
    content: '대전 한화 이글스 파크에서 야구 경기를 관람하며, 스탠드에서의 열기와 함께 즐길 수 있는 기회를 제공합니다.',
    planId: '4f51184e-72fb-4dd0-acd9-a4dd3ba905',
    makerId: 'a08d9856-adfa-4f83-9e9a-48401f3d0ef3',
    isConfirmed: false,
    isAssigned: false
  },
  {
    id: '0337b0f5-72c6-4c6e-a161-bce570282009',
    createdAt: '2025-09-05T12:00:00.000Z',
    updatedAt: '2025-09-05T12:20:00.000Z',
    isDeletedAt: null,
    price: 3600,
    content: '대전 한화 이글스 파크에서 야구 관람을 하며, 경기 후 특별한 액세서리나 기념품도 제공합니다.',
    planId: '4f51184e-72fb-4dd0-acd9-a4dd3ba905',
    makerId: 'eb3d9829-59f7-457f-8f09-beea8ca58dfc',
    isConfirmed: false,
    isAssigned: false
  }
];

export default QUOTES;
