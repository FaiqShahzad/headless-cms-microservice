import { status } from '@grpc/grpc-js';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { Users } from 'src/entities/user.entity';
import { Message } from 'src/interfaces/common.interface';
import {
  CreateUser,
  LoginUser,
  UpdateUser,
  User,
  UserById,
} from 'src/interfaces/user.interface';
import { EntityManager } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private manager: EntityManager) {}

  async login({ email, password }: LoginUser): Promise<User> {
    const user = await this.manager
      .createQueryBuilder()
      .select('user')
      .from(Users, 'user')
      .where('user.email = :email', { email })
      .getOne();

    if (!user || !(await bcrypt.compare(password, user.password)))
      throw new RpcException({
        code: status.UNAUTHENTICATED,
        message: `Invalid email/password`,
      });

    return user;
  }

  async findAll(): Promise<Record<string, User[]>> {
    const users = await this.manager
      .createQueryBuilder()
      .select('user')
      .from(Users, 'user')
      .orderBy('id')
      .getMany();

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
        message: `User with ID ${id} not found`,
      });
    }

    return user;
  }

  async createUser(user: CreateUser): Promise<User> {
    const createdUser = await Users.create(user as Users);

    await createdUser.save();

    return createdUser;
  }

  async updateUser(user: UpdateUser): Promise<User> {
    const existingUser = await Users.findOneBy({
      id: user.id,
    });

    if (!existingUser) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: `User with ID ${user.id} not found`,
      });
    }

    _.merge(existingUser, _.omit(user, ['id', 'password']));

    if (
      user.password &&
      !(await bcrypt.compare(user.password, existingUser.password))
    )
      existingUser.password = await bcrypt.hash(user.password, 10);

    await existingUser.save();

    return existingUser;
  }

  async deleteUser({ id }: UserById): Promise<Message> {
    const user = await Users.findOneBy({
      id,
    });

    if (!user) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: `User with ID ${id} not found`,
      });
    }

    await user.remove();

    return { message: `User with ID ${id} deleted successfully` };
  }
}
