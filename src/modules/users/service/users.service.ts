import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { Order } from '../entity/order.entity';
import { ProductsService } from 'src/modules/products/service/products.service';

@Injectable()
export class UsersService {
  constructor(private productsService: ProductsService) {}

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

  findOne(id: string) {
    return this.users.find((item) => item.id === id);
  }

  getOrdersByUserId(id: string): Order {
    const user = this.findOne(id);
    return { date: new Date(), user, products: this.productsService.findAll() };
  }
}
