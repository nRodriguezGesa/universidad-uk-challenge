import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { MONGO_ERROR_CODES } from 'src/constants';
import { BaseFiltersQuery } from 'src/models/base.filters.query.model';
import {
  CreateProductDto,
  DeleteProductResponse,
  GetProductQuery,
  ProductResponse,
  UpdateProductDto,
} from 'src/models/product/product.model';
import { ProductRepository } from 'src/repositories/product.repository';
import { Product } from 'src/schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async findAllProducts(filters: BaseFiltersQuery): Promise<ProductResponse[]> {
    const products = await this.productRepository.findAllProducts(filters);
    return products.map((product) => new ProductResponse(product as Product));
  }

  async findProducts(filters: GetProductQuery): Promise<ProductResponse[]> {
    const products = await this.productRepository.findProducts(filters);
    return products.map((product) => new ProductResponse(product as Product));
  }

  async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<ProductResponse> {
    try {
      const product =
        await this.productRepository.createProduct(createProductDto);
      return new ProductResponse(product as Product);
    } catch (error) {
      if (error.code === MONGO_ERROR_CODES.DUPLICATE_KEY) {
        throw new ConflictException('A product with this SKU already exists');
      } else {
        throw new InternalServerErrorException(
          'An error occurred while creating the product',
        );
      }
    }
  }

  async updateProduct(
    SKU: string,
    product: UpdateProductDto,
  ): Promise<ProductResponse> {
    const updatedProduct = await this.productRepository.updateProduct(
      SKU,
      product,
    );

    if (!updatedProduct) {
      throw new NotFoundException('Product not found');
    }

    return new ProductResponse(updatedProduct);
  }

  async deleteProduct(SKU: string): Promise<DeleteProductResponse> {
    const deletedProduct = await this.productRepository.deleteProduct(SKU);

    if (!deletedProduct) {
      throw new NotFoundException('Product not found');
    }

    return new DeleteProductResponse(deletedProduct);
  }
}
