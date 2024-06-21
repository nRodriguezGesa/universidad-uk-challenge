import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../schemas/product.schema';
import {
  CreateProductDto,
  GetProductQuery,
  ProductResponse,
  UpdateProductDto,
} from '../models/product/product.model';
import { BaseFiltersQuery } from 'src/models/base.filters.query.model';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}
  async findAllProducts(filters: BaseFiltersQuery): Promise<ProductResponse[]> {
    return await this.productModel
      .find()
      .limit(filters.limit)
      .skip(filters.offset);
  }

  async findProducts(filters: GetProductQuery): Promise<Product[]> {
    const query: any = {};

    if (filters.SKU) {
      query.SKU = filters.SKU;
    }

    if (filters.description) {
      query.description = { $regex: filters.description, $options: 'i' };
    }

    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      query.price = {};
      if (filters.minPrice !== undefined) {
        query.price.$gte = filters.minPrice;
      }
      if (filters.maxPrice !== undefined) {
        query.price.$lte = filters.maxPrice;
      }
    }

    const products = await this.productModel
      .find(query)
      .limit(filters.limit)
      .skip(filters.offset);

    return products;
  }

  async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<ProductDocument> {
    const newProduct = new this.productModel(createProductDto);
    return newProduct.save();
  }

  async updateProduct(
    SKU: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product | null> {
    return await this.productModel.findOneAndUpdate(
      { SKU },
      { $set: updateProductDto },
      { new: true },
    );
  }

  async deleteProduct(SKU: string): Promise<Product | null> {
    return await this.productModel.findOneAndDelete({ SKU });
  }
}
