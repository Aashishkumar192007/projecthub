import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateTowerDto {
  @IsString()
  @IsNotEmpty()
  projectId: string; // The Property ID

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsOptional()
  totalFloors?: number;

  @IsNumber()
  @IsOptional()
  yearBuilt?: number;
}

export class UpdateTowerDto extends CreateTowerDto {}
