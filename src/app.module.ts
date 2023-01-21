import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/module/users.module';
import { ProductsModule } from './modules/products/module/products.module';
import { HttpModule, HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

const API_KEY = '123456789';
const API_KEY_PROD = 'PROD123';

@Module({
  imports: [UsersModule, ProductsModule, HttpModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    // useFactory just for demo purposes
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const tasks = await firstValueFrom(
          http.get('https://jsonplaceholder.typicode.com/todos', {
            headers: { 'Accept-Encoding': 'gzip,deflate,compress' },
          }),
        );
        return tasks.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
