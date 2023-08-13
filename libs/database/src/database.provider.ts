import { FactoryProvider, Logger } from '@nestjs/common';
import { PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js';
import { DefaultLogger, LogWriter } from 'drizzle-orm';
import postgres from 'postgres';

export const DB = Symbol('DB_SERVICE');
export type DbType = PostgresJsDatabase<Record<string, never>>;

export const DatabaseProvider: FactoryProvider = {
  provide: DB,
  inject: [],
  useFactory: () => {
    const logger = new Logger('DB');
    
    const connectionUri = process.env.DB_CONNECTION_URI

    if(!connectionUri) throw new Error("Invalid database connection uri")
    
    const databaseClient = postgres(connectionUri, { max: 1 });
    
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
