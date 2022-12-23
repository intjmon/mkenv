import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { UsersModule } from './users/users.module';
import { CatsService } from './cats/cats.service';

@Module({
  imports: [CatsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, CatsService], // 의전성을 주입하기 위한 프로바이더
})
export class AppModule {}
