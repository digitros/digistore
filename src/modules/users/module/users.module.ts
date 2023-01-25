import { Module } from '@nestjs/common';
import { UsersController } from '../controllers/users.controller';
import { CustomersController } from '../controllers/customers.controller';
import { UsersService } from '../services/users.service';
import { ProductsModule } from 'src/modules/products/module/products.module';
import { CustomersService } from '../services/customers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../entities/user.entity';
import { Order, OrderSchema } from '../entities/order.entity';
import { Customer } from '../entities/customer.entity';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Order.name,
        schema: OrderSchema,
      },
      {
        name: Customer.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UsersController, CustomersController],
  providers: [UsersService, CustomersService],
})
export class UsersModule {}
