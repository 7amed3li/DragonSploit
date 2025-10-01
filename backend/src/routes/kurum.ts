import { Router } from 'express';
import { body } from 'express-validator';
import { kurumOlustur, kurumlariListele } from '../controllers/kurum'; // يمكنك تغيير أسماء هذه الدوال لاحقاً
import { kimlikDoğrula } from '../middlewares/auth';
import { validate } from '../utils/validate'; // إضافة validate middleware

const organizationRouter = Router();

organizationRouter.use(kimlikDoğrula);

const createOrganizationRules = [
  body('name')
    .notEmpty().withMessage('Name field cannot be empty.')
    .isString().withMessage('Name must be a string.')
    .isLength({ min: 3, max: 100 }).withMessage('Name must be between 3 and 100 characters.'),
  validate, // تطبيق التحقق
];

/**
 * @swagger
 * /organizations:
 *   post:
 *     summary: Creates a new organization
 *     tags: [Organizations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *                 example: "My New Tech Company"
 *     responses:
 *       '201':
 *         description: Organization created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organization'
 */
organizationRouter.post('/', createOrganizationRules, kurumOlustur);

/**
 * @swagger
 * /organizations:
 *   get:
 *     summary: Lists all organizations for the current user
 *     tags: [Organizations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of organizations was successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Organization'
 */
organizationRouter.get('/', kurumlariListele);

export default organizationRouter;
