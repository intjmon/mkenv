import { Body, Controller, Get, Req, Param } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller('cats')
export class AppController {
  //constructor(private readonly appService: AppService) {}

  @Get('hello/:id/:name') // http://localhost:8000/cats/hello
  getHello(@Req() req: Request, @Body() Body, @Param() param): string {
    //return this.appService.getHello();
    // 여기에서 바로 반환한다
    console.log(param);
    return 'Hello World from controller!!!';
  }
}
