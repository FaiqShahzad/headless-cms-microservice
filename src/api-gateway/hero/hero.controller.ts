import { Controller, Get, Param } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Hero } from 'src/hero/interfaces';
import { HeroService } from './hero.service';

@Controller('hero')
export class HeroController {
  constructor(private heroesService: HeroService) {}

  @Get(':id')
  findOne(@Param('id') id: string): Observable<Hero> {
    return this.heroesService.getHero({ id });
  }
}
