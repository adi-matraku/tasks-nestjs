import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from '../../dtos/RegisterUser.dto';

@Injectable()
export class UsersService {
  private users: RegisterUserDto[] = [];

  getAllUsers() {
    return this.users;
  }

  registerUser(registerUserDto: RegisterUserDto) {
    this.users.push(registerUserDto);
  }
}
