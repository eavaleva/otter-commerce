import express from "express";
import userRoute from "./user.js";
import categoryRoute from "./category.js";


const router = express.Router();

// API Health Check
router.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
router.use('/auth', userRoute);        // Prefix all user/auth routes with /auth
router.use('/catalog', categoryRoute);  // Prefix all category routes with /catalog

export default router;
