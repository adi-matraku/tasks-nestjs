import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { LoginUserDto } from '../../users/dtos/loginUser.dto';
import { comparePasswords } from '../utils/bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { Repository } from 'typeorm';
import { RefreshTokenEntity } from '../entities/refresh-token.entity';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { DeleteRefreshTokenDto } from '../dtos/delete-refresh-token.dto';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    @InjectRepository(RefreshTokenEntity)
    private readonly refreshTokenRepository: Repository<RefreshTokenEntity>,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  ) {}

  async validateUser(loginUserDto: LoginUserDto) {
    // console.log('inside validateUserService');
    const user = await this.usersService.findUserByEmail(loginUserDto.email);
    console.log(user);
    if (user) {
      const matched = comparePasswords(loginUserDto.password, user.password);
      console.log(matched);
      if (matched) {
        console.log(user);
        const { id } = user;
        const payload = { id };
        console.log('payload', payload);
        const accessToken = this.jwtService.sign(payload, {
          expiresIn: 3600000,
        });
        const refreshToken = await this.hashData(user.username);
        const tokenDb = new RefreshTokenEntity();
        tokenDb.refresh_token = refreshToken;
        await this.refreshTokenRepository.save(tokenDb);

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

  async checkRefreshToken(refreshTokenDto: RefreshTokenDto) {
    try {
      const { refreshToken } = refreshTokenDto;
      console.log(refreshToken);
      const decodedData = this.jwtService.decode(refreshTokenDto.accessToken);
      const id = decodedData['id'];
      const payload = { id };

      const token = await this.refreshTokenRepository.findOne({
        refresh_token: refreshToken,
      });

      const user = await this.usersRepository.findOne({
        where: {
          id: id,
        },
      });

      if (token) {
        const newAccessToken = this.jwtService.sign(payload, {
          expiresIn: 3600000,
        });
        const refreshToken = await this.hashData(user.username);
        const tokenDb = new RefreshTokenEntity();
        tokenDb.refresh_token = refreshToken;
        await this.refreshTokenRepository.save(tokenDb);

        return { newAccessToken, refreshToken };
      } else {
        throw new UnauthorizedException();
      }
    } catch (err) {
      throw err;
    }
  }

  async logout(refreshTokenDto: DeleteRefreshTokenDto) {
    try {
      const refreshToken = await this.refreshTokenRepository.findOne({
        where: { refresh_token: refreshTokenDto.refreshToken },
      });

      console.log(refreshToken);
      if (refreshToken) {
        await this.refreshTokenRepository.delete(refreshToken.id);
      } else {
        throw new UnauthorizedException();
      }
    } catch (err) {
      throw err;
    }
  }

  getUser(req: Request) {
    console.log(req);
    return req.user;
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }
}
