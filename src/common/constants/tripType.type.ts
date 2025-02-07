export const TripTypeValues = {
  FOOD_TOUR: 'FOOD_TOUR',
  SHOPPING: 'SHOPPING',
  RELAXATION: 'RELAXATION',
  CULTURE: 'CULTURE',
  ACTIVITY: 'ACTIVITY',
  FESTIVAL: 'FESTIVAL'
} as const;

export type TripType = keyof typeof TripTypeValues;
