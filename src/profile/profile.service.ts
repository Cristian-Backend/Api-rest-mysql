import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

   @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  create(createProfileDto: CreateProfileDto) {
    return 'This action adds a new profile';
  }

   async createProfile(id: number, profile: CreateProfileDto) {

    // traemos por id
    const userFound =  await this.userRepository.findOne({
      where: { id },

    })
    if (!userFound) { // si no se encontro 
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    // si se encontro creamos el perfil
    const newProfile = this.profileRepository.create(profile);

    // guardamos el perfil
    const savedProfile = await this.profileRepository.save(newProfile);

    // y lo añadimos al usuario
    userFound.profile = savedProfile;

    // guardamos el usuario
    return this.userRepository.save(userFound)
;

  }

  findAll() {
    return `This action returns all profile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
