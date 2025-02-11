import {AppError} from "../utils/index.js";

export const isAdmin = (req, res, next) => {
    if (!req.user) {
        return next(new AppError('Authentication required', 401));
    }
    if (req.user.role !== 'admin') {
        return next(new AppError('Forbidden - Admin access required', 403));
    }
    next();
};
