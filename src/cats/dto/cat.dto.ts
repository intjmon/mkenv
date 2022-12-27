import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

//
// PickType은 기존의 CatDto에서 email, name만 가져온다.
// OmitType은 기존의 CatDto에서 빼고 싶은 것을 제외하고 가져온다.
export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: '323425',
    description: 'id',
  })
  id: string;
}
