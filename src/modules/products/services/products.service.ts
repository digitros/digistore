import { CreateProductDto, UpdateProductDto } from '../dtos/poducts.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findAll() {
    return await this.productModel.find().exec();
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return product;
  }

  // create(payload: CreateProductDto) {
  //   const newProduct = {
  //     id: uuidv4(4),
  //     ...payload,
  //   };
  //   this.products.push(newProduct);
  //   return newProduct;
  // }

  // update(id: string, payload: UpdateProductDto) {
  //   const product = this.findOne(id);
  //   if (product) {
  //     const index = this.products.findIndex((item) => item.id === id);
  //     this.products[index] = {
  //       ...product,
  //       ...payload,
  //     };
  //     return this.products[index];
  //   }
  //   return null;
  // }

  // delete(id: string) {
  //   const product = this.findOne(id);
  //   if (product) {
  //     this.products = this.products.filter((item) => item.id !== id);
  //     return {
  //       message: `Product ${id} deleted`,
  //     };
  //   }
  //   return null;
  // }
}
