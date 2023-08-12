import { Inject } from "@nestjs/common";
import { InferModel } from "drizzle-orm";
import { usersSchema } from "src/schema";
import { DB, DbType } from "../database.provider";
import { CreateUserDto } from "src/users/dto/create-user.dto";

export class UserRepository {
    constructor(@Inject(DB) private readonly database: DbType) { }

    create(createUserDto: InferModel<
        typeof usersSchema,
        'insert'
    >) {
        const query = this.database
            .insert(usersSchema)
            .values(createUserDto)
            .returning();

        const [user] = query.values();

        return user;
    }

    findAll() {
        const users = this.database.select().from(usersSchema).all();

        return users;
    }
}