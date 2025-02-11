import { User } from '../services/user.js';
import  AppError  from '../utils/appError.js';


class UserController {
    constructor() {
        this.userService = new User();
    }

    register = async (req, res, next) => {
        try {
            const { user, tokens } = await this.userService.createUser(req.body);

            res.cookie('refreshToken', tokens.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'none',
                maxAge: 1000 * 60 * 60 * 24 * 7,
            })
            res.status(201).json({
                user,
                accessToken: tokens.accessToken
            });
        } catch (error) {
            next(new AppError(error.message, 400));
        }
    };


    login = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const { user, tokens } = await this.userService.loginUser(email, password);

            res.cookie('refreshToken', tokens.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            })

            res.json({
                user,
                accessToken: tokens.accessToken
            });
        } catch (error) {
            next(new AppError(error.message, 401));
        }
    };

    getProfile = async (req, res, next) => {
        try {
            const user = await this.userService.getUserById(req.user.id);
            res.json(user);
        } catch (error) {
            next(new AppError(error.message, 404));
        }
    };

    updateProfile = async (req, res, next) => {
        try {
            const user = await this.userService.updateUser(req.user.id, req.body);
            res.json(user);
        } catch (error) {
            next(new AppError(error.message, 400));
        }
    };

    refreshToken = async (req, res, next) => {
        try {
            const refreshToken = req.cookie.refreshToken;
            if (!refreshToken) {
                throw new AppError('No refresh token provided', 401);
            }

            const tokens = await this.userService.refreshToken(refreshToken);
            // Set new refresh token in HTTP-only cookie
            res.cookie('refreshToken', tokens.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });

            res.json({ accessToken: tokens.accessToken });
        } catch (error) {
            next(new AppError(error.message, 401));
        }
    };

    logout = async (req, res, next) => {
        try {
            res.clearCookie('refreshToken');
            res.json({ message: 'Logged out successfully' });
        } catch (error) {
            next(new AppError(error.message, 400));
        }
    };

    getAllUsers = async (req, res, next) => {
        try {
            const users = await this.userService.getAllUsers();
            res.json(users);
        } catch (error) {
            next(new AppError(error.message, 404));
        }
    }
}
export default UserController;
