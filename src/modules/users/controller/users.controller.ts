import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../dtos/user.dto';
import { UsersService } from './../service/users.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.findAll();
  }

  @Get(':id/orders')
  getOrders(@Param('id') id: string) {
    return this.usersService.getOrdersByUserId(id);
  }

  @Post()
  createUser(@Body() payload: CreateUserDto) {
    return this.usersService.createUser(payload);
  }
}
