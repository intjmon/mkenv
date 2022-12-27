import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatsRepository } from 'src/cats/cats.repository';
import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  // 로그인은 이메일과 패스워드가 필요
  // 이메일 패스워드가 모두 검증되고 통과하면
  // 토큰을 생성해서 반환
  // 이 작업을 하려면 catsRepository가 필요
  //  -> 그러므로 Dependency Injection을 통해 catsRepository를 받아옴
  //     -> auth module에서 catsRepository를 등록해야함
  constructor(
    private readonly catsRepository: CatsRepository,
    private jwtService: JwtService,
  ) {}

  async jwtLogin(data: LoginRequestDto) {
    const { email, password } = data;
    // email있는지 확인
    const cat = await this.catsRepository.findCatByEmail(email);

    if (!cat) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요');
    }

    // password 확인
    // bcrypt.compare(비교할 문자열, 암호화된 문자열) 는 Promise를 반환하기 때문에 await를 사용함
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      cat.password,
    );
    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요');
    }

    // 유효성 검사끝나면 토큰 생끝
    const payload = { email, sub: cat.id };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
