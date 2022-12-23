import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    // code : service logic

    console.log('Hello World!~~~~!');
    return 'Hello World!~~~~!';
  }
}
