// src/routes/target.ts

import { Router } from 'express';
import { body } from 'express-validator';
import { kimlikDoğrula } from '../middlewares/auth';
import {
  hedefOlustur,
  hedefleriListele,
  getSingleTarget,
  deleteTarget
} from '../controllers/target';

const targetRouter = Router();
targetRouter.use(kimlikDoğrula);

// --- المسار 1: GET /api/targets (لعرض قائمة الأهداف) ---
/**
 * @swagger
 * /targets:
 *   get:
 *     summary: Belirli bir organizasyon için tüm hedefleri listeler
 *     tags: [Targets]
 *     parameters:
 *       - in: query
 *         name: organizationId
 *         required: true
 *         schema: { type: string }
 *         description: Hedefleri listelenecek organizasyonun ID'si.
 *     responses:
 *       '200':
 *         description: Hedeflerin bir listesi.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Target' }
 */
targetRouter.get('/', hedefleriListele);

// --- المسار 2: POST /api/targets (لإنشاء هدف جديد) ---
const hedefOlusturmaKurallari = [
  body('name').notEmpty().withMessage('Hedef adı zorunludur.').isString(),
  body('url').isURL().withMessage('Geçerli bir URL zorunludur.'),
  body('organizationId').notEmpty().isString().withMessage('Geçerli bir organizasyon IDsi zorunludur.'),
];
/**
 * @swagger
 * /targets:
 *   post:
 *     summary: Bir organizasyon içinde yeni bir hedef oluşturur
 *     tags: [Targets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string, example: "Üretim API'm" }
 *               url: { type: string, example: "https://api.sirketim.com" }
 *               organizationId: { type: string }
 *     responses:
 *       '201':
 *         description: Hedef başarıyla oluşturuldu.
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Target' }
 */
targetRouter.post('/', hedefOlusturmaKurallari, hedefOlustur );

// --- المسار 3: GET /api/targets/:id (لعرض هدف واحد) ---
/**
 * @swagger
 * /targets/{id}:
 *   get:
 *     summary: ID'ye göre tek bir hedefi getirir
 *     tags: [Targets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: Alınacak hedefin ID'si.
 *     responses:
 *       '200':
 *         description: Hedef nesnesi.
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Target' }
 *       '404': { description: 'Hedef bulunamadı.' }
 */
targetRouter.get('/:id', getSingleTarget);

// --- المسار 4: DELETE /api/targets/:id (لحذف هدف) ---
/**
 * @swagger
 * /targets/{id}:
 *   delete:
 *     summary: ID'ye göre bir hedefi siler
 *     tags: [Targets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: Silinecek hedefin ID'si.
 *     responses:
 *       '204':
 *         description: Hedef başarıyla silindi.
 *       '404': { description: 'Silinecek hedef bulunamadı.' }
 */
targetRouter.delete('/:id', deleteTarget);

export default targetRouter;
