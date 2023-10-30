import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

import { CreateAuthDto } from './dto/create-auth.dto';
import { RepositoriesService } from '../repositories/repositories.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly repositories: RepositoriesService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: CreateAuthDto) {
    const { id, name, hash } = await this.repositories.user.getUserHashByEmail(
      email,
    );

    const isAuthenticated = await bcrypt.compare(password, hash);

    if (!isAuthenticated) throw new UnauthorizedException();

    const payload = { id, name, email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
