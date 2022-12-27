import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cats.schema';
import { HttpException } from '@nestjs/common';
import { CatRequestDto } from './dto/cats.request.dto';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async existsByEmail(email: string): Promise<boolean> {
    // 에러처리는 리포지터리에서 해도되지만  스키마 코드에서 이미 타입을 정의해놨기 때문의
    // 그쪽에서 invalidation error를 던지도록 해 놨다.->여기서 안해도 됨
    // 아래 코드는 여기에서 할 수도 있는 예시
    // 만약 스키마쪽에서 처리한 에러가 제대로 동작하지 않는다면 여기서 해줌
    try {
      const result = await this.catModel.exists({ email });
      return result ? true : false;
    } catch (error) {
      throw new HttpException('db error', 400);
    }
  }

  // 얘는 예외처리 안함
  async existsByName(name: string): Promise<boolean> {
    const result = await this.catModel.exists({ name });
    return result ? true : false;
  }

  async create(cat: CatRequestDto): Promise<any> {
    return await this.catModel.exists({ cat });
  }
}
