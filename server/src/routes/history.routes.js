import express from 'express';
import verifyToken from '../middlewares/auth.js';
import {
  createHistoryEntry,
  getAllHistory,
  getHistoryByYear,
  deleteHistoryEntry,
} from '../controllers/history.controller.js';

const router = express.Router();

// 🔓 Public - View all history
router.get('/', getAllHistory);

// 🔓 Public - View history by year
router.get('/:year', getHistoryByYear);

// 🔐 Protected - Admin only
router.post('/', verifyToken, createHistoryEntry);
router.delete('/:id', verifyToken, deleteHistoryEntry);

export { router as historyRouter };
