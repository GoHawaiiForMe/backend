import { Type } from 'class-transformer';
import { IsInt, IsMongoId, IsString, Min } from 'class-validator';

export class ChatRoomQueryDTO {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize: number = 5;
}

export class ChatRoomIdDTO {
  @IsString()
  @IsMongoId()
  chatRoomId: string;
}
