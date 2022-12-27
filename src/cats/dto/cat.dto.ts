import { ApiProperty } from '@nestjs/swagger';

export class ReadOnlyCatDto {
  @ApiProperty({
    example: '323425',
    description: 'id',
  })
  id: string;

  @ApiProperty({
    example: 'jw@gmail.com',
    description: 'email',
  })
  email: string;

  @ApiProperty({
    example: 'JW Kim',
    description: 'name',
  })
  name: string;
}
