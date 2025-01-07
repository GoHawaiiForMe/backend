import { Plan, ServiceArea, Status, TripType } from '@prisma/client';

export const PLANS = [
  {
    id: 'd7a56f8d-94b9-4b9d-8bdf-3b6295a3b3b4',
    startDate: new Date('2025-01-10T09:00:00'),
    endDate: new Date('2025-01-10T18:00:00'),
    tripType: TripType.FOOD_TOUR,
    serviceArea: ServiceArea.SEOUL,
    details: 'Food tour in Seoul.',
    status: Status.PENDING,
    dreamerId: 'a3f3f3b7-84a9-4b2c-8289-345f607c4626'
  },
  {
    id: 'e7b60f0a-c89f-43ad-beb8-9b16702b2927',
    startDate: new Date('2025-01-12T09:00:00'),
    endDate: new Date('2025-01-12T18:00:00'),
    tripType: TripType.SHOPPING,
    serviceArea: ServiceArea.BUSAN,
    details: 'Shopping spree in Busan.',
    status: Status.PENDING,
    dreamerId: 'a3f3f3b7-84a9-4b2c-8289-345f607c4626'
  },
  {
    id: 'f7b24e3a-734b-47f0-9d2f-42d2446944cd',
    startDate: new Date('2025-02-15T09:00:00'),
    endDate: new Date('2025-02-15T18:00:00'),
    tripType: TripType.RELAXATION,
    serviceArea: ServiceArea.DAEGU,
    details: 'Relaxation in Daegu.',
    status: Status.PENDING,
    dreamerId: 'a3f3f3b7-84a9-4b2c-8289-345f607c4626'
  },
  {
    id: 'c6e6fd6e-ccac-4b1d-bd75-44f3c9a68bb0',
    startDate: new Date('2025-03-01T09:00:00'),
    endDate: new Date('2025-03-01T18:00:00'),
    tripType: TripType.CULTURE,
    serviceArea: ServiceArea.GWANGJU,
    details: 'Cultural exploration in Gwangju.',
    status: Status.PENDING,
    dreamerId: 'a3f3f3b7-84a9-4b2c-8289-345f607c4626'
  },
  {
    id: 'b4f4db1e-b32d-44f6-9026-d74c38b8d899',
    startDate: new Date('2025-04-05T09:00:00'),
    endDate: new Date('2025-04-05T18:00:00'),
    tripType: TripType.ACTIVITY,
    serviceArea: ServiceArea.INCHEON,
    details: 'Outdoor activities in Incheon.',
    status: Status.PENDING,
    dreamerId: 'a3f3f3b7-84a9-4b2c-8289-345f607c4626'
  }
];