import { CategorySchema } from './../entities/category.entity';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Category } from '../entities/category.entity';
import {
  CreateCategoryDto,
  FilterCategoriesDto,
  UpdateCategoryDto,
} from '../dtos/category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async findAll(params?: FilterCategoriesDto) {
    if (params) {
      const { limit = 5, offset = 0 } = params;
      return this.categoryModel.find().skip(offset).limit(limit).exec();
    }
    return await this.categoryModel.find().exec();
  }

  async findOne(id: string) {
    const category = await this.categoryModel.findById(id);
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  async create(data: CreateCategoryDto) {
    const newCategory = new this.categoryModel(data);
    return await newCategory.save();
  }

  async update(id: number, changes: UpdateCategoryDto) {
    try {
      const category = await this.categoryModel
        .findByIdAndUpdate(id, { $set: changes }, { new: true })
        .exec();
      return category;
    } catch (err) {
      throw new NotFoundException(`Category #${id} not found`);
    }
  }

  remove(id: number) {
    try {
      return this.categoryModel.findByIdAndDelete(id);
    } catch (err) {
      throw new NotFoundException(`Category #${id} not found`);
    }
  }
}
