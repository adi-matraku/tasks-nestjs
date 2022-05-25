import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RolesDto } from '../dtos/roles.dto';
import { RolesService } from '../services/roles.service';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Get('')
  async getAll() {
    return this.rolesService.getAll();
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.getById(id);
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  async createUser(@Body() rolesDto: RolesDto) {
    return this.rolesService.createOne(rolesDto);
  }
}
