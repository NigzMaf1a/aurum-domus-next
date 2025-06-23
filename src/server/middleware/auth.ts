import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: number;
  role: string;
}

interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'No token, access denied' });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('Missing JWT secret');

    const decoded = jwt.verify(token, secret) as JwtPayload;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid token', detail: (err as Error).message });
  }
}

export default authMiddleware;




// This middleware checks for a JWT token in the Authorization header of incoming requests.
// If a token is present, it verifies the token using a secret key from environment variables.
// If the token is valid, it decodes the token and attaches the user information to the request object.
// If the token is missing or invalid, it responds with an appropriate error message.
// This allows subsequent route handlers to access the authenticated user's information.
// The middleware is essential for protecting routes that require authentication,
// ensuring that only users with valid tokens can access certain resources or perform actions.
// It can be applied to specific routes or globally in the Express app,
// depending on the application's security requirements.
// The use of JWT allows for stateless authentication, meaning the server does not need to maintain session state.
// This is particularly useful in microservices architectures or when scaling applications,
// as it reduces the need for shared session storage.
// The middleware can be imported and used in the main server file or in specific route files,
// providing flexibility in how authentication is handled across the application.
// The middleware can be extended to include role-based access control,
// allowing different levels of access based on user roles defined in the JWT payload.
// This modular approach keeps the authentication logic separate from the application logic,
// promoting better organization and maintainability of the codebase.
// The middleware can also be tested independently,
// ensuring that it behaves correctly under various scenarios, such as valid tokens, expired tokens, and missing tokens.
// This code is a foundational part of the Aurum Domus server,