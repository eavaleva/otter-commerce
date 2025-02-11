import express from 'express';
import CategoryController from '../controllers/category.js';
import { validateRequest } from '../middlewares/validation.js';
import { requireAuth } from '../middlewares/auth.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import {
    CreateCategorySchema,
    UpdateCategorySchema,
    GetCategorySchema,
    DeleteCategorySchema
} from '../schemas/category.js';

const categoryRoute = express.Router();
const categoryController = new CategoryController();

// Public routes
categoryRoute.get('/categories', categoryController.getAllCategories);
categoryRoute.get('/categories/hierarchy', categoryController.getCategoryHierarchy);
categoryRoute.get(
    '/categories/:id',
    validateRequest(GetCategorySchema),
    categoryController.getCategory
);

// Admin-only routes
categoryRoute.post(
    '/categories',
    requireAuth,
    isAdmin,
    validateRequest(CreateCategorySchema),
    categoryController.createCategory
);

categoryRoute.put(
    '/categories/:id',
    requireAuth,
    isAdmin,
    validateRequest(UpdateCategorySchema),
    categoryController.updateCategory
);

categoryRoute.delete(
    '/categories/:id',
    requireAuth,
    isAdmin,
    validateRequest(DeleteCategorySchema),
    categoryController.deleteCategory
);

export default categoryRoute;
