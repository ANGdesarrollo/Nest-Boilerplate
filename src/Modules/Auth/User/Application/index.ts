import { CreateUserService } from './CreateUserService';
import { GetOneUserService } from './GetOneUserService';
import { ListUserService } from './ListUserService';
import { UpdateUserService } from './UpdateUserService';
import { LoginUserService } from './LoginUserService';
import { ForgotPasswordService } from './ForgotPasswordService';
import { ResetPasswordService } from './ResetPasswordService';

export const userServices = [
  CreateUserService,
  GetOneUserService,
  ListUserService,
  UpdateUserService,
  LoginUserService,
  ForgotPasswordService,
  ResetPasswordService,
];
