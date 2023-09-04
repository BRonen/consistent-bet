import { Controller, Get, Inject } from '@nestjs/common';
import { ClientGrpc, ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface HeroService {
  findOne(data: { id: number }): Observable<any>;
}

@Controller()
export class AuthServiceController {
  public heroesService: HeroService;
  public catsService: ClientProxy;

  constructor(
    @Inject('HERO_PACKAGE') private client: ClientGrpc,
    @Inject('MATH_SERVICE') private queue: ClientProxy,
  ) {}

  onModuleInit() {
    this.heroesService = this.client.getService<HeroService>('hero');
    // this.queue.consumeChannel({ cmd: 'notifications' }).then()
  }

  @Get('/aaa')
  test() {
    const a = this.queue.send('notifications', { text: 'wasdwasdwasdwasd' }); // .subscribe((...args) => console.log('waasd', ...args));
    return a; // this.heroesService.findOne({ id: 1 });
  }

  @Get('/healthz')
  healthcheck() {
    return 'running';
  }
}
