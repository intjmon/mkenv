import { Controller, Get, Post, Put, Delete, Patch } from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpException } from '@nestjs/common/exceptions';

@Controller('cats')
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
