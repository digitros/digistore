import { Module } from '@nestjs/common';
import { ProductsController } from '../controller/products.controller';
import { CategoriesController } from '../controller/categories.controller';
import { ProductsService } from '../services/products.service';
import { BrandsController } from '../controller/brands.controller';
import { BrandsService } from '../services/brands.service';
import { CategoriesService } from '../services/categories.service';
@Module({
  imports: [],
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [ProductsService, BrandsService, CategoriesService],
  exports: [ProductsService],
})
export class ProductsModule {}
