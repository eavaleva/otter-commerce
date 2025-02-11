import express from 'express';
import  UserController  from '../controllers/user.js';
import { validateRequest } from '../middlewares/validation.js';
import { CreateUserSchema, GetAllUsersSchema, UpdateUserSchema } from '../schemas/user.js';
import { requireAuth } from '../middlewares/auth.js';
import { isAdmin } from "../middlewares/isAdmin.js";


const userRoute = express.Router();
const userController = new UserController();

// Public routes
userRoute.post('/register', validateRequest(CreateUserSchema), userController.register);
userRoute.post('/login', userController.login);
userRoute.post('/refresh-token', userController.refreshToken);

// Protected routes
userRoute.get('/me', requireAuth, userController.getProfile);
userRoute.put('/me', requireAuth, validateRequest(UpdateUserSchema), userController.updateProfile);
userRoute.post('/logout', requireAuth, userController.logout);

// Admin-only routes
userRoute.get(
    '/users',
    requireAuth,
    isAdmin,
    validateRequest(GetAllUsersSchema),
    userController.getAllUsers
);

export default userRoute;
