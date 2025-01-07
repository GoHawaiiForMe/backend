module.exports = {
  parser: '@typescript-eslint/parser', // TypeScript 파서 사용
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'airbnb-base', // Airbnb 기본 스타일 사용
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  root: true,
  env: {
    node: true,
    jest: true
  },
  ignorePatterns: ['.eslintrc.js'],
  settings: {
    'import/resolver': {
      typescript: {} // TypeScript 모듈 해석을 위한 설정
    }
  },
  rules: {
    // 필요에 따라 규칙을 오버라이드 할 수 있습니다.
    'no-console': 'off', // 콘솔 사용을 허용 (예시로 설정)
    '@typescript-eslint/no-unused-vars': ['error'], // 사용되지 않는 변수는 에러
    'import/no-unresolved': 'off', // import 관련 에러를 끔 (예: 별칭 경로 사용시)
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }], // devDependencies 허용
    'class-methods-use-this': 'off',
    'no-useless-constructor': 'off', // 생성자에 대한 불필요한 경고 비활성화
    'no-empty-function': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never', // TypeScript 파일에 대해 확장자 생략
        js: 'never' // JavaScript 파일에 대해 확장자 생략
      }
    ]
  }
};
