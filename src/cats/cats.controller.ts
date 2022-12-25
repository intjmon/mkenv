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
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { UseFilters } from '@nestjs/common/decorators/core/exception-filters.decorator';
import { PositiveIntPipe } from 'src/common/pipes/positiveInt.pipe';

@Controller('cats')
@UseFilters(HttpExceptionFilter) // 각각의 메소드에 필터 데코레이터를 만들지않고 전역으로 사용해서 throw가 발생하면 필터가 실행된다.
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  // cats/
  @Get()
  getAllCat() {
    throw new HttpException('API is broken', 401);
    return 'all cat';
  }

  // cats/:id
  @Get(':id')
  // ms문서의 taskA가 ParseIntPipe, taskB가 PositiveIntPipe
  getOneCat(@Param('id', ParseIntPipe, PositiveIntPipe) param: number) {
    console.log(param);
    console.log(typeof param);
    return 'one cat';
  }

  @Post()
  createCat() {
    return 'create cat';
  }

  @Put(':id')
  updateCat() {
    return 'update cat';
  }

  @Patch(':id')
  updatePartialCat() {
    return 'update partial cat';
  }

  @Delete(':id')
  DeleteCat() {
    return 'delete cat';
  }
}
