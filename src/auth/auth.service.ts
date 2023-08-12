import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RepositoryService } from 'src/global/repositories/repository.service';
import bcrypt from 'bcrypt';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private repos: RepositoryService,
    private jwtService: JwtService,
  ) {}

  async signIn({ email, password }: CreateAuthDto) {
    const { id, name, hash } = this.repos.user.getUserHashByEmail(email);

    const isAuthenticated = await bcrypt.compare(password, hash);

    if (!isAuthenticated) throw new UnauthorizedException();

    const payload = { id, name, email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
