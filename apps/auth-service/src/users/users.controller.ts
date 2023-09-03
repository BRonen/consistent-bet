import { Controller, Get, Post, Body, HttpException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() body: unknown) {
    const createUserDto = new CreateUserDto(body);

    if (!createUserDto.success) throw new HttpException('Invalid payload', 400);

    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  /*
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.usersService.findOne(+id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
      return this.usersService.update(+id, updateUserDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.usersService.remove(+id);
    }
  */
}
