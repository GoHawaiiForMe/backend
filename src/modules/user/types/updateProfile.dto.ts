import { PartialType } from '@nestjs/swagger';
import { SignupProfileDTO } from './signup.dto';

export default class UpdateProfileDTO extends PartialType(SignupProfileDTO) {}
