import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  HttpException,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { UseFilters } from '@nestjs/common/decorators/core/exception-filters.decorator';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  // cats/
  @Get()
  @UseFilters(HttpExceptionFilter) // 각각의 메소드에 필터를 적용할 수 있다.
  getAllCat() {
    throw new HttpException('API is broken', 401);
    return 'all cat';
  }

  // cats/:id
  @Get(':id')
  getOneCat() {
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
