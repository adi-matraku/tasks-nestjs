import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/createUser.dto';
import { UserEntity } from '../entities/user.entity';
import { User } from '../models/User';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  ) {}

  async getAll(): Promise<User[]> {
    try {
      return this.usersRepository.find({ where: { isActive: true } });
    } catch (err) {
      throw err;
    }
  }

  async createOne(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = new UserEntity();
      user.username = createUserDto.username;
      user.email = createUserDto.email;
      user.firstName = createUserDto.firstName;
      user.lastName = createUserDto.lastName;
      user.password = createUserDto.password;
      user.createdAt = new Date();

      await this.usersRepository.save(user);
      return user as User;
    } catch (error) {
      throw error;
    }
  }
}
