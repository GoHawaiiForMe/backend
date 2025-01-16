import { Plan, ServiceArea, Status, TripType } from '@prisma/client';

export const PLANS = [
  {
    id: 'd7a56f8d-94b9-4b9d-8bdf-3b6295a3b3b4',
    title: '서울 이태원 딸기케이크 푸파 할 분 구함',
    startDate: new Date('2025-01-10T09:00:00'),
    tripType: TripType.FOOD_TOUR,
    serviceArea: ServiceArea.SEOUL,
    details: '서울 이태원 리틀빅아이디어 카페에서 딸기케이크 복스럽게 먹는거 보여주실 분 구합니다.',
    status: Status.OVERDUE,
    dreamerId: '66885a3c-50f4-427b-8a92-3702c6976fb0'
  },
  {
    id: 'e7b60f0a-c89f-43ad-beb8-9b16702b2927',
    title: '서울 이태원 딸기케이크 푸파 할 분 구함',
    startDate: new Date('2025-03-01T09:00:00'),
    tripType: TripType.FOOD_TOUR,
    serviceArea: ServiceArea.SEOUL,
    details: '서울 이태원 리틀빅아이디어 카페에서 딸기케이크 복스럽게 먹는거 보여주실 분 구합니다.',
    status: Status.PENDING,
    dreamerId: '66885a3c-50f4-427b-8a92-3702c6976fb0'
  },
  {
    id: 'f7b24e3a-734b-47f0-9d2f-42d2446944cd',
    title: '서울 경복궁 문화체험',
    startDate: new Date('2025-03-02T09:00:00'),
    tripType: TripType.CULTURE,
    serviceArea: ServiceArea.SEOUL,
    details: '서울 경복궁에서 조선이라는 나라를 카메라에 담아와 줄 사람 구해요.',
    status: Status.PENDING,
    dreamerId: '66885a3c-50f4-427b-8a92-3702c6976fb0'
  },
  {
    id: 'c6e6fd6e-ccac-4b1d-bd75-44f3c9a68bb0',
    title: '서울 롯데면세점에서 가방 사와주실 분',
    startDate: new Date('2025-03-08T09:00:00'),
    tripType: TripType.SHOPPING,
    serviceArea: ServiceArea.SEOUL,
    details: '서울 롯데면세점에서 가방 사와주실 분 구합니다.',
    address: '경상북도 경주시 불국로 385',
    status: Status.PENDING,
    dreamerId: '66885a3c-50f4-427b-8a92-3702c6976fb0'
  },
  /**서울 */
  /**전남 광주 */
  {
    id: 'b4f4db1e-b32d-44f6-9026-d74c38b8d899',
    title: '여수에서 바다 속 풍경 찍어와주세요.',
    startDate: new Date('2025-04-05T09:00:00'),
    tripType: TripType.ACTIVITY,
    serviceArea: ServiceArea.JEONNAM,
    details: '여수에서 스킨스쿠버로 바다 속 풍경 찍어와주세요.',
    status: Status.PENDING,
    dreamerId: '555d463e-37b6-410b-9061-11a9d6822bdd'
  },
  {
    id: '8fc40908-9269-4db3-ad7d-fb6e69b0ba0d',
    title: '땅끝마을 풍경 찍어와주실 분',
    startDate: new Date('2025-01-01T09:00:00'),
    tripType: TripType.RELAXATION,
    serviceArea: ServiceArea.JEONNAM,
    details: '평화로운 전남 해남 땅끝마을 풍경 찍어와주실 분 구해요.',
    status: Status.OVERDUE,
    dreamerId: '555d463e-37b6-410b-9061-11a9d6822bdd',
    assignees: [{ id: '032d7bd4-116c-467b-9352-a14b0d494ef9' }]
  },
  {
    id: '991f3cbd-c9a6-4429-bb34-221327df7cc8',
    title: '땅끝마을 풍경 찍어와주실 분',
    startDate: new Date('2025-03-15T09:00:00'),
    tripType: TripType.RELAXATION,
    serviceArea: ServiceArea.JEONNAM,
    details: '평화로운 전남 해남 땅끝마을 풍경 찍어와주실 분 구해요.',
    status: Status.PENDING,
    dreamerId: '555d463e-37b6-410b-9061-11a9d6822bdd'
  },
  {
    id: '7f1d4fd9-9364-4daa-8f00-5e368e91f9ff',
    title: '진도 신비의 바닷길 축제에서 한바탕 놀아줄 분 구해요.',
    startDate: new Date('2025-04-05T09:00:00'),
    tripType: TripType.FESTIVAL,
    serviceArea: ServiceArea.JEONNAM,
    details: '진도 신비의 바닷길 축제에서 한바탕 놀아줄 분 구해요.',
    status: Status.PENDING,
    dreamerId: '555d463e-37b6-410b-9061-11a9d6822bdd'
  },
  /**전남 */
  /**대구 경북 경남 */
  {
    id: '7d37a0b0-23e2-4509-b478-1256a2a41d8d',
    title: '대구 동성로에서 쇼핑할 분 구해요!',
    startDate: new Date('2025-01-10T09:00:00'),
    tripType: TripType.SHOPPING,
    serviceArea: ServiceArea.DAEGU,
    details: '대구 동성로에서 쇼핑할 분 구합니다.',
    address: '미쿡 하와이 CU사거리 4번지',
    status: Status.OVERDUE,
    dreamerId: '30106a60-200d-467c-8b0d-5817ee604904'
  },
  {
    id: '0373ced8-c000-4020-9ecc-66e9b908e174',
    title: '경북 안동에서 전통문화 체험하실 분!',
    startDate: new Date('2025-05-01T09:00:00'),
    tripType: TripType.CULTURE,
    serviceArea: ServiceArea.GYEONGBUK,
    details: '경북 안동에서 전통문화 체험하실 분 구합니다.',
    status: Status.PENDING,
    dreamerId: '30106a60-200d-467c-8b0d-5817ee604904'
  },
  {
    id: '4322531b-6ca2-4623-9428-3f17b487305c',
    title: '경남 거제도에서 바다 즐기실 분!',
    startDate: new Date('2025-06-10T09:00:00'),
    tripType: TripType.ACTIVITY,
    serviceArea: ServiceArea.GYEONGNAM,
    details: '경남 거제도에서 바다를 즐기실 분 구합니다.',
    status: Status.CONFIRMED,
    dreamerId: '30106a60-200d-467c-8b0d-5817ee604904'
  },
  {
    id: 'cd19295c-8c4d-4888-811a-92df766eab2b',
    title: '경남 창원에서 산업체험하실 분!',
    startDate: new Date('2025-06-15T09:00:00'),
    tripType: TripType.ACTIVITY,
    serviceArea: ServiceArea.GYEONGNAM,
    details: '경남 창원에서 산업체험하실 분 구합니다.',
    status: Status.COMPLETED,
    dreamerId: '30106a60-200d-467c-8b0d-5817ee604904'
  },

  // 대전, 충남, 충북 지역
  {
    id: 'd913d89c-f2b8-4eac-8283-5572e67aac70',
    title: '대전 유성온천에서 휴식 즐기실 분!',
    startDate: new Date('2024-07-01T09:00:00'),
    tripType: TripType.RELAXATION,
    serviceArea: ServiceArea.DAEJEON,
    details: '대전 유성온천에서 여유롭게 휴식을 즐기실 분 구합니다.',
    status: Status.OVERDUE,
    dreamerId: '4cb5e51b-072e-4ca2-a4ae-bf432ea8ef76'
  },
  {
    id: 'de5bd337-32c2-4472-bda1-ae886f54f8eb',
    title: '충남 공주에서 역사 탐방하실 분!',
    startDate: new Date('2025-08-05T09:00:00'),
    tripType: TripType.CULTURE,
    serviceArea: ServiceArea.CHUNGNAM,
    details: '충남 공주에서 역사 탐방하실 분 구합니다.',
    status: Status.PENDING,
    dreamerId: '4cb5e51b-072e-4ca2-a4ae-bf432ea8ef76'
  },
  {
    id: '13323ce0-f34d-448f-a82f-aecf14c0e228',
    title: '충북 청주에서 쇼핑하실 분!',
    startDate: new Date('2025-09-01T09:00:00'),
    tripType: TripType.SHOPPING,
    serviceArea: ServiceArea.CHUNGBUK,
    details: '충북 청주에서 쇼핑하실 분 구합니다.',
    status: Status.CONFIRMED,
    dreamerId: '4cb5e51b-072e-4ca2-a4ae-bf432ea8ef76'
  },
  {
    id: '4f51184e-72fb-4dd0-acd9-a4dd3ba905',
    title: '대전 한화 이글스 파크에서 야구 관람하실 분!',
    startDate: new Date('2025-09-10T09:00:00'),
    tripType: TripType.ACTIVITY,
    serviceArea: ServiceArea.DAEJEON,
    details: '대전 한화 이글스 파크에서 야구 관람하실 분 구합니다.',
    status: Status.COMPLETED,
    dreamerId: '4cb5e51b-072e-4ca2-a4ae-bf432ea8ef76'
  },

  // 강원 지역
  {
    id: 'f8ab94d0-16b6-4bf5-861d-d09eda905811',
    title: '강원 평창에서 스키 즐기실 분!',
    startDate: new Date('2024-12-01T09:00:00'),
    tripType: TripType.ACTIVITY,
    serviceArea: ServiceArea.GANGWON,
    details: '강원 평창에서 스키를 즐기실 분 구합니다.',
    status: Status.OVERDUE,
    dreamerId: 'e5f67890-abcd-ef01-2345-6789012345de'
  },
  {
    id: '8e0db478-78c9-48f3-9c57-450a65fff5a9',
    title: '강원 강릉에서 해변 산책할 분!',
    startDate: new Date('2025-12-10T09:00:00'),
    tripType: TripType.RELAXATION,
    serviceArea: ServiceArea.GANGWON,
    details: '강원 강릉에서 해변 산책을 하실 분 구합니다.',
    status: Status.PENDING,
    dreamerId: 'e5f67890-abcd-ef01-2345-6789012345de'
  },
  {
    id: '2dd4b082-e818-4992-a234-62242487d48f',
    title: '강원 속초에서 낚시할 분!',
    startDate: new Date('2025-12-20T09:00:00'),
    tripType: TripType.ACTIVITY,
    serviceArea: ServiceArea.GANGWON,
    details: '강원 속초에서 낚시를 즐기실 분 구합니다.',
    status: Status.CONFIRMED,
    dreamerId: 'e5f67890-abcd-ef01-2345-6789012345de'
  },
  {
    id: '64d06bc2-72bf-42da-9949-946d30201635',
    title: '강원 춘천에서 자연속 힐링 하실 분!',
    startDate: new Date('2025-12-25T09:00:00'),
    tripType: TripType.RELAXATION,
    serviceArea: ServiceArea.GANGWON,
    details: '강원 춘천에서 자연속 힐링을 즐기실 분 구합니다.',
    status: Status.COMPLETED,
    dreamerId: 'e5f67890-abcd-ef01-2345-6789012345de'
  }
];
