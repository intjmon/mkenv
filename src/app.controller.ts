import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CatsService } from './cats/cats.service';

@Controller()
export class AppController {
  // appService를 주입받음-> app.module.ts에서 providers에 등록되어 있어야 함
  // cats.service.ts에 있는 hiCatServiceProduct() 메소드를 사용하기위해 주입함
  //    -> 그렇게 하려면 app.module.ts에서 providers에 등록되어 있어야 함
  //    -> 또는 cats.module.ts에서 exports에 등록되어 있어야 함
  constructor(
    private readonly appService: AppService,
    private readonly catService: CatsService,
  ) {}

  @Get('') // localhost:3000
  getHello(): string {
    // 주입받은 appService의 getHello() 메소드를 반환
    console.log(this.catService.hiCatServiceProduct());
    return this.appService.getHello();
  }
}
