import { Injectable, NotFoundException } from '@nestjs/common';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}

  async findAll(params?: any) {
    if (params) {
      const { limit = 5, offset = 0 } = params;
      return this.brandModel.find().skip(offset).limit(limit).exec();
    }
    return await this.brandModel.find().exec();
  }

  async findOne(id: string) {
    const product = await this.brandModel.findById(id);
    if (!product) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return product;
  }

  async create(data: CreateBrandDto) {
    const newBrand = new this.brandModel(data);
    return await newBrand.save();
  }

  async update(id: number, changes: UpdateBrandDto) {
    try {
      const brand = await this.brandModel
        .findByIdAndUpdate(id, { $set: changes }, { new: true })
        .exec();
      return brand;
    } catch (err) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
  }

  remove(id: number) {
    try {
      return this.brandModel.findByIdAndDelete(id).exec();
    } catch (err) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
  }
}
