import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Message } from 'src/interfaces/common.interface';
import {
  CreateUser,
  LoginUser,
  UpdateUser,
  User,
  UserById,
} from 'src/interfaces/user.interface';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @GrpcMethod('UserService')
  async login(loginData: LoginUser): Promise<User> {
    return this.userService.login(loginData);
  }

  @GrpcMethod('UserService')
  async findAll(): Promise<Record<string, User[]>> {
    return this.userService.findAll();
  }

  @GrpcMethod('UserService')
  async findOne({ id }: UserById): Promise<User> {
    return this.userService.findOne({ id });
  }

  @GrpcMethod('UserService')
  async createUser(user: CreateUser): Promise<User> {
    return this.userService.createUser(user);
  }

  @GrpcMethod('UserService')
  async updateUser(user: UpdateUser): Promise<User> {
    return this.userService.updateUser(user);
  }

  @GrpcMethod('UserService')
  async deleteUser({ id }: UserById): Promise<Message> {
    return this.userService.deleteUser({ id });
  }
}
