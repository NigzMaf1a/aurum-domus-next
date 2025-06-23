// routes/authRoutes.ts
import { Router } from 'express'
import { login } from '../controllers/authController'

const router = Router()

router.post('/login', login)

export default router

// This code defines the authentication routes for the Aurum Domus server.
// It uses Express.js to create a router that handles POST requests to the `/login` endpoint.
// The `login` function from the `authController` is called when a request is made to this endpoint.
// This setup allows for modular organization of routes, keeping the authentication logic separate from other parts of the application.
// The router can be imported in the main server file and used with the Express app,
// enabling the application to handle authentication requests.
// This modular approach promotes better organization and maintainability of the codebase,
// allowing for easy addition of more authentication-related routes in the future.
// The `/login` endpoint is typically used for user authentication,
// where users provide their credentials (like username and password) to obtain a JWT token.
// This token can then be used for subsequent requests to access protected resources.
// The router can be extended to include other authentication-related routes,
// such as registration, password reset, and token refresh, as needed.
// The use of a separate router for authentication routes helps keep the codebase clean and organized,
// making it easier to manage and scale the application.