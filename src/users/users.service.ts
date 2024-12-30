import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, username } = createUserDto;

    // Validación a base de datos, email y username
    const userByEmail = await this.usersRepository.findOne({ where: { email } });
    const userByUsername = await this.usersRepository.findOne({ where: { username } });

    if (userByEmail) { // si existe el email
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);
    }

    if (userByUsername) { // si existe el username
      throw new HttpException('Username already exists', HttpStatus.CONFLICT);

    }


    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async getUserId(id: number) {
    // Traemos por id
    const userFound = await this.usersRepository.findOne({ where: { id } });
    // Si no existe...
    if (!userFound ) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // Si existe
    return userFound;
  }

 // ACTUALIZAR
 async update(id: number, updateUserDto: UpdateUserDto) {
  // Traemos por id
  const userFound = await this.usersRepository.findOne({ where: { id } });

  // Si no existe...
  if (!userFound) {
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  // Si existe, actualizamos los datos del usuario con los nuevos datos proporcionados en updateUserDto.
  await this.usersRepository.update(id, updateUserDto);

  // Devolvemos el usuario actualizado
  const updatedUser = await this.usersRepository.findOne({ where: { id } });
  return updatedUser;
}


  // ELIMINAR
  async remove(id: number) {

    // traemos primero el id
    const userFound = await this.usersRepository.findOne({ where: { id } });

    // si no existe...
    if (!userFound) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // si existe, lo eliminamos
    await this.usersRepository.delete(id);
    return `User with ID ${id} has been deleted`;
  }
}
