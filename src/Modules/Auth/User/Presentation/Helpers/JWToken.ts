import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface IJWT {
  data: {
    username: string;
    role?: string;
  };
}
@Injectable()
export class JWToken {
  private readonly NODE_JWT_EXPIRES_IN: number;
  private readonly NODE_JWT_SECRET: string;

  constructor(private readonly configService: ConfigService) {
    this.NODE_JWT_EXPIRES_IN = this.configService.get('NODE_JWT_EXPIRES_IN');
    this.NODE_JWT_SECRET = this.configService.get('NODE_JWT_SECRET');
  }
  setJWT(username: string, role?: string): string {
    return jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + this.NODE_JWT_EXPIRES_IN,
        data: {
          username,
          role,
        },
      },
      this.NODE_JWT_SECRET,
    );
  }

  verifyJWT(accessToken: string): IJWT {
    return jwt.verify(accessToken, this.NODE_JWT_SECRET) as IJWT;
  }
}
