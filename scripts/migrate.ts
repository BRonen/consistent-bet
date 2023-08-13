import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { BetableRepository } from '../libs/database/src/repositories/betable.repository';

import "dotenv/config";

const databaseClient = postgres(process.env.DB_CONNECTION_URI, { max: 1 });

const database = drizzle(databaseClient);

migrate(database, { migrationsFolder: './drizzle' })
.then(async () => {
    console.log('migrated successfully!');
    
    const repository = new BetableRepository(database);

    await repository.create({
        name: 'teste',
        price: 100,
    })
});