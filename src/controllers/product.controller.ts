import {
  Controller,
  Get,
  Headers,
  ValidationPipe,
  Query,
  HttpStatus,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import BaseResponse from 'src/models/base.response.model';
import {
  CreateProductDto,
  DeleteProductResponse,
  GetProductQuery,
  ProductResponse,
  UpdateProductDto,
} from 'src/models/product/product.model';
import { ProductService } from 'src/services/product.service';
import { BaseFiltersQuery } from 'src/models/base.filters.query.model';
import { API_TAGS } from 'src/constants';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiExtraModels(BaseResponse, ProductResponse)
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(BaseResponse) },
        {
          properties: {
            content: {
              type: 'array',
              items: { $ref: getSchemaPath(ProductResponse) },
            },
          },
        },
      ],
    },
    description: 'Products',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    explode: false,
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    explode: false,
    type: Number,
  })
  @ApiTags(API_TAGS.PRODUCT)
  @Get('all')
  async findAllProducts(
    @Headers() headers,
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    filters: BaseFiltersQuery,
  ): Promise<BaseResponse<ProductResponse[]>> {
    const products: ProductResponse[] =
      await this.productService.findAllProducts(filters);
    return new BaseResponse(HttpStatus.OK, 'Products', products);
  }

  @ApiExtraModels(BaseResponse, ProductResponse)
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(BaseResponse) },
        {
          properties: {
            content: {
              type: 'array',
              items: { $ref: getSchemaPath(ProductResponse) },
            },
          },
        },
      ],
    },
    description: 'Products',
  })
  @ApiQuery({
    name: 'SKU',
    required: false,
    explode: false,
    type: String,
  })
  @ApiQuery({
    name: 'description',
    required: false,
    explode: false,
    type: String,
  })
  @ApiQuery({
    name: 'minPrice',
    required: false,
    explode: false,
    type: Number,
  })
  @ApiQuery({
    name: 'maxPrice',
    required: false,
    explode: false,
    type: Number,
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    explode: false,
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    explode: false,
    type: Number,
  })
  @ApiTags(API_TAGS.PRODUCT)
  @Get()
  async findProducts(
    @Headers() headers,
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    filters: GetProductQuery,
  ): Promise<BaseResponse<ProductResponse[]>> {
    const products: ProductResponse[] =
      await this.productService.findProducts(filters);
    return new BaseResponse(HttpStatus.OK, 'Products', products);
  }

  @ApiExtraModels(BaseResponse, ProductResponse)
  @ApiCreatedResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(BaseResponse) },
        {
          properties: {
            content: {
              type: 'array',
              items: { $ref: getSchemaPath(ProductResponse) },
            },
          },
        },
      ],
    },
    description: 'Product',
  })
  @ApiTags(API_TAGS.PRODUCT)
  @ApiBody({ type: CreateProductDto })
  @Post()
  async createProduct(
    @Headers() headers,
    @Body() payload: CreateProductDto,
  ): Promise<BaseResponse<ProductResponse>> {
    const response: ProductResponse =
      await this.productService.createProduct(payload);
    return new BaseResponse(HttpStatus.OK, 'Created product', response);
  }

  @ApiExtraModels(BaseResponse, ProductResponse)
  @ApiAcceptedResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(BaseResponse) },
        {
          properties: {
            content: {
              type: 'array',
              items: { $ref: getSchemaPath(ProductResponse) },
            },
          },
        },
      ],
    },
    description: 'Product',
  })
  @ApiQuery({
    name: 'SKU',
    required: true,
    explode: false,
    type: String,
  })
  @ApiTags(API_TAGS.PRODUCT)
  @ApiBody({ type: UpdateProductDto })
  @Patch()
  async updateProduct(
    @Headers() headers,
    @Query(
      'SKU',
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    SKU: string,
    @Body() payload: UpdateProductDto,
  ): Promise<BaseResponse<ProductResponse>> {
    const response: ProductResponse = await this.productService.updateProduct(
      SKU,
      payload,
    );
    return new BaseResponse(HttpStatus.OK, 'Updated Product', response);
  }

  @ApiExtraModels(BaseResponse, DeleteProductResponse)
  @ApiAcceptedResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(BaseResponse) },
        {
          properties: {
            content: {
              type: 'array',
              items: { $ref: getSchemaPath(DeleteProductResponse) },
            },
          },
        },
      ],
    },
    description: 'Product',
  })
  @ApiQuery({
    name: 'SKU',
    required: true,
    explode: false,
    type: String,
  })
  @ApiTags(API_TAGS.PRODUCT)
  @Delete()
  async deleteProduct(
    @Headers() headers,
    @Query(
      'SKU',
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    SKU: string,
  ): Promise<BaseResponse<DeleteProductResponse>> {
    const response: DeleteProductResponse =
      await this.productService.deleteProduct(SKU);
    return new BaseResponse(HttpStatus.OK, 'Deleted Product', response);
  }
}
