import { Router } from 'express';
import { body } from 'express-validator';
import { kurumOlustur, kurumlariListele } from '../controllers/kurum';
import { kimlikDoğrula } from '../middlewares/auth';

const kurumRouter = Router();

kurumRouter.use(kimlikDoğrula);

const kurumOlusturmaKurallari = [
  body('name')
    .notEmpty().withMessage('İsim (name) alanı boş olamaz.')
    .isString().withMessage('İsim (name) alanı bir metin olmalıdır.')
    .isLength({ min: 3, max: 100 }).withMessage('İsim (name) 3 ile 100 karakter arasında olmalıdır.'),
];

/**
 * @swagger
 * /kurumlar:
 *   post:
 *     summary: Yeni bir kurum oluşturur
 *     tags: [Kurumlar]
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
 *                 example: "Yeni Teknoloji Şirketim"
 *     responses:
 *       '201':
 *         description: Kurum başarıyla oluşturuldu.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organization'
 */
kurumRouter.post('/', kurumOlusturmaKurallari, kurumOlustur);

/**
 * @swagger
 * /kurumlar:
 *   get:
 *     summary: Tüm kurumları listeler
 *     tags: [Kurumlar]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Kurumların listesi başarıyla alındı.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Organization'
 */
kurumRouter.get('/', kurumlariListele);

export default kurumRouter;
