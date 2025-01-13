const enum ErrorMessage {
  USER_NOT_FOUND = '해당 유저를 찾을 수 없습니다.',
  USER_EXIST = '이미 존재하는 이메일입니다.',
  USER_NICKNAME_EXIST = '이미 존재하는 닉네임입니다.',
  USER_UNAUTHORIZED_ID = '존재하지 않는 email 입니다.',
  USER_UNAUTHORIZED_PW = '비밀번호가 일치하지 않습니다.',
  USER_UNAUTHORIZED_TOKEN = '토큰의 유효기간이 만료되었습니다. 로그인이 필요합니다',
  USER_FORBIDDEN_NOT_OWNER = 'Plan을 등록한 본인만 수정, 삭제할 수 있습니다. 권한을 확인해주세요.',
  USER_FORBIDDEN_NOT_MAKER = 'Maker 역할을 가진 사용자만 이 리소스에 접근할 수 있습니다. 권한을 확인해 주세요.',
  USER_FORBIDDEN_NOT_DREAMER = 'Dreamer 역할을 가진 사용자만 Plan을 생성할 수 있습니다. 권한을 확인해 주세요.',
  USER_COCONUT_INVALID = '포인트는 0코코넛 이상이어야 합니다.',

  TOKEN_UNAUTHORIZED_NOTFOUND = '토큰이 없습니다. 로그인이 필요합니다',
  TOKEN_UNAUTHORIZED_VALIDATION = '유효하지 않은 토큰입니다',

  FOLLOW_EXIST = '이미 팔로우한 유저입니다',
  FOLLOW_NOT_FOUND = '팔로우하지 않은 유저입니다',

  NOTIFICATION_NOT_FOUND = '해당 알림을 찾을 수 없습니다',

  PLAN_NOT_FOUND = '해당 플랜을 찾을 수 없습니다.',
  PLAN_DELETE_FORBIDDEN = '해당 플랜을 삭제할 권리가 없습니다.',
  PLAN_UPDATE_FORBIDDEN = '해당 플랜을 수정할 권리가 없습니다.',
  PLAN_STATUS_INVALID = '지정견적 요청은 PENDING 상태일 때만 가능합니다.',

  QUOTE_NOT_FOUND = '해당 견적서를 찾을 수 없습니다.',
  QUOTE_FORBIDDEN_ID = '해당 견적서의 Maker와 Dreamer만 조회할 수 있습니다.',
  QUOTE_FORBIDDEN_MAKER = '해당 견적서의 Maker만 조회할 수 있습니다.',
  QUOTE_FORBIDDEN_DREAMER = '해당 견적서의 Dreamer만 조회, 확정 할 수 있습니다.',
  QUOTE_CONFLICT_IS_CONFIRMED = '해당 견적서는 이미 요청 상태입니다.',
  QUOTE_BAD_REQUEST_IS_SENT = 'isSent는 boolean 값인 true와 false만 입력이 가능합니다. 필수 입력사항입니다.',
  QUOTE_BAD_REQUEST_IS_ASSIGNED = 'isAssigned는 boolean 값인 true와 false만 입력이 가능합니다. 필수 입력사항입니다.',
  QUOTE_BAD_REQUEST_IS_CONFIRMED = 'isConfirmed는 boolean 값인 true와 false만 입력이 가능합니다.',
  QUOTE_CONFLICT = '해당 플랜에 이미 견적서를 작성하셨습니다. 하나의 플랜에는 하나의 견적서만 쓸 수 있습니다.',

  INTERNAL_SERVER_ERROR = '내부 서버 오류'
}
export default ErrorMessage;
