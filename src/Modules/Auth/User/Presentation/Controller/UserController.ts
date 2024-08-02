import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseUUIDPipe,
  UseInterceptors,
  Delete,
  Req,
} from '@nestjs/common';
import { CreateUserDto } from '../Dto/CreateUserDto';
import { UpdateUserDto } from '../Dto/UpdateUserDto';
import { ListUserService } from '../../Application/ListUserService';
import { CreateUserService } from '../../Application/CreateUserService';
import { UpdateUserService } from '../../Application/UpdateUserService';
import { GetOneUserService } from '../../Application/GetOneUserService';
import { LoginUserDto } from '../Dto/LoginUserDto';
import { MegaTiendaOnline } from '../Dto/TestDto';
import { LoginUserService } from '../../Application/LoginUserService';
import { SetCookieInterceptor } from '../Interceptors/SetCookieInterceptor';
import { DeleteCookieInterceptor } from '../Interceptors/DeleteCookieInterceptor';
import { ForgotPasswordUserDto } from '../Dto/ForgotPasswordUserDto';
import { ForgotPasswordService } from '../../Application/ForgotPasswordService';
import { ResetPasswordUserDto } from '../Dto/ResetPasswordDto';
import { ResetPasswordService } from '../../Application/ResetPasswordService';
import { GetCookieInterceptor } from '../Interceptors/GetCookieInterceptor';
import AllowedPermission from '../Decorators/AllowedPermission';
import { Permissions } from '../../../../../Config/Permissions';

@Controller('auth/user')
export class UserController {
  constructor(
    private readonly listService: ListUserService,
    private readonly createService: CreateUserService,
    private readonly updateService: UpdateUserService,
    private readonly getOneService: GetOneUserService,
    private readonly loginService: LoginUserService,
    private readonly forgotPasswordService: ForgotPasswordService,
    private readonly resetPasswordService: ResetPasswordService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.createService.execute(createUserDto);
  }

  @Post('login')
  @UseInterceptors(SetCookieInterceptor)
  login(@Body() loginUserDto: LoginUserDto) {
    return this.loginService.execute(loginUserDto);
  }

  @Post('forgot-password')
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordUserDto) {
    return this.forgotPasswordService.execute(forgotPasswordDto);
  }

  @Post('reset-password')
  @UseInterceptors(GetCookieInterceptor)
  resetPassword(
    @Body() resetPasswordDto: ResetPasswordUserDto,
    @Req() request: Request,
  ) {
    const username = request['username'];
    return this.resetPasswordService.execute({
      password: resetPasswordDto.password,
      username,
    });
  }

  @Delete('logout')
  @AllowedPermission(Permissions.USER_LOGOUT)
  @UseInterceptors(DeleteCookieInterceptor)
  logout() {
    return;
  }

  @Post('test')
  test(@Body() loginUserDto: MegaTiendaOnline) {
    return loginUserDto;
  }

  @Get()
  @AllowedPermission(Permissions.USER_LIST)
  findAll() {
    return this.listService.execute();
  }

  @Get(':id')
  @AllowedPermission(Permissions.USER_GET_ONE)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.getOneService.execute(id);
  }

  @Patch(':id')
  @AllowedPermission(Permissions.USER_UPDATE)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.updateService.execute({
      id,
      updateUserDto,
    });
  }
}
