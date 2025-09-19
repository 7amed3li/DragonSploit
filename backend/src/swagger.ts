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
    // (1 ) التصحيح الأهم: تعريف مخطط الأمان
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      // تعريف المخططات هنا لتكون مركزية
      schemas: {
        Organization: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            slug: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          }
        },
        User: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            email: { type: 'string', format: 'email' },
            name: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          }
        },
        RegisterInput: {
          type: 'object',
          required: ['email', 'name', 'password'],
          properties: {
            email: { type: 'string', format: 'email' },
            name: { type: 'string' },
            password: { type: 'string', format: 'password' },
          }
        },
        LoginInput: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', format: 'password' },
          }
        }
      }
    },
    // (2 ) جعل هذا المخطط هو الافتراضي لجميع نقاط النهاية التي تحتاجه
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // (3) التصحيح: جعل المسار أكثر تحديدًا
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
