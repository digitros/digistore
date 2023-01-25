import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from '../dtos/poducts.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findAll(params?: FilterProductsDto) {
    if (params) {
      const filters: FilterQuery<Product> = {};
      const { limit = 5, offset = 0, minPrice, maxPrice } = params;
      if (minPrice && maxPrice) {
        filters.price = {
          $gte: minPrice,
          $lte: maxPrice,
        };
      }
      return this.productModel
        .find(filters)
        .populate('brand')
        .skip(offset)
        .limit(limit)
        .exec();
    }
    return await this.productModel.find().populate('brand').exec();
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    const newProduct = new this.productModel(data);
    return await newProduct.save();
  }

  async update(id: string, changes: UpdateProductDto) {
    try {
      const product = await this.productModel
        .findByIdAndUpdate(id, { $set: changes }, { new: true })
        .exec();
      return product;
    } catch (err) {
      throw new NotFoundException(`Product ${id} not found`);
    }
  }

  async delete(id: string) {
    try {
      await this.productModel.findByIdAndDelete(id).exec();
    } catch (err) {
      throw new NotFoundException(`Product ${id} not found`);
    }
  }
}
