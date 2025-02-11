import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

export class TokenUtils {
    constructor() {
        // These should be in environment variables in production
        this.accessTokenSecret = process.env.JWT_SECRET || 'your-access-secret-key';
        this.refreshTokenSecret = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key';
        this.accessTokenExpiry = process.env.JWT_EXPIRES_IN || '24h';
        this.refreshTokenExpiry = process.env.JWT_REFRESH_SECRET_EXPIRES_IN || '7d';
    }

    generateAccessToken(userId) {
        return jwt.sign(
            { userId },
            this.accessTokenSecret,
            { expiresIn: this.accessTokenExpiry }
        );
    }

    generateRefreshToken(userId) {
        const refreshToken = jwt.sign(
            { userId },
            this.refreshTokenSecret,
            { expiresIn: this.refreshTokenExpiry }
        );

        // Generate a token identifier for blacklisting/tracking
        const tokenId = crypto.randomBytes(32).toString('hex');

        return {
            token: refreshToken,
            tokenId
        };
    }

    generateTokenPair(userId) {
        const accessToken = this.generateAccessToken(userId);
        const refreshToken = this.generateRefreshToken(userId);

        return {
            accessToken,
            refreshToken: refreshToken.token,
            refreshTokenId: refreshToken.tokenId
        };
    }

    verifyAccessToken(token) {
        try {
            return jwt.verify(token, this.accessTokenSecret);
        } catch (error) {
            throw new Error('Invalid access token');
        }
    }

    verifyRefreshToken(token) {
        try {
            return jwt.verify(token, this.refreshTokenSecret);
        } catch (error) {
            throw new Error('Invalid refresh token');
        }
    }
}

export default TokenUtils;
