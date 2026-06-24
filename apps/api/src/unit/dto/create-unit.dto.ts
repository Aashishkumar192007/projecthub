import { IsString, IsNotEmpty, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateUnitDto {
  @IsString()
  @IsOptional()
  towerId?: string;

  @IsString()
  @IsNotEmpty()
  floorId: string;

  @IsString()
  @IsNotEmpty()
  unitNumber: string;

  @IsString()
  @IsOptional()
  unitType?: string; // RESIDENTIAL_APARTMENT, COMMERCIAL_OFFICE, etc.

  @IsNumber()
  @IsOptional()
  areaSqFt?: number;

  @IsNumber()
  @IsOptional()
  bedrooms?: number;

  @IsNumber()
  @IsOptional()
  bathrooms?: number;

  @IsBoolean()
  @IsOptional()
  isFurnished?: boolean;
}

export class UpdateUnitDto {
  @IsString() @IsOptional() towerId?: string;
  @IsString() @IsOptional() floorId?: string;
  @IsString() @IsOptional() unitNumber?: string;
  @IsString() @IsOptional() unitType?: string;
  @IsNumber() @IsOptional() areaSqFt?: number;
  @IsNumber() @IsOptional() bedrooms?: number;
  @IsNumber() @IsOptional() bathrooms?: number;
  @IsBoolean() @IsOptional() isFurnished?: boolean;
}
