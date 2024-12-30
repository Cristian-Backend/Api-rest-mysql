import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  ProfileModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // Exporta UsersService para que pueda ser utilizado en otros módulos
})
export class UsersModule {}