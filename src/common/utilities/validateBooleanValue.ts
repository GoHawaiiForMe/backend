import ErrorMessage from '../constants/errorMessage.enum';
import BadRequestError from '../errors/badRequestError';

export default function validateBooleanValue(value: string, message: Partial<ErrorMessage>): Boolean {
  if (value === 'true') {
    return true; //내가 보낸 견적 중 뽑혔거나 대기중인 견적
  } else if (value === 'false') {
    return false; //내가 보낸 견적 중 뽑힐 일이 없는 견적
  } else {
    throw new BadRequestError(message);
  }
}
