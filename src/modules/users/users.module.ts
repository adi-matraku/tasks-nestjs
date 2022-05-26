import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesController } from './controllers/roles.controller';
import { UsersController } from './controllers/users.controller';
import { RoleEntity } from './entities/role.entity';
import { UserEntity } from './entities/user.entity';
import { RolesService } from './services/roles.service';
import { UsersService } from './services/users.service';

@Module({
  controllers: [UsersController, RolesController],
  providers: [UsersService, RolesService],
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity])],
  exports: [UsersService],
})
export class UsersModule {}
