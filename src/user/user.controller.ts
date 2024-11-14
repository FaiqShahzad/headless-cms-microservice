import { status } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import * as _ from 'lodash';
import { Users } from 'src/entities/user.entity';
import { Message } from 'src/interfaces/common.interface';
import { CreateUser, User, UserById } from 'src/interfaces/user.interface';
import { EntityManager } from 'typeorm';

@Controller()
export class UserService {
  constructor(private manager: EntityManager) {}

  @GrpcMethod()
  async findAll(): Promise<Record<string, User[]>> {
    const users = await this.manager
      .createQueryBuilder()
      .select('user')
      .from(Users, 'user')
      .getMany();

    if (_.isEmpty(users)) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'No users found',
      });
    }

    return { users };
  }

  @GrpcMethod()
  async findOne({ id }: UserById): Promise<User> {
    const user = await this.manager
      .createQueryBuilder()
      .select('user')
      .from(Users, 'user')
      .where('user.id = :id', { id })
      .getOne();

    if (!user) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'User not found',
      });
    }

    return user;
  }

  @GrpcMethod()
  async createUser(user: CreateUser): Promise<User> {
    const createdUser = await this.manager
      .createQueryBuilder()
      .insert()
      .into(Users)
      .values(user)
      .execute();

    return _.merge(_.first(_.get(createdUser, 'raw')), user) as User;
  }

  @GrpcMethod()
  async updateUser(userData: User): Promise<User> {
    const user = await Users.findOneBy({
      id: userData.id,
    });

    if (!user) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'User not found',
      });
    }

    _.forEach(_.omit(userData, ['id']), (val, key) => _.set(user, key, val));

    await user.save();

    return user;
  }

  @GrpcMethod()
  async deleteUser({ id }: UserById): Promise<Message> {
    const user = await Users.findOneBy({
      id,
    });

    if (!user) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'User not found',
      });
    }

    await user.remove();

    return { message: `User with ID ${id} deleted successfully` };
  }
}
