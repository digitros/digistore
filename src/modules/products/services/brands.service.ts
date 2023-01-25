import { Injectable, NotFoundException } from '@nestjs/common';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}

  findAll() {
    return this.brandModel.find().exec();
  }

  findOne(id: string) {
    const product = this.brandModel.findById(id);
    if (!product) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return product;
  }

  // create(data: CreateBrandDto) {
  //   this.counterId = this.counterId + 1;
  //   const newBrand = {
  //     id: this.counterId,
  //     ...data,
  //   };
  //   this.brands.push(newBrand);
  //   return newBrand;
  // }

  // update(id: number, changes: UpdateBrandDto) {
  //   const brand = this.findOne(id);
  //   const index = this.brands.findIndex((item) => item.id === id);
  //   this.brands[index] = {
  //     ...brand,
  //     ...changes,
  //   };
  //   return this.brands[index];
  // }

  // remove(id: number) {
  //   const index = this.brands.findIndex((item) => item.id === id);
  //   if (index === -1) {
  //     throw new NotFoundException(`Brand #${id} not found`);
  //   }
  //   this.brands.splice(index, 1);
  //   return true;
  // }
}
