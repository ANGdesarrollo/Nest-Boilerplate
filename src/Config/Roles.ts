import { RolesEnum } from '../Modules/Auth/Roles/Domain/Entities/Role';
import { Permissions } from './Permissions';
export const RolePermissions = {
  [RolesEnum.ADMIN]: [
    Permissions.USER_LIST,
    Permissions.USER_GET_ME,
    Permissions.USER_LOGOUT,
    Permissions.USER_UPDATE,
    Permissions.USER_GET_ONE,
  ],
  [RolesEnum.BASIC]: [Permissions.USER_LOGOUT, Permissions.USER_GET_ME],
};
