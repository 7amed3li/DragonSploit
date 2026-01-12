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
        max: 100, // Limit each IP to 100 requests per windowMs
        message: 'Too many requests from this IP, please try again later.',
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    });

    // Apply rate limiting to all requests
    app.use('/api', limiter);

    // 3. Prevent HTTP Parameter Pollution
    app.use(hpp());

    console.log('🛡️ Security middleware initialized (Helmet, RateLimit, HPP)');
};
