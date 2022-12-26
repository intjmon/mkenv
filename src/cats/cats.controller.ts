import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  HttpException,
  Param,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { UseFilters } from '@nestjs/common/decorators/core/exception-filters.decorator';
import { PositiveIntPipe } from 'src/common/pipes/positiveInt.pipe';
import { SuccessInterceptor } from 'src/common/interceptors/success.intercepteor';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter) // 각각의 메소드에 필터 데코레이터를 만들지않고 전역으로 사용해서 throw가 발생하면 필터가 실행된다.
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getCurrentCat() {
    return 'current cat';
  }

  @Post()
  async signUp() {
    return 'signup';
  }

  @Post('login')
  logIn() {
    return 'login';
  }

  @Post('logout')
  logOut() {
    return 'logout';
  }

  @Post('upload/cats')
  uploadCatImg() {
    return 'uploadImg';
  }
}
