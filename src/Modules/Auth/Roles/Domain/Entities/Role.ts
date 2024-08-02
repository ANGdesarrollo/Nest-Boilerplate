import { BaseId } from '../../../../Shared/Domain/Models/BaseId';

export enum RolesEnum {
  ADMIN = 'ADMIN',
  BASIC = 'BASIC',
}

export class Role extends BaseId {
  slug: RolesEnum;

  constructor(slug: RolesEnum) {
    super();
    this.slug = slug;
  }
}
