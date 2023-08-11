import { Global, Module } from '@nestjs/common';
import { DB, DatabaseProvider } from './providers/database.provider';

@Global()
@Module({
    providers: [DatabaseProvider],
    exports: [DB],
})
export class GlobalModule {}
