import { Inject, Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { Order } from '../entity/order.entity';
import { ProductsService } from 'src/modules/products/service/products.service';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from '../dtos/user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService, // @Inject('API_KEY') private apiKey: string,
  ) {}

  private users: User[] = [
    {
      id: '1',
      name: 'User 1',
      email: 'email@email.com',
      password: '12345678',
      role: 'admin',
      status: 'active',
    },
  ];

  findAll() {
    const apiKey = this.configService.get('API_KEY');
    const dbName = this.configService.get('DATABASE_NAME');
    console.log(apiKey, dbName);
    return this.users;
  }

  findOne(id: string) {
    return this.users.find((item) => item.id === id);
  }

  createUser(payload: CreateUserDto) {
    const newUser = {
      id: uuidv4(4),
      ...payload,
    };
    this.users.push(newUser);
    return payload;
  }

  getOrdersByUserId(id: string): Order {
    const user = this.findOne(id);
    return { date: new Date(), user, products: this.productsService.findAll() };
  }
}
