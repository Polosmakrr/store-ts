import { model, Schema } from 'mongoose';
import { IUser } from '../types/users.type';

const userSchema: Schema = new Schema({
  password: {
    type: String,
    required: [true, 'Set password for user']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  name: {
    type: String,
    default: 'Unknown'
  },
  avatarURL: String,
  token: String
});

const User = model<IUser>('User', userSchema);

export default User;
