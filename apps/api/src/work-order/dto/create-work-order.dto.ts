import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateWorkOrderDto {
  @IsString()
  @IsNotEmpty()
  propertyProjectId: string;

  @IsString()
  @IsOptional()
  unitId?: string;

  @IsString()
  @IsOptional()
  complaintId?: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  priority: string; // LOW, MEDIUM, HIGH, URGENT

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  assignedToId?: string; // Vendor or Employee
}

export class UpdateWorkOrderDto extends CreateWorkOrderDto {}
