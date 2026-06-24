import { IsString, IsNotEmpty, IsOptional, IsEnum, IsArray, IsNumber } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  type: string; // e.g., 'RESIDENTIAL', 'COMMERCIAL'

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @IsNumber()
  @IsOptional()
  totalAreaSqFt?: number;

  @IsString()
  @IsOptional()
  constructionStatus?: string;

  @IsArray()
  @IsOptional()
  amenities?: string[];

  @IsArray()
  @IsOptional()
  images?: string[];
}

export class UpdatePropertyDto {
  @IsString() @IsOptional() name?: string;
  @IsString() @IsOptional() type?: string;
  @IsString() @IsOptional() address?: string;
  @IsString() @IsOptional() city?: string;
  @IsString() @IsOptional() state?: string;
  @IsString() @IsOptional() zipCode?: string;
  @IsNumber() @IsOptional() totalAreaSqFt?: number;
  @IsString() @IsOptional() constructionStatus?: string;
  @IsArray() @IsOptional() amenities?: string[];
  @IsArray() @IsOptional() images?: string[];
}
