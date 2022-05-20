import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { databaseProviders } from './providers/database.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { TasksModule } from './modules/tasks/tasks.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      synchronize: true,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Bewzing4321',
      database: 'tasks_db',
      autoLoadEntities: true,
    }),
    TasksModule,
  ],
  controllers: [],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class AppModule {}
