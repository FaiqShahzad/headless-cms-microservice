import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeroesServiceModule } from './hero/heroesService.module';

@Module({
  imports: [HeroesServiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
