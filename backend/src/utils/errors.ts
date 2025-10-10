// Base class for all custom application errors
export class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype); // Preserve stack trace
  }
}

// --- Specific HTTP Error Classes ---

export class NotFoundError extends AppError {
  constructor(message: string = 'Kaynak bulunamadı.') { // Resource not found
    super(message, 404);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Bu işlemi yapma yetkiniz yok.') { // You do not have permission to perform this action
    super(message, 403);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string = 'Geçersiz istek.') { // Bad request
    super(message, 400);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Kimlik doğrulama başarısız oldu.') { // Authentication failed
    super(message, 401);
  }
}

// **الإضافة الجديدة 1:** خطأ التعارض (Conflict)
export class ConflictError extends AppError {
  constructor(message: string = 'Kaynak çakışması.') { // Resource conflict
    super(message, 409);
  }
}

// **الإضافة الجديدة 2:** خطأ الخادم الداخلي
export class InternalServerError extends AppError {
  constructor(message: string = 'Sunucuda bir hata oluştu.') { // Internal server error
    super(message, 500);
  }
}

// --- Helper function to check for Prisma errors ---
/**
 * Checks if an error is a PrismaClientKnownRequestError with a 'code' property.
 * @param error The error to check (of type unknown).
 * @returns True if it's a Prisma error with a code.
 */
export function isPrismaError(error: unknown): error is { code: string; meta?: unknown } {
  return typeof error === 'object' && error !== null && 'code' in error;
}
