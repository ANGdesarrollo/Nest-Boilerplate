import { Document, model, Schema } from 'mongoose';
import { IUser } from '../../Domain/interfaces/IUser';
import { v4 as uuid } from "uuid"
import { User } from '../../Domain/entities/User';

export type UserMongooseDocument = IUser & Document;

const UserSchema = new Schema<UserMongooseDocument>({
  _id: { type: String, default: uuid()},
  username: { type: String, unique: true, required: true},
  password: { type: String, required: true }
})

UserSchema.loadClass(User)

export default UserSchema
