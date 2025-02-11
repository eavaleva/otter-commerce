import { z } from 'zod';

export const CreateCategorySchema = z.object({
    body: z.object({
        name: z.string().min(2).max(50),
        description: z.string().optional(),
        parentId: z.string().uuid().optional()
    })
});

export const UpdateCategorySchema = z.object({
    params: z.object({
        id: z.string().uuid()
    }),
    body: z.object({
        name: z.string().min(2).max(50).optional(),
        description: z.string().optional(),
        parentId: z.string().uuid().optional()
    })
});

export const GetCategorySchema = z.object({
    params: z.object({
        id: z.string().uuid()
    })
});

export const DeleteCategorySchema = z.object({
    params: z.object({
        id: z.string().uuid()
    })
});
