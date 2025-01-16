export type Status = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'OVERDUE';

export enum StatusEnum {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  COMPLETED = 'COMPLETED',
  OVERDUE = 'OVERDUE'
}

// export const Status = {
//   PENDING: 'PENDING',
//   CONFIRMED: 'CONFIRMED',
//   COMPLETED: 'COMPLETED',
//   OVERDUE: 'OVERDUE'
// } as const;
