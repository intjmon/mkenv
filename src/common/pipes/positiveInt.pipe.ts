import { Injectable, PipeTransform } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';

@Injectable()
export class PositiveIntPipe implements PipeTransform {
  // ms 문서의 taskA가 transform임
  transform(value: number) {
    console.log('PositiveIntPipe:', value);
    if (value < 0) throw new HttpException('value > 0', 400);
    return value;
  }
}
