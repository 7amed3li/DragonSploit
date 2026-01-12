import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DragonSploit API',
      version: '1.0.0',
      description: 
        'The official REST API for the DragonSploit Platform, an intelligent and context-aware vulnerability scanning solution. ' +
        'This API allows for the management of users, organizations, targets, and scans.',
      contact: {
        name: 'Hamed Mohammed Abdulaleem Kamel',
        email: 'hly804541@gmail.com', // يمكنك تغييره
      },
    },
    // ✅ الإصلاح الحاسم: تم حذف /api من هنا
    servers: [
      {
        url: `http://localhost:3001`, 
        description: 'Development Server'
      },
    ],
    // ✨ إضافة: وصف للوسوم لتنظيم الواجهة
    tags: [
        {
            name: 'Auth',
            description: 'Endpoints for user authentication (register, login, logout, refresh token ).'
        },
        {
            name: 'Organizations',
            description: 'Endpoints for managing user organizations.'
        },
        {
            name: 'Targets',
            description: 'Endpoints for managing scan targets (URLs).'
        },
        {
            name: 'Scans',
            description: 'Endpoints for initiating and managing security scans.'
        }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token',
        },
      },
      schemas: {
        // ========================================
        // --- Input Models ---
        // ========================================
        RegisterInput: {
          type: 'object',
          required: ['email', 'name', 'password'],
          properties: {
            email: { type: 'string', format: 'email', example: 'user@example.com' },
            name: { type: 'string', example: 'John Doe' },
            password: { type: 'string', format: 'password', example: 'your-secure-password' },
          },
        },
        LoginInput: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email', example: 'user@example.com' },
            password: { type: 'string', format: 'password', example: 'your-secure-password' },
          },
        },
        CreateTargetInput: {
            type: 'object',
            required: ['name', 'url', 'organizationId'],
            properties: {
                name: { type: 'string', example: 'My Production API' },
                url: { type: 'string', format: 'url', example: 'https://api.example.com' },
                organizationId: { type: 'string', format: 'uuid', example: 'clq1...'}
            }
        },
        CreateScanInput: {
          type: 'object',
          required: ['targetId'],
          properties: {
            targetId: { type: 'string', description: 'ID of the target to be scanned.' },
            configurationId: { type: 'string', description: 'ID of the scan configuration to use (optional ).' },
          },
        },

        // ========================================
        // --- Data Models ---
        // ========================================
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
        Target: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            url: { type: 'string', format: 'url' },
            organizationId: { type: 'string', format: 'uuid' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Scan: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            status: { type: 'string', enum: ['PENDING', 'QUEUED', 'RUNNING', 'COMPLETED', 'FAILED', 'CANCELED'] },
            targetId: { type: 'string' },
            organizationId: { type: 'string' },
            configurationId: { type: 'string', nullable: true },
            startedAt: { type: 'string', format: 'date-time', nullable: true },
            completedAt: { type: 'string', format: 'date-time', nullable: true },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        
        // ========================================
        // --- Error Models (✨ إضافة جديدة) ---
        // ========================================
        Error400: {
            type: 'object',
            properties: { message: { type: 'string', example: 'Invalid request body' } }
        },
        Error401: {
            type: 'object',
            properties: { message: { type: 'string', example: 'Authentication failed' } }
        },
        Error403: {
            type: 'object',
            properties: { message: { type: 'string', example: 'You do not have permission to perform this action' } }
        },
        Error404: {
            type: 'object',
            properties: { message: { type: 'string', example: 'Resource not found' } }
        },
        Error409: {
            type: 'object',
            properties: { message: { type: 'string', example: 'Conflict: Resource already exists' } }
        },
        Error500: {
            type: 'object',
            properties: { message: { type: 'string', example: 'Internal Server Error' } }
        }
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/**/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  console.log(`📚 Swagger UI is available at http://localhost:3001/api-docs` );
}