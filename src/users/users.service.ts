import Database from 'better-sqlite3';
import { drizzle, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { InferModel } from 'drizzle-orm';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { users } from 'src/schema';

const sqlite = new Database('./sqlite.db');
const db: BetterSQLite3Database = drizzle(sqlite, { logger: true });

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    const query = db
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
    return db.select().from(users).all();
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
