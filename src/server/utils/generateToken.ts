import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string | number;
  role: string;
}

function generateToken(user: UserPayload): string {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
}

export default generateToken;

// This function generates a JWT token for a user.
// It uses the user's ID and role as payload, signing it with a secret key from environment variables.
// The token expires in 1 hour, which is a common practice for security.
// The generated token can be used for authenticating API requests, ensuring that only authorized users can access protected routes.
// The use of JWT allows for stateless authentication, meaning the server does not need to store session data.
// This is particularly useful in microservices architectures or when scaling applications,
// as it reduces the need for shared session storage.   