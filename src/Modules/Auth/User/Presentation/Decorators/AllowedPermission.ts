import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';
import { PermissionsInterceptor } from '../Interceptors/PermissionsInterceptor';

export const PERMISSION = 'PERMISIONS';
const AllowedPermission = (permission: string) => {
  return applyDecorators(
    SetMetadata(PERMISSION, permission),
    UseInterceptors(PermissionsInterceptor),
  );
};

export default AllowedPermission;
