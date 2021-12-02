import { Router } from 'express';
import UserRouter from './Users';
import TransactionsRouter from './Transactions';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);
router.use('/transactions', TransactionsRouter);

// Export the base-router
export default router;
