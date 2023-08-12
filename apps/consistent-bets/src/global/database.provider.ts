import { FactoryProvider, Logger } from '@nestjs/common';
import { drizzle, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { DefaultLogger, LogWriter } from 'drizzle-orm';
import Database from 'better-sqlite3';

export const DB = Symbol('DB_SERVICE');
export type DbType = BetterSQLite3Database<Record<string, never>>;

export const DatabaseProvider: FactoryProvider = {
  provide: DB,
  inject: [],
  useFactory: () => {
    const logger = new Logger('DB');

    const connection = new Database('./sqlite.db');

    logger.debug('Connected to database!');

    class CustomDbLogWriter implements LogWriter {
      write(message: string) {
        logger.verbose(message);
      }
    }

    return drizzle(connection, {
      logger: new DefaultLogger({ writer: new CustomDbLogWriter() }),
    });
  },
};
