import {PrismaClient} from '@prisma/client';
import {AppError} from '../utils/index.js';

export class Category {
    constructor() {
        this.prisma = new PrismaClient();
    }

    async createCategory(data) {
        const existingCategory = await this.prisma.category.findUnique({
            where: {name: data.name}
        });
        if (existingCategory) {
            throw new AppError('Category already exists', 400);
        }
        return this.prisma.category.create({
            data,
            include: {
                parent: true,
                children: true,
            }
        });
    }

    async getCategoryById(id) {
        const category = await this.prisma.category.findUnique({
            where: {id},
            include: {
                parent: true,
                children: true,
                products: {
                    include: {
                        images: true
                    }
                }
            }
        });
        if (!category) {
            throw new AppError('Category not found', 404);
        }

        return category;
    }

    async getAllCategories() {
        return this.prisma.category.findMany({
            include: {
                parent: true,
                children: true,
                _count: {
                    select: { products: true }
                }
            }
        });
    }

    async updateCategory(id, data) {
        const category = await this.prisma.category.findUnique({
            where: { id }
        });

        if (!category) {
            throw new AppError('Category not found', 404);
        }

        if (data.name && data.name !== category.name) {
            const existingCategory = await this.prisma.category.findUnique({
                where: { name: data.name }
            });

            if (existingCategory) {
                throw new AppError('Category with this name already exists', 400);
            }
        }

        return this.prisma.category.update({
            where: { id },
            data,
            include: {
                parent: true,
                children: true
            }
        });
    }
    async deleteCategory(id) {
        const category = await this.prisma.category.findUnique({
            where: { id },
            include: {
                products: true,
                children: true
            }
        });

        if (!category) {
            throw new AppError('Category not found', 404);
        }

        if (category.products.length > 0) {
            throw new AppError('Cannot delete category with existing products', 400);
        }

        if (category.children.length > 0) {
            throw new AppError('Cannot delete category with subcategories', 400);
        }

        return this.prisma.category.delete({
            where: { id }
        });
    }
    async getCategoryHierarchy() {
        // Get all root categories (categories without parents)
        const rootCategories = await this.prisma.category.findMany({
            where: {
                parentId: null
            },
            include: {
                children: true,
                _count: {
                    select: { products: true }
                }
            }
        });

        return rootCategories;
    }
}
