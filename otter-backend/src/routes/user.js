import express from 'express';
import  UserController  from '../controllers/user.js';
import { validateRequest } from '../middlewares/validation.js';
import { CreateUserSchema, GetAllUsersSchema, UpdateUserSchema } from '../schemas/user.js';
import { requireAuth } from '../middlewares/auth.js';


const userRoute = express.Router();
const userController = new UserController();

userRoute.post('/register', validateRequest(CreateUserSchema), userController.register);
userRoute.post('/login', userController.login);
userRoute.get('/me', requireAuth, userController.getProfile);
userRoute.put('/me', requireAuth, validateRequest(UpdateUserSchema), userController.updateProfile);
userRoute.post('/refresh-token', userController.refreshToken);
userRoute.get('/users', requireAuth, validateRequest(GetAllUsersSchema), userController.getAllUsers);

export default userRoute;
