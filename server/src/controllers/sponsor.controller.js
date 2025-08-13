import pool from '../config/db.js';
import { successResponse, errorResponse } from '../utils/response.js';

// Create a new sponsor request (Public)
// @route   POST /api/sponsors/
export const createSponsorRequest = async (req, res) => {
  const { name, company_name, email, phone, message } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO sponsor_requests (name, company_name, email, phone, message)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, company_name, email, phone, message]
    );
    return successResponse(res, 'Sponsor request submitted', result.rows[0], 201);
  } catch (err) {
    return errorResponse(res, 'Submission failed', 500, err.message);
  }
};

// Fetch all sponsor requests (Admin only)
// @route   GET /api/sponsors/
export const fetchAllSponsorRequests = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM sponsor_requests ORDER BY submitted_at DESC');
    return successResponse(res, 'Sponsor requests fetched', result.rows);
  } catch (err) {
    return errorResponse(res, 'Error fetching requests', 500, err.message);
  }
};

// Update status of a sponsor request (approved or rejected) (Admin only)
// @route   PUT /api/sponsors/:id/status
export const updateSponsorRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['approved', 'rejected'].includes(status)) {
    return errorResponse(res, 'Status must be either "approved" or "rejected"', 400);
  }

  try {
    const result = await pool.query(
      `UPDATE sponsor_requests SET status = $1 WHERE id = $2 RETURNING *`,
      [status, id]
    );

    if (result.rowCount === 0) {
      return errorResponse(res, 'Request not found', 404);
    }

    return successResponse(res, 'Sponsor request status updated', result.rows[0]);
  } catch (err) {
    return errorResponse(res, 'Failed to update status', 500, err.message);
  }
};

// Fetch only approved sponsors (Public)
// @route   GET /api/sponsors/approved
export const fetchApprovedSponsors = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM sponsor_requests WHERE status = 'approved' ORDER BY submitted_at DESC"
    );
    return successResponse(res, 'Approved sponsors fetched', result.rows, 200);
  } catch (err) {
    return errorResponse(res, 'Error fetching approved sponsors', 500, err.message);
  }
};
