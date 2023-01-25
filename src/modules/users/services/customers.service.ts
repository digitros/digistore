import { Injectable, NotFoundException } from '@nestjs/common';

import { Customer } from '../entities/customer.entity';
import {
  CreateCustomerDto,
  FilterCustomersDto,
  UpdateCustomerDto,
} from '../dtos/customer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  async findAll(params?: FilterCustomersDto) {
    if (params) {
      const { limit = 5, offset = 0 } = params;
      return this.customerModel.find().skip(offset).limit(limit).exec();
    }
    return await this.customerModel.find().exec();
  }

  async findOne(id: string) {
    const customer = await this.customerModel.findById(id);
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  async create(data: CreateCustomerDto) {
    const newCustomer = new this.customerModel(data);
    return await newCustomer.save();
  }

  async update(id: number, changes: UpdateCustomerDto) {
    try {
      const product = await this.customerModel
        .findByIdAndUpdate(id, { $set: changes }, { new: true })
        .exec();
      return product;
    } catch (err) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
  }

  async remove(id: number) {
    try {
      await this.customerModel.findByIdAndDelete(id).exec();
    } catch (err) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
  }
}
