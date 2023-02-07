import { Request, Response, NextFunction } from 'express';

export const asyncWrapper =
  (controller: Function) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await controller(req, res, next);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  };
