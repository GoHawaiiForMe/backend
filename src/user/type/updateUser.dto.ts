import { PartialType } from '@nestjs/swagger';
import { SignupUserDTO } from './signup.dto';

export default class UpdateUserDTO extends PartialType(SignupUserDTO) {}
