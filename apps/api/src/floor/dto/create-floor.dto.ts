import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateFloorDto {
  @IsString()
  @IsNotEmpty()
  towerId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsOptional()
  floorNumber?: number;
}

export class UpdateFloorDto extends CreateFloorDto {}
