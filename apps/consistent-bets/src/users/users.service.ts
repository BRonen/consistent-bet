import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RepositoryService } from '@consistent-bets/database/repositories/repository.service';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private repos: RepositoryService) {}

  async create(createUserDto: CreateUserDto) {
    const hash = await bcrypt.hash(createUserDto.password, 2);

    const { id, name, email, balance } = await this.repos.user.create({
      ...createUserDto,
      password: hash,
    });

    return { id, name, email, balance };
  }

  findAll() {
    const users = this.repos.user.findAll();

    return users;
  }

  findById(id: number) {
    return this.repos.user.findById(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const hash = updateUserDto.password
      ? await bcrypt.hash(updateUserDto.password, 2)
      : undefined;

    const user = this.repos.user.updateById(id, {
      ...updateUserDto,
      password: hash,
    });

    return user;
  }
}
