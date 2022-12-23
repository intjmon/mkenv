import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('') // http://localhost:8000/cats/hello
  getHello(): string {
    //return this.appService.getHello();
    // 여기에서 바로 반환한다
    //    console.log(param);
    return 'Hello World from controller!!!';
  }
}
