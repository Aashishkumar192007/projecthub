import { IsString, IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  @IsNotEmpty()
  invoiceId: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsDateString()
  @IsNotEmpty()
  paymentDate: string;

  @IsString()
  @IsNotEmpty()
  paymentMethod: string; // CASH, CREDIT_CARD, BANK_TRANSFER, CHEQUE

  @IsString()
  @IsNotEmpty()
  referenceNumber: string;
}

export class UpdatePaymentDto extends CreatePaymentDto {}
