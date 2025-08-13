import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

import pool from '../config/db.js';
import { hashPassword, comparePassword } from '../utils/hash.js';
import { successResponse, errorResponse } from '../utils/response.js';

/**
 * @desc Register a new admin
 * @route POST /api/admin/register
 */
export const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return errorResponse(res, 'Name, email, and password are required', 400);
  }

  try {
    const hashedPassword = await hashPassword(password);

    const result = await pool.query(
      `INSERT INTO admins (name, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, name, email`,
      [name, email, hashedPassword]
    );

    return successResponse(res, 'Admin registered successfully', result.rows[0], 201);
  } catch (err) {
    return errorResponse(res, 'Registration failed', 500, err.message);
  }
};

/**
 * @desc Login admin and return JWT token
 * @route POST /api/admin/login
 */
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return errorResponse(res, 'Email and password are required', 400);
  }

  try {
    const result = await pool.query('SELECT * FROM admins WHERE email = $1', [email]);
    const admin = result.rows[0];

    if (!admin) {
      return errorResponse(res, 'Admin not found', 404);
    }

    const isMatch = await comparePassword(password, admin.password_hash);
    if (!isMatch) {
      return errorResponse(res, 'Incorrect password', 401);
    }

    const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });

    return successResponse(res, 'Login successful', {
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (err) {
    return errorResponse(res, 'Login failed', 500, err.message);
  }
};

/**
 * @desc Get all registered admins
 * @route GET /api/admin/dashboard
 */
export const fetchAllAdmins = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, email FROM admins');
    return successResponse(res, 'Admins fetched successfully', result.rows, 200);
  } catch (err) {
    return errorResponse(res, 'Failed to fetch admins', 500, err.message);
  }
};

/**
 * @desc Get a single admin by ID
 * @route GET /api/admin/:id
 */
export const fetchAdminById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT id, name, email FROM admins WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return errorResponse(res, 'Admin not found', 404);
    }

    return successResponse(res, 'Admin fetched successfully', result.rows[0], 200);
  } catch (err) {
    return errorResponse(res, 'Failed to fetch admin', 500, err.message);
  }
};

/**
 * @desc Delete logged-in admin (self-delete)
 * @route DELETE /api/admin/delete-admin
 */
export const deleteLoggedInAdmin = async (req, res) => {
  const adminId = req.admin.id;

  try {
    const result = await pool.query('DELETE FROM admins WHERE id = $1 RETURNING *', [adminId]);

    if (result.rowCount === 0) {
      return errorResponse(res, 'Admin not found', 404);
    }

    return successResponse(res, 'Admin account deleted', result.rows[0]);
  } catch (err) {
    return errorResponse(res, 'Failed to delete admin', 500, err.message);
  }
};

/**
 * @desc Delete any admin by ID (super-admin only feature)
 * @route DELETE /api/admin/:id
 */
export const deleteAdminById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM admins WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return errorResponse(res, 'Admin not found', 404);
    }

    return successResponse(res, 'Admin deleted successfully', result.rows[0]);
  } catch (err) {
    return errorResponse(res, 'Failed to delete admin', 500, err.message);
  }
};
