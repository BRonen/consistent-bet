import { Module } from '@nestjs/common';
import { DatabaseModule } from '@consistent-bets/database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentsModule } from './payments/payments.module';
import { PurchasablesModule } from './purchasables/purchasables.module';
import { PurchasesModule } from './purchases/purchases.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    PaymentsModule,
    PurchasablesModule,
    PurchasesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
