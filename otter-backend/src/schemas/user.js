import { z } from 'zod';

export const CreateUserSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string().min(6),
        first_name: z.string().min(2).optional(),
        last_name: z.string().min(2).optional(),
        role: z.enum(['user', 'admin']).optional(),
    }),
});

export const GetUserSchema = z.object({
    params: z.object({
        userId: z.string().uuid(),
    }),
});

export const GetAllUsersSchema = z.object({
    query: z.object({
        limit: z.string().optional(),
        offset: z.string().optional(),
    }),
});

export const UpdateUserSchema = z.object({
    body: z.object({
        email: z.string().email().optional(),
        first_name: z.string().min(2).optional(),
        last_name: z.string().min(2).optional(),
        role: z.enum(['user', 'admin']).optional(),
    }),
});

export const DeleteUserSchema = z.object({
    params: z.object({
        userId: z.string().uuid(),
    }),
});


