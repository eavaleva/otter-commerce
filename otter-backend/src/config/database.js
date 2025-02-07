import { PrismaClient } from '@prisma/client';

class PrismaSingleton {
    constructor() {
        if (!PrismaSingleton.instance) {
            PrismaSingleton.instance = new PrismaClient({
                log: process.env.NODE_ENV === 'development'
                    ? ['query', 'error', 'warn']
                    : ['error'],
            });
        }
    }

    getInstance() {
        return PrismaSingleton.instance;
    }
}

// Create singleton instance of Prisma
const prisma = new PrismaSingleton().getInstance();
// Function to test database connection
export async function connectDB() {
    try {
        await prisma.$connect();
        console.log('✅ Database connected successfully');
    } catch (error) {
        console.error('❌ Error connecting to database:', error);
        process.exit(1);
    }
}

// Function to gracefully disconnect
export async function disconnectDB() {
    try {
        await prisma.$disconnect();
        console.log('Database disconnected successfully');
    } catch (error) {
        console.error('Error disconnecting from database:', error);
        process.exit(1);
    }
}
export default prisma;
