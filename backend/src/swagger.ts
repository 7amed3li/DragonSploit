import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DragonSploit API',
      version: '1.0.0',
      description: 'Comprehensive documentation for the DragonSploit REST API.',
    },
    servers: [
      {
        // تأكد من أن هذا الرابط يطابق المنفذ الذي يعمل عليه الخادم
        url: `http://localhost:3001/api`,
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
        // --- Scan Models ---
        // ========================================
        Scan: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Unique scan identifier.' },
            status: { type: 'string', enum: ['PENDING', 'QUEUED', 'RUNNING', 'COMPLETED', 'FAILED', 'CANCELED'], description: 'The current status of the scan.' },
            targetId: { type: 'string', description: 'ID of the associated target.' },
            organizationId: { type: 'string', description: 'ID of the owning organization.' }, // <-- إضافة مهمة
            configurationId: { type: 'string', nullable: true, description: 'ID of the scan configuration used (optional ).' },
            startedAt: { type: 'string', format: 'date-time', nullable: true },
            completedAt: { type: 'string', format: 'date-time', nullable: true },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Vulnerability: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            type: { type: 'string', description: 'Type of vulnerability (e.g., "XSS").' },
            severity: { type: 'string', enum: ['INFO', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] },
            description: { type: 'string' },
            proof: { type: 'string', description: 'Proof of the vulnerability.' },
            isResolved: { type: 'boolean' },
            foundAt: { type: 'string', format: 'date-time' },
          },
        },
        ScanConfiguration: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string', description: 'Name of the configuration template (e.g., "Quick XSS Scan").' },
            isDiscoveryFocused: { type: 'boolean' },
            isAiPowered: { type: 'boolean' },
            organizationId: { type: 'string', description: 'ID of the owning organization.' },
          },
        },
        CreateScanInput: {
          type: 'object',
          required: ['targetId'],
          properties: {
            targetId: { type: 'string', description: 'ID of the target to be scanned.' },
            configurationId: { type: 'string', description: 'ID of the scan configuration to use (optional).' },
          },
        },
        ListScansQuery: {
          type: 'object',
          required: ['organizationId'],
          properties: {
            organizationId: { type: 'string', description: 'ID of the organization to list scans for.' },
          },
        },

        // ========================================
        // --- Existing Models ---
        // ========================================
        Target: {
          type: 'object',
          properties: {
            id: { type: 'string', description: "The target's unique identifier." },
            name: { type: 'string', description: "The target's name." },
            url: { type: 'string', format: 'url', description: "The URL to be scanned." },
            organizationId: { type: 'string', format: 'uuid', description: "ID of the owning organization." },
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
  // --- بداية التعديل ---
  // هذا المسار يضمن أن swagger يقرأ جميع ملفات .ts داخل مجلد routes
  apis: ['./src/routes/**/*.ts'],
  // --- نهاية التعديل ---
};

const swaggerSpec = swaggerJSDoc(options);

// تم تغيير اسم الدالة ليكون بالإنجليزية
export function setupSwagger(app: Express) {
  // المسار الذي ستظهر فيه واجهة المستخدم
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  
  // المسار الذي يوفر ملف JSON الخام للمواصفات
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log(`📚 Swagger UI is available at /api-docs`);
}
