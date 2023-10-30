import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import path from 'path';

import { AuthEnviroment } from '../../apps/auth-service/src/auth-environment';

import "dotenv/config";

const { env } = new AuthEnviroment()

const databaseClient = postgres(env.AUTH_DATABASE_URI, { max: 1 });

const database = drizzle(databaseClient);

migrate(database, { migrationsFolder: path.join(__dirname, '../../migrations/auth-service') });
