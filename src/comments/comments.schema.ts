import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { Document, SchemaOptions, Types } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Comments extends Document {
  @ApiProperty({
    description: '고양이 id',
    required: true,
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
    unique: true,
    ref: 'cats',
  })
  @IsNotEmpty()
  author: Types.ObjectId;

  @ApiProperty({
    description: '댓글 내용',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  contents: string;

  @ApiProperty({
    description: '좋아요 수',
  })
  @Prop({
    cefault: 0,
  })
  @IsPositive()
  likeCount: string;

  @ApiProperty({
    description: '작성대상',
    required: true,
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'cats',
  })
  @IsNotEmpty()
  info: Types.ObjectId;
}
export const CommentsSchema = SchemaFactory.createForClass(Comments);
