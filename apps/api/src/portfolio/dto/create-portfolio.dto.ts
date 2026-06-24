import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePortfolioDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdatePortfolioDto extends CreatePortfolioDto {}
