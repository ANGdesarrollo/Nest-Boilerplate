import { Module } from '@nestjs/common';
import { PasswordService } from './Application/PasswordService';
import { EmailService } from './Application/EmailService';
import { emailTemplates } from '../Auth/User/Presentation/Helpers/Templates';
@Module({
  imports: [],
  providers: [PasswordService, EmailService, ...emailTemplates],
  exports: [PasswordService, EmailService, ...emailTemplates],
})
export class SharedModule {}
