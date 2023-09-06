import { ClientProviderOptions, Transport } from "@nestjs/microservices";
import path from "path";

import { AuthEnviroment } from "./auth-environment"
import { Observable } from "rxjs";


export interface LedgerService {
    findOne(data: { id: number }): Observable<{ id: number, balance: number }>;
}

export const LEDGER_PACKAGE = Symbol('LEDGER_PACKAGE');

export const getLedgerClient = (): ClientProviderOptions => {
    const { env } = new AuthEnviroment();

    return {
      name: LEDGER_PACKAGE,
      transport: Transport.GRPC,
      options: {
        url: env.LEDGER_SERVICE_URI,
        package: 'ledger',
        protoPath: path.join(__dirname, '../ledger-service/ledger/ledger.proto'),
      },
    };
}