import { Router } from 'express';
import { body, query, param } from 'express-validator';
import { validate } from '../utils/validate';
import { kimlikDoğrula } from '../middlewares/auth';
import * as scanController from '../controllers/scans';

const router = Router();

// --- قواعد التحقق (Validation Rules) ---

const createScanValidation = [
  body('targetId')
    .notEmpty().withMessage('Target ID is required')
    .isString().withMessage('Target ID must be a valid string'),
  body('configurationId')
    .optional()
    .isString().withMessage('Configuration ID must be a valid string'),
  validate,
];

const listScansValidation = [
  query('organizationId')
    .notEmpty().withMessage('Organization ID is required in query parameters')
    .isString().withMessage('Organization ID must be a valid string'),
  validate,
];

const getScanValidation = [
  param('id')
    .notEmpty().withMessage('Scan ID is required in the URL path')
    .isString().withMessage('Scan ID must be a valid string'),
  validate,
];


// --- تعريف المسارات (Routes) مع توثيق Swagger ---
/**
 * @swagger
 * /scans:
 *   post:
 *     summary: Yeni bir tarama başlatır (Initiates a new scan)
 *     tags: [Scans]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateScanInput'
 *     responses:
 *       201:
 *         description: Tarama başarıyla başlatıldı ve sıraya alındı.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string }
 *                 data:
 *                   $ref: '#/components/schemas/Scan'
 *       400:
 *         description: 'Geçersiz istek (örn: eksik targetId).'
 *       403:
 *         description: Bu hedefi tarama izniniz yok.
 *       404:
 *         description: Hedef veya tarama yapılandırması bulunamadı.
 */

router.post('/', kimlikDoğrula, createScanValidation, scanController.createScan);

/**
 * @swagger
 * /scans:
 *   get:
 *     summary: Belirli bir organizasyon için tüm taramaları listeler (Lists all scans for an organization)
 *     tags: [Scans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: organizationId
 *         schema:
 *           type: string
 *         required: true
 *         description: Taramaları listelenecek organizasyonun kimliği.
 *     responses:
 *       200:
 *         description: Taramaların listesi başarıyla alındı.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Scan'
 *       403:
 *         description: Bu organizasyonun üyesi değilsiniz.
 */
router.get('/', kimlikDoğrula, listScansValidation, scanController.listScans);

/**
 * @swagger
 * /scans/{id}:
 *   get:
 *     summary: Belirli bir taramanın detaylarını getirir (Gets details of a specific scan)
 *     tags: [Scans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Detayları alınacak taramanın benzersiz kimliği.
 *     responses:
 *       200:
 *         description: Tarama detayları başarıyla alındı.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Scan'
 *       403:
 *         description: Bu taramayı görüntüleme izniniz yok.
 *       404:
 *         description: Belirtilen kimliğe sahip tarama bulunamadı.
 */
router.get('/:id', kimlikDoğrula, getScanValidation, scanController.getScan);

export default router;
