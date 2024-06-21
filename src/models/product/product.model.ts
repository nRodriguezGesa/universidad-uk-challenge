import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';
import { Product } from '../../schemas/product.schema';
import { BaseFiltersQuery } from '../base.filters.query.model';
import { Transform } from 'class-transformer';

class BaseProduct {
  @ApiProperty({
    description: 'Mongo id',
    readOnly: true,
    minimum: 1,
  })
  @IsMongoId()
  _id: string;
  @ApiProperty({ description: 'SKU', example: 'URB06W-IN', required: true })
  @IsString()
  SKU: string;
  @ApiProperty({
    description: 'description',
    example: 'Agua Mineral Smart Water',
    required: true,
  })
  @IsString()
  description: string;
  @IsNumber()
  @ApiProperty({
    description: 'price',
    example: '750.0',
    required: true,
  })
  price: number;
}
export class CreateProductDto extends OmitType(BaseProduct, ['_id'] as const) {}

export class UpdateProductDto extends PartialType(
  OmitType(BaseProduct, ['_id', 'SKU'] as const),
) {}

export class DeleteProductResponse extends OmitType(BaseProduct, [
  'description',
  'price',
] as const) {
  constructor(product: Product) {
    super();
    this.SKU = product.SKU;
    this._id = product._id.toString();
  }
}

export class ProductResponse extends OmitType(BaseProduct, ['_id'] as const) {
  constructor(product: Product) {
    super();
    this.SKU = product.SKU;
    this.description = product.description;
    this.price = product.price;
  }
}

export class GetProductQuery extends BaseFiltersQuery {
  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  @IsString()
  SKU?: string;
  @ApiProperty({ type: 'number', required: false })
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @IsNumber()
  minPrice?: number;
  @ApiProperty({ type: 'number', required: false })
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @IsNumber()
  maxPrice?: number;
  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}
