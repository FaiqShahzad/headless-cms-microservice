import { Module } from '@nestjs/common';
import { HeroesService } from './heroesService.controller';

@Module({
  controllers: [HeroesService],
})
export class HeroesServiceModule {}
