import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RolesDto } from '../dtos/roles.dto';
import { RolesService } from '../services/roles.service';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../../auth/guards/role.guard';
import { Roles } from '../utils/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Get('')
  // @UseGuards(RoleGuard)
  // @Roles('admin')
  // @UseGuards(AuthGuard('jwt'))
  async getAll() {
    return this.rolesService.getAll();
  }

  @Get(':id')
  @UseGuards(RoleGuard)
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('accessToken')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.getById(id);
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  @UseGuards(RoleGuard)
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('accessToken')
  async createUser(@Body() rolesDto: RolesDto) {
    return this.rolesService.createOne(rolesDto);
  }
}
