import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

// 아래 email형식이 email형식인 것을 검증하기위해 class-validator를 사용한다.
// npm i --save class-validator class-transformer
// email의 경우는 @isEmail()을 사용한다.
@Schema(options)
export class Cat extends Document {
  @Prop({ required: true, unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop()
  @IsString()
  imgUrl: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
