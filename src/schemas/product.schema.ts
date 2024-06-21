import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  _id: mongoose.Types.ObjectId;
  @Prop({ required: true, unique: true })
  SKU: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  price: number;
}
export const ProductSchema = SchemaFactory.createForClass(Product);
