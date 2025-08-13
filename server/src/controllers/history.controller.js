import pool from '../config/db.js';
import { successResponse, errorResponse } from '../utils/response.js';

// 📌 Create a new history record
export const createHistoryEntry = async (req, res) => {
  try {
    const { year, title, team_name, position, project_title, description } = req.body;

    const parsedPosition = position ? parseInt(position) : null;

    const result = await pool.query(
      `INSERT INTO hackathon_history (year, title, team_name, position, project_title, description)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [parseInt(year), title, team_name, parsedPosition, project_title, description]
    );

    successResponse(res, 'Hackathon history entry created', result.rows[0], 201);
  } catch (err) {
    errorResponse(res, 'Failed to create hackathon history entry', 500, err);
  }
};

// 📌 Get all history entries
export const getAllHistory = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM hackathon_history ORDER BY year DESC, position ASC`
    );

    successResponse(res, 'All hackathon history entries', result.rows, 200);
  } catch (err) {
    console.error(err);
    errorResponse(res, 'Server error fetching history', 500);
  }
};

// 📌 Get history by year
export const getHistoryByYear = async (req, res) => {
  const { year } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM hackathon_history WHERE year = $1 ORDER BY position ASC`,
      [year]
    );

    if (result.rows.length === 0) {
      return errorResponse(res, `No history found for ${year}`, 404);
    }

    successResponse(res, `Hackathon history for year ${year}`, result.rows, 200);
  } catch (err) {
    console.error(err);
    errorResponse(res, 'Server error fetching history by year', 500);
  }
};

// 📌 Delete history by ID
export const deleteHistoryEntry = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(`DELETE FROM hackathon_history WHERE id = $1 RETURNING *`, [
      id,
    ]);

    if (result.rowCount === 0) {
      return errorResponse(res, 'History entry not found', 404);
    }

    successResponse(res, 'History entry deleted', result.rows[0], 200);
  } catch (err) {
    console.error(err);
    errorResponse(res, 'Server error deleting history', 500);
  }
};
