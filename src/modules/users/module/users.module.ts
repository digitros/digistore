import { Module } from '@nestjs/common';
import { UsersController } from '../controllers/users.controller';
import { CustomersController } from '../controllers/customers.controller';
import { UsersService } from '../services/users.service';
import { ProductsModule } from 'src/modules/products/module/products.module';
import { CustomersService } from '../services/customers.service';

@Module({
  imports: [ProductsModule],
  controllers: [UsersController, CustomersController],
  providers: [UsersService, CustomersService],
})
export class UsersModule {}
