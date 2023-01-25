import { CreateProductDto, UpdateProductDto } from '../dtos/poducts.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  // ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { ParseIntPipe } from 'src/common/parse-int/parse-int.pipe';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

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
    // return {
    //   message: `Products: limit => ${limit}, offset => ${offset}, brand => ${brand}`,
    // };
    return this.productsService.findAll();
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId') productId: string) {
    // response.status(200).send({
    //   message: `Product ${productId} retrieved`,
    // });
    // return {
    //   message: `Product ${productId} retrieved`,
    // };
    return this.productsService.findOne(productId);
  }

  // @Post()
  // create(@Body() payload: CreateProductDto) {
  //   // return {
  //   //   message: 'Product created',
  //   //   payload,
  //   // };
  //   return this.productsService.create(payload);
  // }

  // @Put(':productId')
  // update(
  //   @Param('productId') productId: string,
  //   @Body() payload: UpdateProductDto,
  // ) {
  //   // return {
  //   //   message: `Product ${productId} updated`,
  //   //   payload,
  //   // };
  //   return this.productsService.update(productId, payload);
  // }

  // @Delete(':productId')
  // delete(@Param('productId') productId: string) {
  //   // return {
  //   //   message: `Product ${productId} deleted`,
  //   // };
  //   return this.productsService.delete(productId);
  // }
}
