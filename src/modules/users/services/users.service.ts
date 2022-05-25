import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/createUser.dto';

@Injectable()
export class UsersService {
  private users: CreateUserDto[] = [];

  getAllUsers() {
    return this.users;
  }

  registerUser(createUserDto: CreateUserDto) {
    this.users.push(createUserDto);
  }
}
