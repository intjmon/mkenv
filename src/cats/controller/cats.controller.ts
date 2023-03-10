import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CatsService } from '../services/cats.service';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { UseFilters } from '@nestjs/common/decorators/core/exception-filters.decorator';
import { PositiveIntPipe } from 'src/common/pipes/positiveInt.pipe';
import { SuccessInterceptor } from 'src/common/interceptors/success.intercepteor';
import { CatRequestDto } from '../dto/cats.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from '../dto/cat.dto';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorators';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadedFiles } from '@nestjs/common/decorators';
import { multerOptions } from 'src/common/utils/multer.options';
import { Cat } from '../cats.schema';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter) // 각각의 메소드에 필터 데코레이터를 만들지않고 전역으로 사용해서 throw가 발생하면 필터가 실행된다.
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    // auth service를 사용하기위해 Dependency Injection을 해준다.-> cat.module.ts에서 import해워쟈함
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '현재 고양이 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentCat(@CurrentUser() cat) {
    return cat.readOnlyData;
  }

  @ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: ReadOnlyCatDto,
  })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signUp(body);
  }

  // auth.service에서 구현한 인증 서비스를 Dependency Injection을 통해 주입받아 사용함
  // auth 모듈을 사용해 로그인함
  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogin(data);
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  logOut() {
    return 'logout';
  }

  @ApiOperation({ summary: '고양이 이미지 업로드' })
  //@UseInterceptors(FilesInterceptor('image'), 10, multerOptions('cats'))) // 클라form에서 key를 image라고 설정함
  //  @UseInterceptors(FilesInterceptor('image'), 10,) // 클라form에서 key를 image라고 설정함
  @UseInterceptors(FilesInterceptor('image', 10, multerOptions('cats')))
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  uploadCatImg(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @CurrentUser() cat: Cat,
  ) {
    console.log(files);
    //return 'uploadImg';
    //return { image: `http://localhost:8000/media/cats/${files[0].filename}` };
    return this.catsService.uploadCatImg(cat, files);
  }

  @ApiOperation({ summary: '모든 고양이 가져오기' })
  @Get('all')
  getAllCat() {
    return this.catsService.getAllCat();
  }
}
