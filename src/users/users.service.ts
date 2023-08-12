import { InferModel } from 'drizzle-orm';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RepositoryService } from 'src/global/repositories/repository.service';

@Injectable()
export class UsersService {
  constructor(private repos: RepositoryService) {}
  
  create(createUserDto: CreateUserDto) {
    const [id, name, email] = this.repos.user.create(createUserDto);
    return { id, name, email };
  }

  findAll() {
    const users = this.repos.user.findAll();
    return users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
