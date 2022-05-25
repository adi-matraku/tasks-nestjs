import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from 'src/modules/tasks/utils/not-found.exception';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/createUser.dto';
import { RoleEntity } from '../entities/role.entity';
import { UserEntity } from '../entities/user.entity';
import { User } from '../models/User';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly rolesRepository: Repository<RoleEntity>
  ) {}

  async getAll(): Promise<User[]> {
    try {
      return this.usersRepository.find({ where: { isActive: true } });
    } catch (err) {
      throw err;
    }
  }

  async getById(id: number): Promise<User> {
    try {
      const user = await this.usersRepository.findOne({
        where: { id: id, isActive: true },
      });
      if (!user) {
        throw new NotFoundException('User not Found.');
      }
      return user as User;
    } catch (err) {
      throw err;
    }
  }

  async createOne(createUserDto: CreateUserDto): Promise<User> {
    try {
      const roleId = await this.rolesRepository.findOne({
        where: { id: createUserDto.role },
      });
      if (!roleId) {
        throw new NotFoundException('Role ID Not Found.');
      }
      const user = new UserEntity();
      user.username = createUserDto.username;
      user.email = createUserDto.email;
      user.firstName = createUserDto.firstName;
      user.lastName = createUserDto.lastName;
      user.password = createUserDto.password;
      user.role = roleId;

      user.createdAt = new Date();

      await this.usersRepository.save(user);
      return user as User;
    } catch (error) {
      throw error;
    }
  }
}
