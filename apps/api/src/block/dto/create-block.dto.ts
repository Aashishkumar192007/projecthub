import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBlockDto {
  @IsString()
  @IsNotEmpty()
  propertyProjectId: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateBlockDto extends CreateBlockDto {}
