import { CreateProductDto, UpdateProductDto } from '../dtos/poducts.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { ParseIntPipe } from 'src/common/parse-int/parse-int.pipe';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'List of products' })
  getProducts(
    @Query('limit', new ParseIntPipe(false)) limit = 100,
    @Query('offset', new ParseIntPipe(false)) offset = 0,
    @Query('brand') brand: string,
  ) {
    return this.productsService.findAll();
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId', MongoIdPipe) productId: string) {
    return this.productsService.findOne(productId);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':productId')
  update(
    @Param('productId', MongoIdPipe) productId: string,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(productId, payload);
  }

  @Delete(':productId')
  delete(@Param('productId', MongoIdPipe) productId: string) {
    return this.productsService.delete(productId);
  }
}
