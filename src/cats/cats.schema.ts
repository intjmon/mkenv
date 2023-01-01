import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    example: 'jw@gmail.com',
    description: 'email',
    required: true,
  })
  @Prop({ required: true, unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'jw',
    description: 'name',
    required: true,
  })
  @Prop({ required: true, unique: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'PWD1234',
    description: 'password',
    required: true,
  })
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop({
    default:
      'https://github.com/amamov/NestJS-solid-restapi-boilerplate/raw/main/docs/images/1.jpeg',
  })
  @IsString()
  imgUrl: string;

  readonly readOnlyData: {
    id: string;
    email: string;
    name: string;
    imgUrl: string;
  };
}

export const CatSchema = SchemaFactory.createForClass(Cat);

// 스카아메 virtual은 가상으로 사용자에게 보여줄 값만 설정함
// 여기서는 불필요한 password, create_date, update_date를 리턴값에서 제외
CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    imgUrl: this.imgUrl,
  };
});
