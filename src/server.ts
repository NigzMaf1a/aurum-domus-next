import express, { Request, Response} from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

import authRoutes from './server/routes/authRoutes.ts';
import bioRoutes from './server/routes/bioRoutes.ts';
import faqsRoutes from './server/routes/faqsRoutes.ts';
import financeRoutes from './server/routes/financeRoutes';
import feedbackRoutes from './server/routes/feedbackRoutes.ts';
import paymentRoutes from './server/routes/paymentRoutes.ts';
import reservationRoutes from './server/routes/reservationRoutes.ts';
import rollcallRoutes from './server/routes/rollcallRoutes.ts';
import salaryRoutes from './server/routes/salaryRoutes.ts';
import stockRoutes from './server/routes/stockRoutes.ts';
import tableRoutes from './server/routes/tableRoutes.ts';
import unitRoutes from './server/routes/unitRoutes.ts';

import authMiddleware from './server/middleware/auth.ts';
import errorHandler from './server/middleware/errorHandler.ts';

const app = express();
const PORT: number = Number(process.env.PORT) || 3000;

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*' }));
app.use(compression());
app.use(express.json());
app.use(morgan('combined'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bio', authMiddleware, bioRoutes);
app.use('/api/faqs', authMiddleware, faqsRoutes);
app.use('/api/finance', authMiddleware, financeRoutes);
app.use('/api/feedback', authMiddleware, feedbackRoutes);
app.use('/api/payment', authMiddleware, paymentRoutes);
app.use('/api/reservation', authMiddleware, reservationRoutes);
app.use('/api/rollcall', authMiddleware, rollcallRoutes);
app.use('/api/salary', authMiddleware, salaryRoutes);
app.use('/api/stock', authMiddleware, stockRoutes);
app.use('/api/table', authMiddleware, tableRoutes);
app.use('/api/unit', authMiddleware, unitRoutes);

// Health check
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Aurum Domus API is up 🌟' });
});

// 404 handler
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});


// Global error handler
app.use(errorHandler);

// Server start
app.listen(PORT, () => {
  console.log(`✅ Aurum Domus backend running at http://localhost:${PORT}`);
});
