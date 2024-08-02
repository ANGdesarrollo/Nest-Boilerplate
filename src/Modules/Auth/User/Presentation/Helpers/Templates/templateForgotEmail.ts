import { ITemplate } from '../../../../../Shared/Application/IEmailService';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TemplateForgotEmail {
  private readonly NODE_USERNAME_NODEMAILER: string;
  constructor(private readonly configService: ConfigService) {
    this.NODE_USERNAME_NODEMAILER = this.configService.get(
      'NODE_USERNAME_NODEMAILER',
    );
  }
  getTemplateForgotEmail(to: string, forgotLink: string) {
    return {
      from: this.NODE_USERNAME_NODEMAILER,
      to,
      subject: 'Forgot password',
      html: `
  <div style="background-color: #F2F2F2; padding: 20px;">
    <div style="background-color: #FFFFFF; padding: 20px; border-radius: 5px;">
      <h2 style="color: #007BFF;">Recuperación de Contraseña</h2>
      <p>¡Hola!</p>
      <p>Recibes este correo porque solicitaste recuperar tu contraseña en nuestro sitio web.</p>
      <p>Por favor, haz clic en el siguiente enlace para restablecer tu contraseña:</p>
      <p>${forgotLink}</p>
      <p>Si no solicitaste este cambio, puedes ignorar este correo y tu contraseña seguirá siendo la misma.</p>
      <p>Gracias por usar nuestro servicio.</p>
      <p style="color: #888888;">Atentamente,<br>Tu Equipo de Soporte</p>
    </div>
  </div>`,
    };
  }
}
