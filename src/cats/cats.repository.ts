import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cat } from './cats.schema';
import { HttpException } from '@nestjs/common';
import { CatRequestDto } from './dto/cats.request.dto';
import { CommentsSchema } from 'src/comments/comments.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async findAll() {
    //    return await this.catModel.find();
    const CommentsModel = mongoose.model('comments', CommentsSchema);
    const result = await this.catModel
      .find()
      .populate('comments', CommentsModel);
    return result;
  }

  async findByIdAndUpdateImg(id: string, fileName: string) {
    const cat = await this.catModel.findById(id);
    cat.imgUrl = `http://localhost:8000/media/${fileName}`;
    const newCat = await cat.save();
    console.log(newCat);
    return newCat.readOnlyData;
  }

  async findCatByIdWithoutPassword(
    catId: string | Types.ObjectId,
  ): Promise<Cat | null> {
    //const cat = await this.catModel.findById(catId).select('email name'); // email과 name가져옴
    //const cat = await this.catModel.findById(catId).select('email name'); // -email 빼고 가져빼
    const cat = await this.catModel.findById(catId).select('-password'); // 보안이유로 password는 안가져옴
    return cat;
  }

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

  async create(cat: CatRequestDto): Promise<Cat> {
    console.log('cat:', cat);
    return await this.catModel.create(cat);
  }

  async findCatByEmail(email: string): Promise<any> {
    const cat = await this.catModel.findOne({ email });
    return cat;
  }
}
