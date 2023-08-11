import { InferModel } from 'drizzle-orm';
import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { users } from 'src/schema';
import { DB, DbType } from 'src/global/providers/database.provider';

@Injectable()
export class UsersService {
  constructor(@Inject(DB) private readonly database: DbType) {}
  create(createUserDto: CreateUserDto) {
    const query = this.database
      .insert(users)
      .values({ name: 'wasd', email: 'wasdwasdwasd' } as InferModel<
        typeof users,
        'insert'
      >)
      .returning();

    const [user] = query.values();

    return user;
  }

  findAll() {
    return this.database.select().from(users).all();
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
