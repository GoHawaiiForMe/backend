import { Plan, ServiceArea, Status, TripType } from '@prisma/client';

export const PLANS = [
  {
    id: 'd7a56f8d-94b9-4b9d-8bdf-3b6295a3b3b4',
    title: '제목1',
    startDate: new Date('2025-01-10T09:00:00'),
    endDate: new Date('2025-01-10T18:00:00'),
    tripType: TripType.FOOD_TOUR,
    serviceArea: ServiceArea.SEOUL,
    details: 'Food tour in Seoul.',
    status: Status.PENDING,
    dreamerId: 'a1b2c3d4-e5f6-7890-abcd-1234567890ef'
  },
  {
    id: 'e7b60f0a-c89f-43ad-beb8-9b16702b2927',
    title: '제목2',
    startDate: new Date('2025-01-12T09:00:00'),
    endDate: new Date('2025-01-12T18:00:00'),
    tripType: TripType.SHOPPING,
    serviceArea: ServiceArea.BUSAN,
    details: 'Shopping spree in Busan.',
    status: Status.PENDING,
    dreamerId: 'a1b2c3d4-e5f6-7890-abcd-1234567890ef'
  },
  {
    id: 'f7b24e3a-734b-47f0-9d2f-42d2446944cd',
    title: '제목3',
    startDate: new Date('2025-02-15T09:00:00'),
    endDate: new Date('2025-02-15T18:00:00'),
    tripType: TripType.RELAXATION,
    serviceArea: ServiceArea.DAEGU,
    details: 'Relaxation in Daegu.',
    status: Status.PENDING,
    dreamerId: 'c3d4e5f6-7890-abcd-ef01-3456789012bc'
  },
  {
    id: 'c6e6fd6e-ccac-4b1d-bd75-44f3c9a68bb0',
    title: '제목4',
    startDate: new Date('2025-03-01T09:00:00'),
    endDate: new Date('2025-03-01T18:00:00'),
    tripType: TripType.CULTURE,
    serviceArea: ServiceArea.GWANGJU,
    details: 'Cultural exploration in Gwangju.',
    status: Status.PENDING,
    dreamerId: 'b2c3d4e5-f678-90ab-cdef-2345678901ab'
  },
  {
    id: 'b4f4db1e-b32d-44f6-9026-d74c38b8d899',
    title: '제목5',
    startDate: new Date('2025-04-05T09:00:00'),
    endDate: new Date('2025-04-05T18:00:00'),
    tripType: TripType.ACTIVITY,
    serviceArea: ServiceArea.INCHEON,
    details: 'Outdoor activities in Incheon.',
    status: Status.PENDING,
    dreamerId: 'd4e5f678-90ab-cdef-0123-4567890123cd'
  }
];
