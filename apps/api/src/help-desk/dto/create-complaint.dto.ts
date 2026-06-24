import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateComplaintDto {
  @IsString()
  @IsNotEmpty()
  customerId: string;

  @IsString()
  @IsNotEmpty()
  unitId: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  priority: string; // LOW, MEDIUM, HIGH, URGENT

  @IsString()
  @IsOptional()
  status?: string;
}

export class UpdateComplaintDto extends CreateComplaintDto {}
