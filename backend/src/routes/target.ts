import { Router } from 'express';
import { body, query, param } from 'express-validator'; // استيراد query و param
import { kimlikDoğrula } from '../middlewares/auth';
import { validate } from '../utils/validate'; // إضافة validate
import {
  hedefOlustur,
  hedefleriListele,
  getSingleTarget,
  deleteTarget
} from '../controllers/target'; // يمكنك تغيير أسماء هذه الدوال لاحقاً

const targetRouter = Router();
targetRouter.use(kimlikDoğrula);

// --- Validation Rules ---
const createTargetRules = [
  body('name').notEmpty().withMessage('Target name is required.').isString(),
  body('url').isURL().withMessage('A valid URL is required.'),
  body('organizationId').notEmpty().isString().withMessage('A valid organization ID is required.'),
  validate,
];

const listTargetsRules = [
  query('organizationId').notEmpty().withMessage('organizationId query parameter is required.').isString(),
  validate,
];

const targetIdParamRule = [
  param('id').notEmpty().withMessage('Target ID in path is required.').isString(),
  validate,
];

// --- Routes ---

/**
 * @swagger
 * /targets:
 *   get:
 *     summary: Lists all targets for a specific organization
 *     tags: [Targets]
 *     parameters:
 *       - in: query
 *         name: organizationId
 *         required: true
 *         schema: { type: string }
 *         description: The ID of the organization to list targets for.
 *     responses:
 *       '200':
 *         description: A list of targets.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Target' }
 */
targetRouter.get('/', listTargetsRules, hedefleriListele);

/**
 * @swagger
 * /targets:
 *   post:
 *     summary: Creates a new target within an organization
 *     tags: [Targets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string, example: "My Production API" }
 *               url: { type: string, example: "https://api.mycompany.com" }
 *               organizationId: { type: string }
 *     responses:
 *       '201':
 *         description: Target created successfully.
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Target' }
 */
targetRouter.post('/', createTargetRules, hedefOlustur  );

/**
 * @swagger
 * /targets/{id}:
 *   get:
 *     summary: Gets a single target by ID
 *     tags: [Targets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: The ID of the target to retrieve.
 *     responses:
 *       '200':
 *         description: The target object.
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Target' }
 *       '404': { description: 'Target not found.' }
 */
targetRouter.get('/:id', targetIdParamRule, getSingleTarget);

/**
 * @swagger
 * /targets/{id}:
 *   delete:
 *     summary: Deletes a target by ID
 *     tags: [Targets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: The ID of the target to delete.
 *     responses:
 *       '204':
 *         description: Target deleted successfully.
 *       '404': { description: 'Target to delete was not found.' }
 */
targetRouter.delete('/:id', targetIdParamRule, deleteTarget);

export default targetRouter;
