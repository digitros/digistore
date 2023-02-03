import { AddProductsToUserDto, FilterUsersDto } from './../dtos/user.dto';
import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

import { ProductsService } from './../../products/services/products.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async findAll(params?: FilterUsersDto) {
    if (params) {
      const { limit = 5, offset = 0 } = params;
      return this.userModel
        .find()
        .populate('products')
        .populate({ path: 'products', populate: 'brand' })
        .skip(offset)
        .limit(limit)
        .exec();
    }
    return await this.userModel
      .find()
      .populate('products')
      .populate({ path: 'products', populate: 'brand' })
      .exec();
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async create(data: CreateUserDto) {
    const newUser = new this.userModel(data);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;
    const user = await newUser.save();
    const { password, ...result } = user.toObject();
    return result;
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email }).exec();
  }

  async update(id: number, changes: UpdateUserDto) {
    try {
      const user = await this.userModel.findByIdAndUpdate(
        id,
        { $set: changes },
        { new: true },
      );
      return user;
    } catch (err) {
      throw new NotFoundException(`User #${id} not found`);
    }
  }

  async remove(id: number) {
    try {
      await this.userModel.findByIdAndDelete(id).exec();
    } catch (err) {
      throw new NotFoundException(`User #${id} not found`);
    }
  }

  async removeProduct(userId: string, productId: string) {
    const user = await this.userModel.findById(userId);
    user.products.pull(productId);
    return await user.save();
  }

  async addProduct(userId: string, productsIds: string[]) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException(`User #${userId} not found`);
    if (!productsIds)
      throw new NotFoundException(`Products #${productsIds} not found`);
    productsIds.forEach((productId) => {
      if (!user.products.includes(productId)) {
        user.products.push(productId);
      }
    });
    return await user.save();
  }

  async getOrderByUser(id: string) {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    };
  }
}
