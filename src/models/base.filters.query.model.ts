import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class BaseFiltersQuery {
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @ApiProperty({ type: 'number', default: 10 })
  limit?: number;

  @Transform(({ value }) => parseInt(value <= -1 ? 0 : value))
  @IsOptional()
  @IsNumber()
  @ApiProperty({ type: 'number', default: 0 })
  offset?: number;
}
