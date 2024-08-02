import { Document, Schema } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { Role } from '../../Domain/Entities/Role';
import { IRole } from '../../Domain/Interfaces/IRole';

export type RoleMongooseDocument = IRole & Document;

const RoleSchema = new Schema<RoleMongooseDocument>({
  _id: { type: String, default: uuid },
  slug: { type: String, unique: true, required: true },
});

RoleSchema.loadClass(Role);

export default RoleSchema;
