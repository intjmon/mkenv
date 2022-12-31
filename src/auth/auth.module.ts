import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { CatsModule } from 'src/cats/cats.module';

@Module({
  imports: [
    // 여기서는 세션 쿠키를 사용하지 않으므로 session을 false로 함
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: process.env.JWT_SECRET, // jwt는 만들때 사용
      signOptions: { expiresIn: '1y' },
    }),
    // forwardRef를 사용해서 순환 종속성을 해결-> CatsModule에서 AuthModule을 사용할 수 있음
    forwardRef(() => CatsModule),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
