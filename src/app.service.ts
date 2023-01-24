import { Injectable, Inject } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import config from './config';
import { Db } from 'mongodb';

@Injectable()
export class AppService {
  constructor(
    // @Inject('API_KEY') private apiKey: string,
    // @Inject('TASKS') private tasks: any[],
    // private configService: ConfigService,
    @Inject('MONGO') private database: Db,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  getHello(): string {
    // console.log(this.tasks);
    // const apiKey = this.configService.get<string>('API_KEY');
    // const dbName = this.configService.get('DATABASE_NAME');
    const apiKey = this.configService.apiKey;
    const dbName = this.configService.database.name;
    console.log(apiKey, dbName);
    // return 'Hello World!' + this.apiKey;
    return 'Hello World!';
  }

  getTasks() {
    return this.database.collection('tasks').find().toArray();
  }
}
