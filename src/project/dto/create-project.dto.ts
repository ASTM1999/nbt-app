// project.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty()
  created_at: string;

  @IsString()
  @IsNotEmpty()
  updated_at: string;

  @IsString()
  @IsOptional()
  color: string;

  @IsBoolean()
  @IsOptional()
  favorite: boolean;

  @IsBoolean()
  @IsOptional()
  status: boolean; //Active : default=false

  @IsString({ each: true })
  @IsOptional()
  tasks: string[];
}
