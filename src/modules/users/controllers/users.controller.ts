import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('')
  async getAll(@Query('username') username: string) {
    console.log(username);
    return this.usersService.getAll();
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getById(id);
  }
}
