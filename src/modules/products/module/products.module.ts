import { Module } from '@nestjs/common';
import { ProductsController } from '../controller/products.controller';
import { CategoriesController } from '../controller/categories.controller';
import { ProductsService } from '../service/products.service';
@Module({
  imports: [],
  controllers: [ProductsController, CategoriesController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
