import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc, ClientRMQ } from '@nestjs/microservices';
import bcrypt from 'bcrypt';

import { RepositoriesService } from '../repositories/repositories.service';
import { CreateUserDto } from './dto/create-user.dto';

import { LEDGER_PACKAGE, LedgerService } from '../ledger.client';
import { Cron, CronExpression } from '@nestjs/schedule';
import { QUEUE_SERVICE } from '../queue.client';

@Injectable()
export class UsersService {
  public ledgerService: LedgerService;

  constructor(
    private readonly repositories: RepositoriesService,
    @Inject(LEDGER_PACKAGE) private LedgerClient: ClientGrpc,
    @Inject(QUEUE_SERVICE) private QueueService: ClientRMQ,
  ) {}

  onModuleInit() {
    this.ledgerService = this.LedgerClient.getService<LedgerService>('LedgerService');
  }

  async create(createUserDto: CreateUserDto) {
    const hash = await bcrypt.hash(createUserDto.password, 2);

    const { id, name, email } = await this.repositories.user.create({
      ...createUserDto,
      password: hash,
    });

    return { id, name, email };
  }

  async findAll() {
    const users = await this.repositories.user.findAll();
    
    return Promise.all(users.map(async user => {
      const findLedgerByUserId = new Promise((resolve) => {
        this.ledgerService.findOne({id: user.id}).subscribe(resolve);
      })

      return {
        ...user,
        ledger: await findLedgerByUserId,
      };
    }));
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async outboxProcessing() {
    const events = await this.repositories.outboxEvents.findNotProcessed();

    for(const event of events) {
      this.QueueService.emit(event.event_name, event).subscribe(
        () => this.repositories.outboxEvents.markAsProcessed(event.id)
      );
    }
  }
}
