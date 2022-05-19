import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RegisterUserDto } from '../../dtos/registerUser.dto';
import { UsersService } from '../../services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Post('signup')
  @UsePipes(ValidationPipe)
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    this.usersService.registerUser(registerUserDto);
  }
}
