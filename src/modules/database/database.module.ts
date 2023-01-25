import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoClient } from 'mongodb';
import config from 'src/config';

const API_KEY = '123456789';
const API_KEY_PROD = 'PROD123';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { dbUri, dbName } = configService.mongo;
        return { uri: dbUri, dbName };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { dbUri, dbName } = configService.mongo;
        const client = new MongoClient(dbUri);
        try {
          await client.connect();
          const database = client.db(dbName);
          return database;
        } catch (error) {
          console.log(error);
        }
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'MONGO', MongooseModule],
})
export class DatabaseModule {}
