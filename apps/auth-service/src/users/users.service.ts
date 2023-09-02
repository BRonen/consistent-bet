import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt'
import { CreateUserDto } from './dto/create-user.dto';
import { RepositoriesService } from '../repositories/repositories.service';

@Injectable()
export class UsersService {
  constructor (
    private readonly repositories: RepositoriesService
  ) { }

  async create(createUserDto: CreateUserDto) {
    const hash = await bcrypt.hash(createUserDto.password, 2);

    const { id, name, email } = await this.repositories.user.create({
      ...createUserDto,
      password: hash,
    });

    return { id, name, email };
  }

  findAll() {
    return this.repositories.user.findAll();
  }
}
