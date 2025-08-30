import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(process.cwd(), '.env') }); 

import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';


import authRoutes from './server/routes/authRoutes';
import bioRoutes from './server/routes/bioRoutes';
import faqsRoutes from './server/routes/faqsRoutes';
import financeRoutes from './server/routes/financeRoutes';
import feedbackRoutes from './server/routes/feedbackRoutes';
import paymentRoutes from './server/routes/paymentRoutes';
import reservationRoutes from './server/routes/reservationRoutes';
import rollcallRoutes from './server/routes/rollcallRoutes';
import salaryRoutes from './server/routes/salaryRoutes';
import stock from './server/routes/stockRoutes';
import tableRoutes from './server/routes/tableRoutes';
import unitRoutes from './server/routes/unitRoutes';
import unitPublicRoutes from './server/routes/unitPublicRoutes';
import userRoutes from './server/routes/userRoutes';
import userPublicRoutes from './server/routes/userPublicRoutes';
import orderRoutes from './server/routes/orderRoutes';
import dishRoutes from './server/routes/dishRoutes';
import accountantRoutes from './server/routes/accountantRoutes';
import adminRoutes from './server/routes/adminRoutes';
import chefRoutes from './server/routes/chefRoutes';
import customerRoutes from './server/routes/customerRoutes';
import managerRoutes from './server/routes/managerRoutes';
import ownerRoutes from './server/routes/ownerRoutes';
import supplierRoutes from './server/routes/supplierRoutes';
import hotelPublicRoutes from './server/routes/hotelPublicRoutes';
import hotelRoutes from './server/routes/hotelRoutes'

import authMiddleware from './server/middleware/auth';
import errorHandler from './server/middleware/errorHandler';

const app = express();
const PORT: number = Number(process.env.PORT) || 5000;

// Middleware
app.use(helmet());

// Stricter CORS - whitelist your frontend URL or fallback to localhost
const allowedOrigins = process.env.CLIENT_ORIGIN
  ? [process.env.CLIENT_ORIGIN]
  : ['http://localhost:3000','http://localhost:5000'];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.options('',cors());


app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use dev-friendly logging locally, combined in production
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Routes
app.use('/api/customer/public', customerRoutes);
app.use('/api/user/public/', userPublicRoutes);
app.use('/api/hotel/public', hotelPublicRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/bio', authMiddleware, bioRoutes);
app.use('/api/faqs', authMiddleware, faqsRoutes);
app.use('/api/finance', authMiddleware, financeRoutes);
app.use('/api/feedback', authMiddleware, feedbackRoutes);
app.use('/api/payment', authMiddleware, paymentRoutes);
app.use('/api/reservation', authMiddleware, reservationRoutes);
app.use('/api/rollcall', authMiddleware, rollcallRoutes);
app.use('/api/salary', authMiddleware, salaryRoutes);
app.use('/api/stock', authMiddleware, stock);
app.use('/api/table', authMiddleware, tableRoutes);
app.use('/api/unit/public', unitPublicRoutes);
app.use('/api/unit', authMiddleware, unitRoutes);
app.use('/api/user', authMiddleware, userRoutes);
app.use('/api/order', authMiddleware, orderRoutes);
app.use('/api/dishes', authMiddleware, dishRoutes);
app.use('/api/accountant', authMiddleware, accountantRoutes);
app.use('/api/admin/public', adminRoutes);
app.use('/api/chef', authMiddleware, chefRoutes);
app.use('/api/customer', authMiddleware, customerRoutes);
app.use('/api/manager', authMiddleware, managerRoutes);
app.use('/api/owner', authMiddleware, ownerRoutes);
app.use('/api/supplier', authMiddleware, supplierRoutes);
app.use('/api/hotel', authMiddleware, hotelRoutes);

// Health check
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Aurum Domus API is up 🌟' });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use(errorHandler);

// Server start
const server = app.listen(PORT, () => {
  console.log(`Aurum Domus backend running at http://localhost:${PORT}`);
});

// Graceful shutdown
async function gracefulShutdown() {
  console.log('💀 Graceful shutdown initiated');
  server.close(() => {
    console.log('HTTP server closed');
    // If you have a DB pool, close it here (example):
    // await dbPool.end();
    process.exit(0);
  });
}

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
