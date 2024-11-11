import { status } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { Hero, HeroById } from './interfaces';

@Controller()
export class HeroesService {
  private readonly items: Hero[] = [
    { id: 1, name: 'Faiq' },
    { id: 2, name: 'Ali' },
  ];

  @GrpcMethod()
  findOne({ id }: HeroById): Hero {
    const hero = this.items.find((hero) => hero.id === id);
    if (!hero) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: `Hero with ID ${id} not found`,
      });
    }
    return hero;
  }
}
