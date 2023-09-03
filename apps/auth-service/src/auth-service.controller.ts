import { Controller, Get, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';


interface HeroService {
  findOne(data: { id: number }): Observable<any>;
}

@Injectable()
export class AuthServiceService implements OnModuleInit {
  public heroesService: HeroService;

  constructor(@Inject('HERO_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    console.log(this.client.getService<HeroService>('hero'))
    this.heroesService = this.client.getService<HeroService>('hero');
  }

  getHero(): any {
    return this.heroesService.findOne({ id: 1 });
  }
}

@Controller()
export class AuthServiceController {
  constructor (
    private authServiceService: AuthServiceService
  ) {}

  @Get('/aaa')
  test() {
    return(this.authServiceService.getHero());
  }

  @Get('/healthz')
  healthcheck() {
    return 'running';
  }
}
