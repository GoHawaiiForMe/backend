export const OAuthProviderValues = {
  LOCAL: 'LOCAL',
  GOOGLE: 'GOOGLE',
  KAKAO: 'KAKAO',
  NAVER: 'NAVER'
} as const;

export type OAuthProvider = keyof typeof OAuthProviderValues;
