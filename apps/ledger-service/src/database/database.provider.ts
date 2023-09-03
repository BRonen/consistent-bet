import { FactoryProvider, Logger } from '@nestjs/common';
import { PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js';
import { DefaultLogger, LogWriter } from 'drizzle-orm';
import postgres from 'postgres';

import { LedgerEnviroment } from '../ledger-environment';

export const DB = Symbol('DATABASE_SERVICE');
export type DbType = PostgresJsDatabase<Record<string, never>>;

export const DatabaseProvider: FactoryProvider = {
  provide: DB,
  inject: [],
  useFactory: () => {
    const logger = new Logger('Database');
    const { env } = new LedgerEnviroment();

    const databaseClient = postgres(env.LEDGER_DATABASE_URI, { max: 1 });

    logger.debug('Connected to database!');

    class CustomDbLogWriter implements LogWriter {
      write(message: string) {
        logger.verbose(message);
      }
    }

    return drizzle(databaseClient, {
      logger: new DefaultLogger({ writer: new CustomDbLogWriter() }),
    });
  },
};
