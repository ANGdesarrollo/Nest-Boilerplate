import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JWToken } from '../Helpers/JWToken';
import { User } from '../../Domain/Entities/User';

@Injectable()
export class SetCookieInterceptor implements NestInterceptor {
  constructor(private readonly jwt: JWToken) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    return next.handle().pipe(
      tap((data: User) => {
        const jwt = this.jwt.setJWT(data.username, data.role);
        response.setCookie('session', jwt);
      }),
    );
  }
}
