import { Response, Request, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { Unauthorized } from 'http-errors';
import type { JwtPayload } from 'jsonwebtoken';
import { IError } from '../types';
import User from '../models/User';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization || '';
  const [tokenType, token]: string[] = authHeader.split(' ');

  if (tokenType === 'Bearer' || token) {
    try {
      const { id } = verify(token, process.env.JWT_SECRET) as JwtPayload;

      const user = await User.findById(id);
      if (!user) {
        next(new Unauthorized('Not authorized'));
      }
      if (!user?.token) {
        next(new Unauthorized('Not authorized'));
      }
      req.user = user!;
      return next();
    } catch (error) {
      next(new Unauthorized((error as IError).name));
    }
  }
  return next(new Unauthorized('No Token'));
};
