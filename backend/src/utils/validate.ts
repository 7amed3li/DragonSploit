import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const firstError = errors.array({ onlyFirstError: true })[0];

  // تم إصلاح هذا الجزء
  if (firstError) {
    return res.status(400).json({ message: firstError.msg });
  }

  next();
};
