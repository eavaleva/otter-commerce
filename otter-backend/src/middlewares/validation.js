import { ZodError } from 'zod';
import { AppError }  from '../utils/appError.js';

export const validateRequest = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errors = error.errors.map(err => ({
                    path: err.path.join('.'),
                    message: err.message
                }));
                next(new AppError('Validation failed', errors?.status, errors));
            }
            next(error);
        }
    };
};
