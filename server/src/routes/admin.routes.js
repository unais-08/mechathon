import express from 'express';
import {
  registerAdmin,
  loginAdmin,
  fetchAllAdmins,
  fetchAdminById,
  deleteAdminById,
  deleteLoggedInAdmin,
} from '../controllers/admin.controller.js';
import verifyToken from '../middlewares/auth.js';
import { loginRateLimiter } from '../middlewares/rateLimiter.js';

const router = express.Router();

// 🔓 Public Routes

router.post('/register', registerAdmin);
router.post('/login', loginRateLimiter, loginAdmin);

// 🔐 Protected Routes (require valid JWT)

// /api/admins/ → GET all admins
router.route('/').get(verifyToken, fetchAllAdmins);

// /api/admins/me → DELETE current authenticated admin
router.route('/me').delete(verifyToken, deleteLoggedInAdmin);

// /api/admins/:id → GET admin by ID or DELETE admin by ID
router
  .route('/:id')
  .get(verifyToken, fetchAdminById) // GET /api/admins/:id
  .delete(verifyToken, deleteAdminById); // DELETE /api/admins/:id

export { router as adminRouter };

/**
 * ==========================
 * 📝 Future Improvements
 * ==========================
 * - Rate limit login route
 * - Password reset flow
 * - Super-admin role for elevated permissions
 */
