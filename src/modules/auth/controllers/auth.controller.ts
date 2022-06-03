import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from '../../users/dtos/createUser.dto';
import { UsersService } from '../../users/services/users.service';
import { AuthService } from '../services/auth.service';
import { LoginUserDto } from '../../users/dtos/loginUser.dto';
import { RoleGuard } from '../guards/role.guard';
import { Roles } from '../../users/utils/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  @Post('create')
  @UsePipes(ValidationPipe)
  @UseGuards(RoleGuard)
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('accessToken')
  @ApiTags('users')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createOne(createUserDto);
  }

  @Post('login')
  @ApiTags('users')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.validateUser(loginUserDto);
  }

  @Post('refresh')
  @ApiTags('users')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.checkRefreshToken(refreshTokenDto);
  }
}
