//src\routes\auth.ts
import { Router } from 'express';
import { body } from 'express-validator';
// (1) استيراد الدالتين الآن
import { kullaniciKaydi, kullaniciGiris } from '../controllers/kullanici';

const authRouter = Router();

// --- مسار التسجيل ---
const kayitKurallari = [
  body('email').isEmail().withMessage('Lütfen geçerli bir e-posta adresi girin.'),
  body('name').notEmpty().withMessage('İsim alanı boş olamaz.'),
  body('password')
    .isLength({ min: 8 }).withMessage('Şifre en az 8 karakter uzunluğunda olmalıdır.')
    .matches(/\d/).withMessage('Şifre en az bir rakam içermelidir.')
    .matches(/[a-z]/).withMessage('Şifre en az bir küçük harf içermelidir.')
    .matches(/[A-Z]/).withMessage('Şifre en az bir büyük harf içermelidir.'),
];

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Yeni bir kullanıcı kaydı oluşturur
 *     tags: [Auth]
 *     description: Sisteme yeni bir kullanıcı ekler ve şifresini güvenli bir şekilde hash'ler.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterInput'
 *     responses:
 *       '201':
 *         description: Kullanıcı başarıyla oluşturuldu.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400': { description: 'Geçersiz istek (doğrulama hataları).' }
 *       '409': { description: 'Çakışma (e-posta zaten kullanılıyor).' }
 */
authRouter.post('/register', kayitKurallari, kullaniciKaydi);


// --- مسار تسجيل الدخول ---
const girisKurallari = [
  body('email').isEmail().withMessage('Lütfen geçerli bir e-posta adresi girin.'),
  body('password').notEmpty().withMessage('Şifre alanı boş olamaz.'),
];

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Kullanıcı girişi yapar ve JWT döndürür
 *     tags: [Auth]
 *     description: Kullanıcının kimliğini doğrular ve erişim için bir JSON Web Token (JWT) döndürür.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       '200':
 *         description: Giriş başarılı, token döndürüldü.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mesaj:
 *                   type: string
 *                   example: "Giriş başarılı!"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       '400': { description: 'Eksik veya geçersiz veri.' }
 *       '401': { description: 'Yetkisiz (geçersiz e-posta veya şifre).' }
 */
authRouter.post('/login', girisKurallari, kullaniciGiris);


// --- تعريف المخططات (Schemas) لـ Swagger ---
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id: { type: string, description: "Kullanıcının benzersiz kimliği." }
 *         email: { type: string, format: email, description: "Kullanıcının e-posta adresi." }
 *         name: { type: string, description: "Kullanıcının adı." }
 *         createdAt: { type: string, format: date-time, description: "Oluşturulma tarihi." }
 *         updatedAt: { type: string, format: date-time, description: "Son güncellenme tarihi." }
 *     RegisterInput:
 *       type: object
 *       required: [email, name, password]
 *       properties:
 *         email: { type: string, format: email, example: "test@example.com" }
 *         name: { type: string, example: "Test Kullanıcısı" }
 *         password: { type: string, format: password, description: "En az 8 karakter, büyük/küçük harf ve rakam.", example: "Password123" }
 *     LoginInput:
 *       type: object
 *       required: [email, password]
 *       properties:
 *         email: { type: string, format: email, example: "test@example.com" }
 *         password: { type: string, format: password, example: "Password123" }
 */

export default authRouter;
