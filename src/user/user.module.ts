import { Module } from '@nestjs/common';
import { UserService } from './user.controller';

@Module({
  controllers: [UserService],
})
export class UserModule {}
