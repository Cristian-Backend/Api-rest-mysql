import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { User } from '../users/entities/user.entity';
import { Profile } from './entities/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile])],
  providers: [ProfileService],
  controllers: [ProfileController],
  exports: [ProfileService], // Exporta ProfileService para que pueda ser utilizado en otros módulos
})
export class ProfileModule {}