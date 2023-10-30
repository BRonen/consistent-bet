import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import path from 'path';

import { LedgerEnviroment } from '../../apps/ledger-service/src/ledger-environment';

import "dotenv/config";

const { env } = new LedgerEnviroment()

const databaseClient = postgres(env.LEDGER_DATABASE_URI, { max: 1 });

const database = drizzle(databaseClient);

migrate(database, { migrationsFolder: path.join(__dirname, '../../migrations/ledger-service') });
