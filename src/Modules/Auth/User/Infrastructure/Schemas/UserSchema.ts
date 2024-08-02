import { Document, Schema } from 'mongoose';
import { IUser } from '../../Domain/Interfaces/IUser';
import { v4 as uuid } from 'uuid';
import { User } from '../../Domain/Entities/User';

export type UserMongooseDocument = IUser & Document;

const UserSchema = new Schema<UserMongooseDocument>({
  _id: { type: String, default: uuid() },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, ref: 'Role' },
});

UserSchema.loadClass(User);

export default UserSchema;
