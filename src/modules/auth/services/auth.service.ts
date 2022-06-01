import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { LoginUserDto } from '../../users/dtos/loginUser.dto';
import { comparePasswords } from '../utils/bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  async validateUser(loginUserDto: LoginUserDto) {
    console.log('inside validateUserService');
    const user = await this.usersService.findUserByEmail(loginUserDto.email);
    console.log(user);
    if (user) {
      const matched = comparePasswords(loginUserDto.password, user.password);
      console.log(matched);
      if (matched) {
        console.log('User Validation Success! Inside Auth Service');
        console.log(user);
        const { id } = user;
        const payload = { id };
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = await this.generateToken();

        return { accessToken, refreshToken };
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

  generateToken = (): Promise<string> =>
    new Promise(resolve =>
      randomBytes(48, (err, buffer) => resolve(buffer.toString('hex')))
    );
}
