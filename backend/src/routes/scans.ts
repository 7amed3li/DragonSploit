import { Router } from 'express';
import { body, query, param } from 'express-validator';
import { validate } from '../utils/validate';
import { kimlikDoğrula } from '../middlewares/auth';
import * as scanController from '../controllers/scans';

const router = Router();

// --- Validation Rules (These are correct, no changes needed) ---

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


// --- Route Definitions with Updated Swagger Documentation ---

/**
 * @swagger
 * /scans:
 *   post:
 *     summary: Queues a new scan for execution
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
 *         description: Scan was successfully queued. The response contains the initial scan record.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: "Scan successfully queued for execution." }
 *                 data:
 *                   $ref: '#/components/schemas/Scan'
 *       400:
 *         description: 'Invalid request (e.g., missing targetId).'
 *       403:
 *         description: You do not have permission to scan this target.
 *       404:
 *         description: Target or scan configuration not found.
 */
router.post('/', kimlikDoğrula, createScanValidation, scanController.createScan);

/**
 * @swagger
 * /scans:
 *   get:
 *     summary: Lists all scans for a specific organization
 *     tags: [Scans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: organizationId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the organization to list scans for.
 *     responses:
 *       200:
 *         description: A list of scans was successfully retrieved.
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
 *         description: You are not a member of this organization.
 */
router.get('/', kimlikDoğrula, listScansValidation, scanController.listScans);

/**
 * @swagger
 * /scans/{id}:
 *   get:
 *     summary: Gets the details of a specific scan
 *     tags: [Scans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The unique ID of the scan to retrieve.
 *     responses:
 *       200:
 *         description: Scan details were successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Scan'
 *       403:
 *         description: You do not have permission to view this scan.
 *       404:
 *         description: A scan with the specified ID was not found.
 */
router.get('/:id', kimlikDoğrula, getScanValidation, scanController.getScan);

export default router;
