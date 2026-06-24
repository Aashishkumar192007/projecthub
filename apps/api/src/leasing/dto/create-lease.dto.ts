import { IsString, IsNotEmpty, IsDateString, IsNumber, IsEnum } from 'class-validator';

export class CreateLeaseDto {
  @IsString()
  @IsNotEmpty()
  unitId: string;

  @IsString()
  @IsNotEmpty()
  customerId: string;

  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @IsNumber()
  @IsNotEmpty()
  rentAmount: number;

  @IsNumber()
  @IsNotEmpty()
  securityDeposit: number;

  @IsString()
  @IsNotEmpty()
  paymentFrequency: string; // MONTHLY, QUARTERLY, ANNUALLY

  @IsString()
  @IsNotEmpty()
  status: string; // ACTIVE, PENDING, EXPIRED, TERMINATED
}

export class UpdateLeaseDto extends CreateLeaseDto {}
