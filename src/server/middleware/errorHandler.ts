// errorHandler.js
import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  status?: number;
}

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  void next; // to avoid unused variable lint error

  const status = err.status || 500;
  const errorMessages: Record<number, string> = {
    400: 'Bad request',
    401: 'Unauthorized access',
    403: 'Forbidden access',
    404: 'Resource not found',
    422: 'Unprocessable entity',
    429: 'Too many requests',
    500: 'Internal server error',
  };

  // Log the full error (can customize logging for production)
  console.error('[ERROR]', err);

  // Use custom message from map, or fallback to error.message, or default generic
  const message = errorMessages[status] || err.message || 'Internal Server Error';

  res.status(status).json({ error: message });
};

export default errorHandler;


// This middleware function handles errors in the Express application.
// It logs the error to the console and sends a generic 500 response to the client.
// This is useful for catching unexpected errors that occur during request processing.
// It can be extended to handle different types of errors more gracefully,
// such as validation errors or database errors, by checking the error type and responding accordingly.
// The middleware should be added after all route handlers to catch any errors that occur during request processing.
// It ensures that the server does not crash due to unhandled exceptions,
// providing a consistent error response format for the client.
// This is particularly important in production environments,
// where unhandled errors can lead to poor user experience and application instability.
// The error handler can be imported and used in the main server file,
// ensuring that all errors are caught and handled uniformly across the application.
// It can also be extended to log errors to an external service for better monitoring and alerting.
// This modular approach keeps the error handling logic separate from the application logic,
// promoting better organization and maintainability of the codebase.
// The error handler can also be tested independently,
// ensuring that it behaves correctly under various scenarios, such as different error types and statuses.
// This code is a foundational part of the Aurum Domus server,