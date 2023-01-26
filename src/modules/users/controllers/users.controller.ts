import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';

import { UsersService } from '../services/users.service';
import {
  AddProductsToUserDto,
  CreateUserDto,
  FilterUsersDto,
  UpdateUserDto,
} from '../dtos/user.dto';
import { ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll(@Query() params?: FilterUsersDto) {
    return this.usersService.findAll(params);
  }

  @Get(':id')
  get(@Param('id', MongoIdPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Get(':id/orders')
  getOrders(@Param('id', MongoIdPipe) id: string) {
    return this.usersService.getOrderByUser(id);
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @Put(':id')
  update(@Param('id', MongoIdPipe) id: number, @Body() payload: UpdateUserDto) {
    return this.usersService.update(id, payload);
  }

  @Put(':userId/products')
  addProduct(
    @Param('userId', MongoIdPipe) userId: string,
    @Body() payload: AddProductsToUserDto,
  ) {
    const { productsIds } = payload;
    return this.usersService.addProduct(userId, productsIds);
  }

  @Delete(':id')
  remove(@Param('id', MongoIdPipe) id: number) {
    return this.usersService.remove(id);
  }

  @Delete(':userId/products/:productId')
  removeProduct(
    @Param('userId', MongoIdPipe) userId: string,
    @Param('productId', MongoIdPipe) productId: string,
  ) {
    return this.usersService.removeProduct(userId, productId);
  }
}
