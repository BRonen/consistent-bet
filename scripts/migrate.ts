import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { PurchasableRepository } from '../libs/database/src/repositories/purchasable.repository';

import "dotenv/config";

const databaseClient = postgres(process.env.DB_CONNECTION_URI, { max: 1 });

const database = drizzle(databaseClient);

migrate(database, { migrationsFolder: './drizzle' })
.then(async () => {
    console.log('migrated successfully!');
    
    const repository = new PurchasableRepository(database);

    await repository.create({
        name: 'teste',
        price: 100,
    })
});