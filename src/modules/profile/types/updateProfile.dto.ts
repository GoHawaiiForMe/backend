import { PartialType } from '@nestjs/swagger';
import { SignupProfileDTO } from 'src/modules/auth/types/signup.dto';

export default class UpdateProfileDTO extends PartialType(SignupProfileDTO) {}
