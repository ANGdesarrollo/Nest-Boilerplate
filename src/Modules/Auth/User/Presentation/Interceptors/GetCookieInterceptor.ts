import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JWToken } from '../Helpers/JWToken';

@Injectable()
export class GetCookieInterceptor implements NestInterceptor {
  constructor(private readonly jwt: JWToken) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();

    const token = request.query.token;

    if (!token) {
      throw new UnauthorizedException();
    }

    const decode = this.jwt.verifyJWT(token);
    request['username'] = decode.data.username;
    request['role'] = decode.data.role;

    return next.handle();
  }
}
