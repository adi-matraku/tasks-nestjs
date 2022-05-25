import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/createUser.dto';

@Injectable()
export class UsersService {
  private users: createUserDto[] = [];

  getAllUsers() {
    return this.users;
  }

  registerUser(createUserDto: CreateUserDto) {
    this.users.push(createUserDto);
  }
}
