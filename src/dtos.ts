import { IsDateString } from 'class-validator';

export class ScheduleSingleTaskDto {
  @IsDateString()
  executeAt: string;
}
