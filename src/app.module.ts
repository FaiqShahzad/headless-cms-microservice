import { Module } from '@nestjs/common';
import { HeroModule } from './api-gateway/hero/hero.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeroesServiceModule } from './hero/heroesService.module';

@Module({
  imports: [HeroModule, HeroesServiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
