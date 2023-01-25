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

  // create(data: CreateCustomerDto) {
  //   this.counterId = this.counterId + 1;
  //   const newCustomer = {
  //     id: this.counterId,
  //     ...data,
  //   };
  //   this.customers.push(newCustomer);
  //   return newCustomer;
  // }

  // update(id: number, changes: UpdateCustomerDto) {
  //   const customer = this.findOne(id);
  //   const index = this.customers.findIndex((item) => item.id === id);
  //   this.customers[index] = {
  //     ...customer,
  //     ...changes,
  //   };
  //   return this.customers[index];
  // }

  // remove(id: number) {
  //   const index = this.customers.findIndex((item) => item.id === id);
  //   if (index === -1) {
  //     throw new NotFoundException(`Customer #${id} not found`);
  //   }
  //   this.customers.splice(index, 1);
  //   return true;
  // }
}
