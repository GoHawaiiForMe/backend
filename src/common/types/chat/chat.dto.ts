import { IsMongoId, IsString } from 'class-validator';

export class ChatIdDTO {
  @IsString()
  @IsMongoId()
  id: string;
}
