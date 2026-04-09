import type { Request, Response, NextFunction } from 'express';
import type { ApiError } from '../types/weather';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  console.error('[ErrorHandler]', err.message);

  const body: ApiError = {
    success: false,
    code: '500 - Internal server error',
    message: 'Oops! An unexpected error occurred.',
  };

  res.status(500).json(body);
}
