import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    private readonly usersService: UsersService,
  ) {}

  async createPost(createPostDto: CreatePostDto) {
    // buscamos del userservice el author del post
    const userFound = await this.usersService.getUserId(createPostDto.authorId);

    if (!userFound) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // crear la publicacion
    const newPost = this.postRepository.create(createPostDto);
    return this.postRepository.save(newPost);
  }

  getPost() {
    return this.postRepository.find({
      relations: ['author'], // traer el autor de la publicacion
    });
  }
}