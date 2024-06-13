// task.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  task: string;

  @IsString()
  description: string;

  @IsString()
  due_date: string;

  @IsBoolean()
  statuspending: boolean;

  @IsString()
  priority: string;

  @IsString()
  created_at: string;

  @IsString()
  updated_at: string;

  // @IsString()
  // comments: string[];

  @IsOptional()
  @IsString()
  project_id?: string;

  // @IsString()
  // @IsOptional()
  // user_id: string;

  // @IsString()
  // @IsOptional()
  // category_id: string;
}

