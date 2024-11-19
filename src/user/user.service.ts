import { status } from '@grpc/grpc-js';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { Users } from 'src/entities/user.entity';
import { Message } from 'src/interfaces/common.interface';
import {
  CreateUser,
  UpdateUser,
  User,
  UserById,
} from 'src/interfaces/user.interface';
import { EntityManager } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private manager: EntityManager) {}

  async findAll(): Promise<Record<string, User[]>> {
    const users = await this.manager
      .createQueryBuilder()
      .select('user')
      .from(Users, 'user')
      .orderBy('id')
      .getMany();

    if (_.isEmpty(users)) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'No users found',
      });
    }

    return { users };
  }

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

  async createUser(user: CreateUser): Promise<User> {
    const createdUser = await Users.create(user as Users);

    await createdUser.save();

    return createdUser;
  }

  async updateUser(userData: UpdateUser): Promise<User> {
    const user = await Users.findOneBy({
      id: userData.id,
    });

    if (!user) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'User not found',
      });
    }

    _.merge(user, _.omit(userData, ['id', 'password']));

    if (
      userData.password &&
      !bcrypt.compareSync(userData.password, user.password)
    )
      user.password = bcrypt.hashSync(userData.password, 10);

    await user.save();

    return user;
  }

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
