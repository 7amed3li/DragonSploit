import { Router } from 'express';
import { body } from 'express-validator';
// **التصحيح الرئيسي هنا:** استيراد الدوال بالأسماء الصحيحة من الـ controller
import { 
  kullaniciKaydi, 
  kullaniciGiris, 
  cikisYap, 
  refreshTokenYenile 
} from '../controllers/kullanici';
import { validate } from '../utils/validate';

const authRouter = Router();

// --- Registration Route ---
const registrationRules = [
  body('email').isEmail().withMessage('Please enter a valid email address.'),
  body('name').notEmpty().withMessage('Name field cannot be empty.'),
  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
    .matches(/\d/).withMessage('Password must contain at least one number.')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter.')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter.'),
  validate,
];

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Creates a new user, organization, and returns tokens
 *     tags: [Auth]
 *     description: Registers a new user, automatically creates a default organization for them, and returns access/refresh tokens.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterInput'
 *     responses:
 *       '201':
 *         description: User and organization created successfully, tokens returned.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken: { type: 'string' }
 *       '400': { description: 'Invalid request (validation errors).' }
 *       '409': { description: 'Conflict (email already in use).' }
 */
authRouter.post('/register', registrationRules, kullaniciKaydi);


// --- Login Route ---
const loginRules = [
  body('email').isEmail().withMessage('Please enter a valid email address.'),
  body('password').notEmpty().withMessage('Password field cannot be empty.'),
  validate,
];

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Logs in a user and returns tokens
 *     tags: [Auth]
 *     description: Authenticates a user and returns an access token in the body and a refresh token in an httpOnly cookie.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       '200':
 *         description: Login successful, tokens returned.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken: { type: 'string' }
 *       '400': { description: 'Missing or invalid data.' }
 *       '401': { description: 'Unauthorized (invalid email or password ).' }
 *       '403': { description: 'Forbidden (user does not belong to any organization).' }
 */
authRouter.post('/login', loginRules, kullaniciGiris);


// --- Refresh Token Route ---
/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Issues a new access token using a refresh token
 *     tags: [Auth]
 *     description: Uses the httpOnly refresh token cookie to issue a new access token.
 *     responses:
 *       '200':
 *         description: Access token refreshed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken: { type: 'string' }
 *       '401': { description: 'Unauthorized (no refresh token found or token is invalid ).' }
 */
authRouter.post('/refresh', refreshTokenYenile);


// --- Logout Route ---
/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logs out the user
 *     tags: [Auth]
 *     description: Invalidates the user's refresh token on the server and clears the cookie.
 *     responses:
 *       '200':
 *         description: Logout successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mesaj: { type: 'string', example: 'Çıkış başarılı.' }
 */
authRouter.post('/logout', cikisYap);


export default authRouter;
