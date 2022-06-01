import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UnauthorizedException } from '@nestjs/common';
import { JwtPayloadInterface, User } from '../models/jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { Repository } from 'typeorm';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWTSECRET || 'Secretsecret',
    });
  }

  async validate(payload: JwtPayloadInterface): Promise<User> {
    const { id } = payload;
    const user = await this.usersRepository.findOne({
      where: { id: id, isActive: true },
    });
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
