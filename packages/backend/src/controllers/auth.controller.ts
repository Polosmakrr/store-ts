import { Request, Response } from 'express';
import { IUser } from '../types';
import AuthService from '../services/auth.service';

export class AuthController {
  constructor(private authService: AuthService) {}

  async register(req: Request<never, never, IUser>): Promise<IUser> {
    const { body } = req;
    const user = await this.authService.register(body);
    return user!;
  }

  async login(req: Request<never, never, IUser>): Promise<IUser> {
    const { email, password } = req.body;
    const user = await this.authService.login({ email, password });
    return user!;
  }

  async current(req: Request): Promise<IUser> {
    const { user } = req;
    return user;
  }

  async logout(req: Request, res: Response) {
    const { user } = req;
    await this.authService.logout(user._id!);
    res.status(204).json();
  }
}

const authController = new AuthController(new AuthService());
export default authController;
