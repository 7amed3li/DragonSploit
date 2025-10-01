import { Router } from 'express';
import { body } from 'express-validator';
import { kullaniciKaydi, kullaniciGiris } from '../controllers/kullanici'; // يمكنك تغيير أسماء هذه الدوال لاحقاً
import { validate } from '../utils/validate'; // إضافة validate middleware

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
  validate, // تطبيق التحقق
];

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Creates a new user account
 *     tags: [Auth]
 *     description: Adds a new user to the system and securely hashes their password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterInput'
 *     responses:
 *       '201':
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400': { description: 'Invalid request (validation errors).' }
 *       '409': { description: 'Conflict (email already in use).' }
 */
authRouter.post('/register', registrationRules, kullaniciKaydi);


// --- Login Route ---
const loginRules = [
  body('email').isEmail().withMessage('Please enter a valid email address.'),
  body('password').notEmpty().withMessage('Password field cannot be empty.'),
  validate, // تطبيق التحقق
];

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Logs in a user and returns a JWT
 *     tags: [Auth]
 *     description: Authenticates a user and returns a JSON Web Token (JWT) for access.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       '200':
 *         description: Login successful, token returned.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful!"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       '400': { description: 'Missing or invalid data.' }
 *       '401': { description: 'Unauthorized (invalid email or password).' }
 */
authRouter.post('/login', loginRules, kullaniciGiris);

export default authRouter;
