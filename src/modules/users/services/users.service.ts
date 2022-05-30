import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from 'src/modules/tasks/utils/not-found.exception';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/createUser.dto';
import { RoleEntity } from '../entities/role.entity';
import { UserEntity } from '../entities/user.entity';
import { User } from '../models/User';
import * as bcrypt from 'bcrypt';
import { ConflictException } from '../../auth/exceptions/Conflict.exception';

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
      return this.usersRepository.find({
        where: { isActive: true },
        relations: ['role'],
        select: [
          'username',
          'email',
          'createdAt',
          'lastName',
          'firstName',
          'lastUpdatedAt',
          'id',
        ],
      });
    } catch (err) {
      throw err;
    }
  }

  async getById(id: number): Promise<User> {
    try {
      const user = await this.usersRepository.findOne({
        where: { id: id, isActive: true },
        select: [
          'username',
          'email',
          'createdAt',
          'lastName',
          'firstName',
          'lastUpdatedAt',
          'id',
        ],
      });
      if (!user) {
        throw new NotFoundException('User not Found.');
      }
      return user;
    } catch (err) {
      throw err;
    }
  }

  async createOne(createUserDto: CreateUserDto): Promise<User> {
    try {
      await this.checkAuthentication(createUserDto);
      const roleId = await this.checkRole(createUserDto);
      console.log(createUserDto);
      const salt = await bcrypt.genSalt();
      const hashedPassword = await this.hashPassword(
        createUserDto.password,
        salt
      );
      const user = new UserEntity();
      user.username = createUserDto.username.toLowerCase();
      user.email = createUserDto.email.toLowerCase();
      user.firstName = createUserDto.firstName;
      user.lastName = createUserDto.lastName;
      user.password = hashedPassword;
      user.role = roleId;
      user.salt = salt;
      user.lastUpdatedAt = user.createdAt = new Date();

      await this.usersRepository.save(user);
      return new User({ ...user, password: undefined, salt: undefined });
    } catch (error) {
      throw error;
    }
  }

  ////// FUNCTIONS //////

  async findUserByEmail(email: string) {
    return this.usersRepository.findOne(
      { email },
      {
        select: [
          'username',
          'lastUpdatedAt',
          'password',
          'salt',
          'id',
          'email',
          'isActive',
          'firstName',
          'lastName',
          'createdAt',
        ],
      }
    );
  }

  async checkRole(userDto: CreateUserDto): Promise<RoleEntity> {
    const roleId = await this.rolesRepository.findOne({
      where: { id: userDto.role },
    });
    if (!roleId) {
      throw new NotFoundException('Role ID Not Found.');
    }
    return roleId;
  }

  async checkAuthentication(userDto: CreateUserDto): Promise<void> {
    const emailUsed = await this.usersRepository.findOne({
      where: { email: userDto.email, isActive: true },
    });
    const usernameUsed = await this.usersRepository.findOne({
      where: { username: userDto.username, isActive: true },
    });
    if (emailUsed) {
      throw new ConflictException();
    } else if (usernameUsed) {
      throw new ConflictException('Username already exists');
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
