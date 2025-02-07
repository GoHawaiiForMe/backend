export const StatusValues = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  COMPLETED: 'COMPLETED',
  OVERDUE: 'OVERDUE'
} as const;

export type Status = keyof typeof StatusValues;
