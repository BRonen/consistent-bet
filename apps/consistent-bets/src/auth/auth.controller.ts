import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthGuard } from './auth.guard';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signIn(createAuthDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  getProfile(@Request() req) {
    return this.userService.findById(req.user.id);
  }
}
