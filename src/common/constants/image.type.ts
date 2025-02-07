export const ProfileImageValues = {
  DEFAULT_1: 'DEFAULT_1',
  DEFAULT_2: 'DEFAULT_2',
  DEFAULT_3: 'DEFAULT_3',
  DEFAULT_4: 'DEFAULT_4'
} as const;

export type ProfileImage = keyof typeof ProfileImageValues;
