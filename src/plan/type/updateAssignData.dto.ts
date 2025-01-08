import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';

export default class UpdateAssignDataDTO {
  @IsArray() // assigneeIds가 배열인지 확인
  @ArrayNotEmpty() // 배열이 비어있지 않은지 확인
  @IsString({ each: true })
  assigneeIds: string[];
}
