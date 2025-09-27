import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const secenekler: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DragonSploit API',
      version: '1.0.0',
      description: 'DragonSploit REST API için kapsamlı dokümantasyon',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        // ========================================
        // --- نماذج الفحص (Scan Models ) ---
        // ========================================
        Scan: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Benzersiz tarama kimliği.' },
            status: { type: 'string', enum: ['PENDING', 'QUEUED', 'RUNNING', 'COMPLETED', 'FAILED', 'CANCELED'], description: 'Taramanın mevcut durumu.' },
            targetId: { type: 'string', description: 'İlişkili hedefin kimliği.' },
            configurationId: { type: 'string', nullable: true, description: 'Kullanılan tarama yapılandırmasının kimliği (isteğe bağlı).' },
            startedAt: { type: 'string', format: 'date-time', nullable: true },
            completedAt: { type: 'string', format: 'date-time', nullable: true },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Vulnerability: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            type: { type: 'string', description: 'Zafiyet türü (örn: "XSS").' },
            severity: { type: 'string', enum: ['INFO', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] },
            description: { type: 'string' },
            proof: { type: 'string', description: 'Zafiyetin kanıtı.' },
            isResolved: { type: 'boolean' },
            foundAt: { type: 'string', format: 'date-time' },
          },
        },
        ScanConfiguration: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string', description: 'Yapılandırma şablonunun adı (örn: "Hızlı XSS Taraması").' },
            isDiscoveryFocused: { type: 'boolean' },
            isAiPowered: { type: 'boolean' },
            organizationId: { type: 'string', description: 'Ait olduğu organizasyonun kimliği.' },
          },
        },
        CreateScanInput: {
          type: 'object',
          required: ['targetId'],
          properties: {
            targetId: { type: 'string', description: 'Taranacak hedefin kimliği.' },
            configurationId: { type: 'string', description: 'Kullanılacak tarama yapılandırmasının kimliği (isteğe bağlı).' },
          },
        },
        ListScansQuery: {
          type: 'object',
          required: ['organizationId'],
          properties: {
            organizationId: { type: 'string', description: 'Taramaları listelenecek organizasyonun kimliği.' },
          },
        },

        // ========================================
        // --- النماذج الموجودة مسبقًا ---
        // ========================================
        Target: {
          type: 'object',
          properties: {
            id: { type: 'string', description: "Hedefin benzersiz kimliği." },
            name: { type: 'string', description: "Hedefin adı." },
            url: { type: 'string', format: 'url', description: "Taranacak URL." },
            organizationId: { type: 'string', format: 'uuid', description: "Ait olduğu organizasyonun kimliği." },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Organization: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            slug: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            email: { type: 'string', format: 'email' },
            name: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        RegisterInput: {
          type: 'object',
          required: ['email', 'name', 'password'],
          properties: {
            email: { type: 'string', format: 'email' },
            name: { type: 'string' },
            password: { type: 'string', format: 'password' },
          },
        },
        LoginInput: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', format: 'password' },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // هذا هو المسار الصحيح الذي يقرأ جميع ملفات المسارات
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(secenekler);

function swaggerKurulumu(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  console.log('Swagger UI, /api-docs adresinde mevcut');
}

export default swaggerKurulumu;
