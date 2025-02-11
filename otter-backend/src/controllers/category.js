import { Category } from '../services/category.js';
import { AppError } from '../utils/appError.js';

class CategoryController {
    constructor() {
        this.categoryService = new Category();
    }

    createCategory = async (req, res, next) => {
        try {
            const category = await this.categoryService.createCategory(req.body);
            res.status(201).json(category);
        } catch (error) {
            next(new AppError(error.message, 400));
        }
    };

    getCategory = async (req, res, next) => {
        try {
            const category = await this.categoryService.getCategoryById(req.params.id);
            res.json(category);
        } catch (error) {
            next(new AppError(error.message, 404));
        }
    };

    getAllCategories = async (req, res, next) => {
        try {
            const categories = await this.categoryService.getAllCategories();
            res.json(categories);
        } catch (error) {
            next(new AppError(error.message, 400));
        }
    };

    updateCategory = async (req, res, next) => {
        try {
            const category = await this.categoryService.updateCategory(
                req.params.id,
                req.body
            );
            res.json(category);
        } catch (error) {
            next(new AppError(error.message, 400));
        }
    };

    deleteCategory = async (req, res, next) => {
        try {
            await this.categoryService.deleteCategory(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(new AppError(error.message, 400));
        }
    };

    getCategoryHierarchy = async (req, res, next) => {
        try {
            const hierarchy = await this.categoryService.getCategoryHierarchy();
            res.json(hierarchy);
        } catch (error) {
            next(new AppError(error.message, 400));
        }
    };
}

export default CategoryController;
