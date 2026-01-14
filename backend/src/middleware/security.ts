import { Express } from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';

/**
 * Configure security middleware
 */
export const setupSecurity = (app: Express) => {
    // 1. Set security HTTP headers
    app.use(helmet());

    // 2. Rate limiting
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: process.env.NODE_ENV === 'production' ? 100 : 1000, // 100 for prod, 1000 for dev
        message: 'Too many requests from this IP, please try again later.',
        standardHeaders: true, 
        legacyHeaders: false, 
    });

    // Apply rate limiting to all requests
    app.use('/api', limiter);

    // 3. Prevent HTTP Parameter Pollution
    app.use(hpp());

    console.log('🛡️ Security middleware initialized (Helmet, RateLimit, HPP)');
};
