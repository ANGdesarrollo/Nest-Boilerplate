import { Controller, Get, Post, Body, Patch, Param, ParseUUIDPipe } from '@nestjs/common';
import { CreateUserDto } from '../dto/CreateUserDto';
import { UpdateUserDto } from '../dto/UpdateUserDto';
import { ListUserService } from '../../Application/ListUserService';
import { CreateUserService } from '../../Application/CreateUserService';
import { UpdateUserService } from '../../Application/UpdateUserService';
import { GetOneUserService } from '../../Application/GetOneUserService';

@Controller('user')
export class UserController {
  constructor(
    private readonly listService: ListUserService,
    private readonly createService: CreateUserService,
    private readonly updateService: UpdateUserService,
    private readonly getOneService: GetOneUserService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.createService.execute(createUserDto);
  }

  @Get()
  findAll() {
    return this.listService.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.getOneService.execute(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.updateService.execute({
      id,
      updateUserDto,
    });
  }
}
