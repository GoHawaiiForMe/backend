export const RoleValues = {
  DREAMER: 'DREAMER',
  MAKER: 'MAKER'
} as const;

export type Role = keyof typeof RoleValues;
