import * as nodeMailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { ITemplate } from './IEmailService';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  private readonly NODE_HOST_NODEMAILER: string;
  private readonly NODE_PORT_NODEMAILER: number;
  private readonly NODE_USERNAME_NODEMAILER: string;
  private readonly NODE_PASSWORD_NODEMAILER: string;

  constructor(private readonly configService: ConfigService) {
    this.NODE_HOST_NODEMAILER = this.configService.get('NODE_HOST_NODEMAILER');
    this.NODE_PORT_NODEMAILER = this.configService.get('NODE_PORT_NODEMAILER');
    this.NODE_USERNAME_NODEMAILER = this.configService.get(
      'NODE_USERNAME_NODEMAILER',
    );
    this.NODE_PASSWORD_NODEMAILER = this.configService.get(
      'NODE_PASSWORD_NODEMAILER',
    );
  }
  async createTransport(template: ITemplate) {
    try {
      const transporter = nodeMailer.createTransport({
        host: this.NODE_HOST_NODEMAILER,
        port: this.NODE_PORT_NODEMAILER,
        secure: true,
        auth: {
          user: this.NODE_USERNAME_NODEMAILER,
          pass: this.NODE_PASSWORD_NODEMAILER,
        },
      });

      await transporter.verify();

      await transporter.sendMail(template);
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
