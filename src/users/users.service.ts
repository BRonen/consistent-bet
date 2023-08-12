import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RepositoryService } from 'src/global/repositories/repository.service';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private repos: RepositoryService) {}

  async create(createUserDto: CreateUserDto) {
    const hash = await bcrypt.hash(createUserDto.password, 2);

    const [id, name, email] = this.repos.user.create({
      ...createUserDto,
      password: hash,
    });

    return { id, name, email };
  }

  findAll() {
    const users = this.repos.user.findAll();

    return users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, _updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
