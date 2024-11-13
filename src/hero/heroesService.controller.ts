import { status } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { User } from 'src/entities/user.entity';
import { EntityManager } from 'typeorm';
import { Hero, HeroById } from './interfaces';

@Controller()
export class HeroesService {
  constructor(private manager: EntityManager) {}

  @GrpcMethod()
  async findOne({ id }: HeroById): Promise<Hero> {
    const hero = await this.manager
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.id = :id', { id })
      .getOne();

    if (!hero) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: `Hero with ID ${id} not found`,
      });
    }

    return hero;
  }
}
