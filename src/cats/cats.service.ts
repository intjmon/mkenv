import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './cats.schema';
import { CatRequestDto } from './dto/cats.request.dto';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable() // Injectable은 프로바이더라는 의미
export class CatsService {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}
  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;
    const isCatExist = await this.catModel.exists({ email });
    const isNameExist = await this.catModel.exists({ name });

    if (isCatExist) {
      throw new UnauthorizedException('입력한 email 이미 존재합니다');
    }
    if (isNameExist) {
      throw new UnauthorizedException('입력한 name 이미 존재합니다');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const cat = await this.catModel.create({
      email,
      name,
      password: hashedPassword,
    });

    //return cat;
    return cat.readOnlyData;
  }
}
