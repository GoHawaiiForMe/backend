import { ProfileImage, ServiceArea, TripType } from '@prisma/client';

export const DREAMER_PROFILES = [
  {
    userId: 'a1b2c3d4-e5f6-7890-abcd-1234567890ef',
    tripTypes: [TripType.CULTURE],
    serviceArea: [ServiceArea.BUSAN],
    image: ProfileImage.DEFAULT_1
  },
  {
    userId: 'b2c3d4e5-f678-90ab-cdef-2345678901ab',
    tripTypes: [TripType.FOOD_TOUR, TripType.SHOPPING],
    serviceArea: [ServiceArea.CHUNGNAM, ServiceArea.SEOUL],
    image: ProfileImage.DEFAULT_2
  },
  {
    userId: 'c3d4e5f6-7890-abcd-ef01-3456789012bc',
    tripTypes: [TripType.RELAXATION],
    serviceArea: [ServiceArea.GANGWON, ServiceArea.GYEONGGI],
    image: ProfileImage.DEFAULT_3
  },
  {
    userId: 'd4e5f678-90ab-cdef-0123-4567890123cd',
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
