import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { LoginUserDto } from '../../users/dtos/loginUser.dto';
import { comparePasswords } from '../utils/bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConflictException } from '../exceptions/Conflict.exception';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  async validateUser(loginUserDto: LoginUserDto) {
    console.log('inside validateUserService');
    const user = await this.usersService.findUserByEmail(loginUserDto.email);
    if (user) {
      const matched = comparePasswords(loginUserDto.password, user.password);
      if (matched) {
        console.log('User Validation Success!');
        console.log(user);
        const payload = { user };
        const accessToken = this.jwtService.sign(payload);
        return { accessToken };
      } else {
        throw new HttpException(
          'User Credentials are wrong.',
          HttpStatus.BAD_REQUEST
        );
      }
    } else {
      throw new HttpException('User does not exist.', HttpStatus.BAD_REQUEST);
    }
  }
}
