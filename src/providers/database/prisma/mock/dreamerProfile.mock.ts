import { ProfileImage, ServiceArea, TripType } from '@prisma/client';

export const DREAMER_PROFILES = [
  {
    userId: '66885a3c-50f4-427b-8a92-3702c6976fb0',
    tripTypes: [TripType.CULTURE],
    serviceArea: [ServiceArea.BUSAN],
    image: ProfileImage.DEFAULT_1
  },
  {
    userId: '555d463e-37b6-410b-9061-11a9d6822bdd',
    tripTypes: [TripType.FOOD_TOUR, TripType.SHOPPING],
    serviceArea: [ServiceArea.CHUNGNAM, ServiceArea.SEOUL],
    image: ProfileImage.DEFAULT_2
  },
  {
    userId: '30106a60-200d-467c-8b0d-5817ee604904',
    tripTypes: [TripType.RELAXATION],
    serviceArea: [ServiceArea.GANGWON, ServiceArea.GYEONGGI],
    image: ProfileImage.DEFAULT_3
  },
  {
    userId: '4cb5e51b-072e-4ca2-a4ae-bf432ea8ef76',
    tripTypes: [TripType.ACTIVITY],
    serviceArea: [ServiceArea.JEJU],
    image: ProfileImage.DEFAULT_4
  },
  {
    userId: 'e5f67890-abcd-ef01-2345-6789012345de',
    tripTypes: [TripType.FESTIVAL, TripType.ACTIVITY],
    serviceArea: [ServiceArea.DAEGU, ServiceArea.GYEONGNAM],
    image: ProfileImage.DEFAULT_1
  }
];
