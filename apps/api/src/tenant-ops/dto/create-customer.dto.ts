import { IsString, IsNotEmpty, IsEmail, IsOptional, IsEnum } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsNotEmpty()
  type: string; // e.g., 'INDIVIDUAL', 'CORPORATE'

  @IsString()
  @IsOptional()
  kycStatus?: string;
}

export class UpdateCustomerDto extends CreateCustomerDto {}
