import { ObjectId } from 'mongoose';

export interface IUser {
  password: string;
  email: string;
  name?: string;
  avatarURL?: string;
  token?: string | null;
  _id?: ObjectId;
}
