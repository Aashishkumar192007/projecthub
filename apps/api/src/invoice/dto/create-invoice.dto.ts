import { IsString, IsNotEmpty, IsDateString, IsNumber, IsOptional } from 'class-validator';

export class CreateInvoiceDto {
  @IsString()
  @IsNotEmpty()
  leaseId: string;

  @IsString()
  @IsNotEmpty()
  customerId: string;

  @IsDateString()
  @IsNotEmpty()
  invoiceDate: string;

  @IsDateString()
  @IsNotEmpty()
  dueDate: string;

  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;

  @IsString()
  @IsOptional()
  status?: string; // DRAFT, UNPAID
}

export class UpdateInvoiceDto extends CreateInvoiceDto {}
