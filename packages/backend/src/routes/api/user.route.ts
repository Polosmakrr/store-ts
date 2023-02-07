import { Router } from 'express';
import { vallidator } from '../../middlewares/validation.middlevare';
import authController from '../../controllers/auth.controller';
import { asyncWrapper } from '../../middlewares/async.wrapper';
import { schemaAuth } from '../../schema/validation.auth';
import { errorHandler } from '../../error/error.handler';
import { auth } from '../../middlewares/auth.middleware';

const userRouter: Router = Router();

userRouter.post(
  '/register',
  vallidator(schemaAuth),
  asyncWrapper(authController.register.bind(authController))
);
userRouter.post(
  '/login',
  vallidator(schemaAuth),
  asyncWrapper(authController.login.bind(authController))
);
userRouter.get('/current', auth, asyncWrapper(authController.current.bind(authController)));
userRouter.post('/logout', auth, asyncWrapper(authController.logout.bind(authController)));
userRouter.use(errorHandler);

export default userRouter;
