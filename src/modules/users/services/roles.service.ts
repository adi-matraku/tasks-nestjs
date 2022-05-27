import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolesDto } from '../dtos/roles.dto';
import { RoleEntity } from '../entities/role.entity';
import { Role } from '../models/Role';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly rolesRepository: Repository<RoleEntity>
  ) {}

  async getAll(): Promise<Role[]> {
    try {
      return this.rolesRepository.find();
    } catch (err) {
      throw err;
    }
  }

  async getById(id: number): Promise<Role> {
    try {
      const role = await this.rolesRepository.findOne({
        where: { id: id },
      });
      if (!role) {
        throw new NotFoundException('Role ID not Found.');
      }
      return role as Role;
    } catch (err) {
      throw err;
    }
  }

  async createOne(roleDto: RolesDto): Promise<Role> {
    try {
      const roleExists = await this.rolesRepository.findOne({
        name: roleDto.name,
      });
      if (roleExists) {
        throw new HttpException('Role already exists', HttpStatus.BAD_REQUEST);
      } else {
        const role = await this.rolesRepository.save(roleDto);
        return role as unknown as Role;
      }
    } catch (error) {
      throw error;
    }
  }
}
