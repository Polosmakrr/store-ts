import { Request, Response, NextFunction } from 'express';
import { Model, isValidObjectId } from 'mongoose';
import { NotFound, BadRequest } from 'http-errors';

export class IsExist {
  check =
    <T>(model: Model<T>) =>
    async (req: Request<never, never, { id: string }>, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const valid = isValidObjectId(id);
      if (!valid) {
        next(new BadRequest('Invalid Id'));
      } else {
        const exist = await model.findOne({ _id: id });
        if (!exist) {
          next(new NotFound('Not found'));
        }
      }
      next();
    };
}

const isExist = new IsExist();
export default isExist;
