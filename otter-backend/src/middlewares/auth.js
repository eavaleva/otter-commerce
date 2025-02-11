import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { User } from '../services/user.js';
import {TokenUtils, AppError} from "../utils/index.js";

dotenv.config();


export const requireAuth = async (req, res, next) => {
    try {
        const userService = new User();
        const tokenService = new TokenUtils();

        const authHeader = req.headers.authorization;
        if(!authHeader?.startsWith('Bearer ')){
            throw new AppError('No token provided', 401);
        }
        const token = authHeader.split(' ')[1];

        // Use tokenService to verify the token
        const decoded = tokenService.verifyAccessToken(token);

        // Use userService to get the user by id
        const user = await userService.getUserById(decoded.userId);

        if(!user) {
            throw new AppError('User not found', 404);
        }
        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            next(new AppError('Invalid token', 401));
        } else {
            next(error);
        }
    }
};

// export const requireAuth = (req, res, next) => {
//     try {
//         const userService = new User();
//         const authHeader = req.headers.authorization;
//
//         if (!authHeader?.startsWith('Bearer ')) {
//             throw new AppError('No token provided', 401);
//         }
//
//         const token = authHeader.split(' ')[1];
//         const decoded = jwt(token, process.env.JWT_SECRET);
//
//         const user = userService.getUserById(decoded.userId);
//         if (!user) {
//             throw new AppError('User not found', 404);
//         }
//         req.user = decoded;
//         next();
//     } catch (error) {
//         if (error.name === 'JsonWebTokenError') {
//             next(new AppError('Invalid token', 401));
//         } else {
//             next(error);
//         }
//     }
// };
