import { Injectable } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { RepositoriesService } from '../repositories/repositories.service';

@Injectable()
export class LedgerService {
    constructor(private readonly repositories: RepositoriesService) { }

}
