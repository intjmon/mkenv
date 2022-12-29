import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Payload } from './jwt.payload';
import { CatsRepository } from 'src/cats/cats.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly catsRepository: CatsRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret', // 인증할 때 사용하는 키
    });
  }
  // FE에서 받은 토큰을 검증하는 함수
  async validate(payload: Payload) {
    const cat = await this.catsRepository.findCatByIdWithoutPassword(
      payload.sub, // auth.service.ts에 jwtLogin의 payload.sub와 같음
    );

    if (cat) {
      return cat;
    } else {
      throw new UnauthorizedException('접근오류');
    }
  }
}
