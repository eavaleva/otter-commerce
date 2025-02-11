import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { AppError, TokenUtils } from '../utils/index.js';

dotenv.config();

export class User {

    constructor() {
        this.prisma = new PrismaClient();
        this.tokenService = new TokenUtils();
    }

    async createUser(data) {
        const exists = await this.prisma.user.findUnique({
            where: { email: data.email } });
        if (exists) {
            throw new AppError('Email already in use', 400);
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await this.prisma.user.create({
            data: {
                ...data,
                password: hashedPassword,
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                createdAt: true,
            },
        });

        const tokens = this.tokenService.generateTokenPair(user.id);

        // Store refresh token in database
        await this.prisma.refreshToken.create({
            data: {
                token: tokens.refreshToken,
                userId: user.id,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
            },
        });

        return { user, tokens };
    }

    async loginUser(email, password) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new AppError('Invalid credentials', 401);
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new AppError('Invalid credentials', 401);
        }

        const tokens = this.tokenService.generateTokenPair(user.id);

        // Store refresh token in database
        await this.prisma.refreshToken.create({
            data: {
                token: tokens.refreshToken,
                userId: user.id,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
            },
        });
        return {
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
            }
            , tokens };
    }

    async refreshToken(refreshToken) {
        try {
            const decoded = this.tokenService.verifyRefreshToken(refreshToken);
            const storedToken = await this.prisma.refreshToken.findFirst({
                where: {
                    token: refreshToken,
                    userId: decoded.userId,
                    expiresAt: {
                        gte: new Date()
                    },
                },
            });

            if(!storedToken) {
                throw new AppError('Invalid refresh token', 401);
            }

            const tokens = this.tokenService.generateTokenPair(decoded.userId);

            // Transaction to ensure atomicity
            await this.prisma.$transaction([
                // Delete old token
                this.prisma.refreshToken.delete({
                    where: {
                        token: refreshToken
                    },
                }),
                // Store new token
                this.prisma.refreshToken.create({
                    data: {
                        token: tokens.refreshToken,
                        userId: decoded.userId,
                        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                    },
                })
            ]);

            return tokens;
        }
        catch (error) {
            throw new AppError('Invalid refresh token', 401);
        }
    }

    async getUserById(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                createdAt: true,
            },
        });

        if (!user) {
            throw new AppError('User not found', 404);
        }

        return user;
    }

    async getAllUsers() {
        return this.prisma.user.findMany({
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                createdAt: true,
            },
        });
    }

    async updateUser(id, data) {
        return this.prisma.user.update({
            where: { id },
            data,
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                createdAt: true,
            },
        });
    }
}
