/**
 * Central application error type. All predictable failures (validation,
 * not-found, conflict, auth) should throw an AppError so the error-handling
 * middleware can respond consistently.
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly details?: unknown;
  public readonly isOperational = true;

  constructor(statusCode: number, code: string, message: string, details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message: string, details?: unknown) {
    return new AppError(400, "BAD_REQUEST", message, details);
  }
  static unauthorized(message = "Authentication required") {
    return new AppError(401, "UNAUTHORIZED", message);
  }
  static forbidden(message = "You do not have permission to perform this action") {
    return new AppError(403, "FORBIDDEN", message);
  }
  static notFound(message = "Resource not found") {
    return new AppError(404, "NOT_FOUND", message);
  }
  static conflict(message: string, details?: unknown) {
    return new AppError(409, "CONFLICT", message, details);
  }
  static unprocessable(message: string, details?: unknown) {
    return new AppError(422, "UNPROCESSABLE_ENTITY", message, details);
  }
  static tooManyRequests(message = "Too many requests, please slow down") {
    return new AppError(429, "TOO_MANY_REQUESTS", message);
  }
  static internal(message = "Something went wrong on our end") {
    return new AppError(500, "INTERNAL_ERROR", message);
  }
}
