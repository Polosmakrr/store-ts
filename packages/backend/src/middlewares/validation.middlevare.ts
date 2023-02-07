import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { BadRequest } from 'http-errors';

export const vallidator =
  <T extends Joi.ObjectSchema>(schema: T) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(new BadRequest(`Error field: ${error.message}`));
    }
    next();
  };
