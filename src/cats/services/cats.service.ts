import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from '../cats.schema';
import { CatRequestDto } from '../dto/cats.request.dto';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CatsRepository } from '../cats.repository';

@Injectable() // Injectable은 프로바이더라는 의미
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}
  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;
    console.log('body:', body);
    const isCatExist = await this.catsRepository.existsByEmail(email);
    const isNameExist = await this.catsRepository.existsByName(name);

    if (isCatExist) {
      throw new UnauthorizedException('입력한 email 이미 존재합니다');
    }
    if (isNameExist) {
      throw new UnauthorizedException('입력한 name 이미 존재합니다');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('hashedPassword:', hashedPassword);

    const cat = await this.catsRepository.create({
      email,
      name,
      password: hashedPassword,
    });
    console.log('cat:', cat);
    console.log('cat2:', cat.readOnlyData);

    //return cat;
    return cat.readOnlyData;
  }

  async uploadCatImg(cat: Cat, files: Express.Multer.File[]) {
    const fileName = `cats/${files[0].filename}`;
    console.log('fileName:', fileName);
    const newCat = await this.catsRepository.findByIdAndUpdateImg(
      cat.id,
      fileName,
    );
    console.log(newCat);
    return newCat;
  }
}
