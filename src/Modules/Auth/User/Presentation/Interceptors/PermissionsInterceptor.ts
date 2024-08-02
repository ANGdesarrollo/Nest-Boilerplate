import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JWToken } from '../Helpers/JWToken';
import { IRoleRepository } from '../../../Roles/Infrastructure/Repositories/IRoleRepository';
import { RolePermissions } from '../../../../../Config/Roles';
import { PERMISSION } from '../Decorators/AllowedPermission';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionsInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwt: JWToken,
    private readonly rolesRepository: IRoleRepository,
  ) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();

    const cookie = request.cookies.session;

    if (!cookie) {
      throw new UnauthorizedException();
    }

    const unsignedCookie = request.unsignCookie(cookie).value;

    const decode = this.jwt.verifyJWT(unsignedCookie);

    const role = await this.rolesRepository.findOneById(decode.data.role);

    const permission = this.reflector.getAllAndOverride(PERMISSION, [
      context.getHandler(),
    ]);

    if (!RolePermissions[role.slug].includes(permission)) {
      throw new UnauthorizedException();
    }

    return next.handle();
  }
}
