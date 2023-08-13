import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

import "dotenv/config";

const databaseClient = postgres(process.env.DB_CONNECTION_URI, { max: 1 });

migrate(drizzle(databaseClient), { migrationsFolder: './drizzle' }).then(
    () => console.log('migrated successfully!')
);