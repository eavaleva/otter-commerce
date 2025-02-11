import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import userRoute from './routes/user.js';

import { validateEnv } from './utils/index.js';
import { connectDB, disconnectDB } from './config/database.js';

dotenv.config();

async function initializeApp() {
    try {
        // Validate environment variables before starting the app
        validateEnv();
        await connectDB();
        const app = express();

        app.use(cors());
        app.use(express.json());
        app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
        app.use(cors());
        app.use('/', userRoute);

        app.get('/', (_req, _res) =>
            _res.status(200).send({ message: 'Hello World' }));

        app.listen(process.env.SERVER_PORT, () => {
            console.log(`Server is running on port ${process.env.SERVER_PORT}`);
        });

        // Handle graceful shutdown
        process.on('SIGINT', async () => {
            await disconnectDB();
            process.exit(0);
        });

        process.on('SIGTERM', async () => {
            await disconnectDB();
            process.exit(0);
        });
    } catch (error) {
        console.error('Error connecting to database:', error);
        process.exit(1);
    }
}

initializeApp().catch(console.error);

