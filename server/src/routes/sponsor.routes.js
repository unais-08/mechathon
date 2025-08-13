import express from 'express';
import verifyToken from '../middlewares/auth.js';
import {
  createSponsorRequest,
  fetchAllSponsorRequests,
  fetchApprovedSponsors,
  updateSponsorRequestStatus,
} from '../controllers/sponsor.controller.js';

const router = express.Router();

// 🔓 PUBLIC ROUTE — Submit sponsor request
router.post('/submit', createSponsorRequest); // POST /api/sponsors/submit

// 🔐 ADMIN ROUTES

// View all sponsor requests
// GET /api/sponsors/requests
router.get('/requests', verifyToken, fetchAllSponsorRequests);

// View only approved sponsors
// GET /api/sponsors/requests/approved
router.get('/requests/approved', verifyToken, fetchApprovedSponsors);

// Update sponsor request status (approve/reject)
// PUT /api/sponsors/requests/:id/status
router.put('/requests/:id/status', verifyToken, updateSponsorRequestStatus);

export { router as sponsorRouter };
/**
 * ==========================
 * 📝 Future Improvements
 * ==========================
 * - Add pagination for sponsor requests
 * - Add search/filter functionality for requests
 */
