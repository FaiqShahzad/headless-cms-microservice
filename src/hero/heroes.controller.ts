import { Controller, Get, Inject, OnModuleInit, Param } from '@nestjs/common';
import { ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { Hero, HeroById, HeroesService } from './interfaces';

@Controller('hero')
export class HeroController implements OnModuleInit {
  private heroesService: HeroesService;

  constructor(@Inject('HERO_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.heroesService = this.client.getService<HeroesService>('HeroesService');
  }

  @GrpcMethod('HeroesService', 'FindOne')
  findOne(data: HeroById): Hero | null {
    const items = [
      { id: 1, name: 'Faiq' },
      { id: 2, name: 'Ali' },
    ];
    return items.find(({ id }) => id === data.id) || null;
  }

  @Get(':id')
  getHero(@Param('id') id: string): Hero | null {
    return this.heroesService.findOne({ id: Number(id) });
  }
}
