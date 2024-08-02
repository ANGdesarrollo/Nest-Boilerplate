import { Injectable } from '@nestjs/common';
import { ForgotPasswordUserDto } from '../Presentation/Dto/ForgotPasswordUserDto';
import { JWToken } from '../Presentation/Helpers/JWToken';
import { ConfigService } from '@nestjs/config';
import { EmailService } from '../../../Shared/Application/EmailService';
import { TemplateForgotEmail } from '../Presentation/Helpers/Templates/templateForgotEmail';

@Injectable()
export class ForgotPasswordService {
  private readonly FRONT_URL: string;
  constructor(
    private readonly jwt: JWToken,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly template: TemplateForgotEmail,
  ) {
    this.FRONT_URL = this.configService.get('FRONT_URL');
  }

  async execute(payload: ForgotPasswordUserDto) {
    const recoverToken = this.jwt.setJWT(payload.username);
    const link = `${this.FRONT_URL}/${recoverToken}`;

    await this.emailService.createTransport(
      this.template.getTemplateForgotEmail(payload.username, link),
    );

    return;
  }
}
