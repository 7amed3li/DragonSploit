import { Router } from 'express';
import { body } from 'express-validator';
import { kurumOlustur, kurumlariListele } from '../controllers/kurum';
import { kimlikDoğrula } from '../middlewares/auth';
import { validate } from '../utils/validate';

const organizationRouter = Router();

// تطبيق المصادقة على جميع المسارات في هذا الراوتر
// أي طلب يصل إلى هنا سيكون قد مر بالفعل عبر /api/organizations
organizationRouter.use(kimlikDoğrula);

// قواعد التحقق من صحة إنشاء مؤسسة جديدة
const createOrganizationRules = [
  body('name')
    .notEmpty().withMessage('Name field cannot be empty.')
    .isString().withMessage('Name must be a string.')
    .isLength({ min: 3, max: 100 }).withMessage('Name must be between 3 and 100 characters.')
    // قاعدة جديدة: تحقق من أن الاسم لا يحتوي على رموز غير مرغوب فيها
    .custom(value => {
      // هذه Regex تمنع أي شيء ليس حروفًا (عربية/إنجليزية)، أرقامًا، أو مسافات
      const allowedPattern = /^[a-zA-Z0-9\sء-ي]+$/;
      if (!allowedPattern.test(value)) {
        throw new Error('Name contains invalid characters. Only letters, numbers, and spaces are allowed.');
      }
      return true;
    }),
  validate,
];
/**
 * @swagger
 * /api/organizations:
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
 *       '400':
 *         description: Validation error (e.g., name is missing).
 *       '401':
 *         description: Unauthorized (token is missing).
 *       '403':
 *         description: Forbidden (token is invalid or expired).
 */
organizationRouter.post('/', createOrganizationRules, kurumOlustur);

/**
 * @swagger
 * /api/organizations:
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
 *       '401':
 *         description: Unauthorized (token is missing).
 *       '403':
 *         description: Forbidden (token is invalid or expired).
 */
organizationRouter.get('/', kurumlariListele);

export default organizationRouter;
