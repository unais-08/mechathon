import pool from '../config/db.js';
import { successResponse, errorResponse } from '../utils/response.js';

// Create a new blog post (Admin only)
// @route   POST /api/blogs/
export const createBlog = async (req, res) => {
  const { title, content, cover_image, published } = req.body;
  const author_id = req.admin.id; // Extracted from JWT

  try {
    const result = await pool.query(
      `INSERT INTO blogs (title, content, cover_image, published, author_id)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [title, content, cover_image, published, author_id]
    );
    return successResponse(res, 'Blog created', result.rows[0], 201);
  } catch (err) {
    return errorResponse(res, 'Failed to create blog', 500, err.message);
  }
};

// Get all blog posts (Public)
// @route   GET /api/blogs/
export const fetchAllBlogs = async (req, res) => {
  try {
    // const result = await pool.query('SELECT * FROM blogs ORDER BY created_at DESC');
    const result = await pool.query(`
      SELECT 
        blogs.id,
        blogs.title,
        blogs.content,
        blogs.created_at,
        admins.name AS author
      FROM blogs
      JOIN admins ON blogs.author_id = admins.id
      ORDER BY blogs.created_at DESC
    `);
    console.log(result.rows)
    return successResponse(res, 'Blogs fetched', result.rows);
  } catch (err) {
    return errorResponse(res, 'Failed to fetch blogs', 500, err.message);
  }
};

// Get a single blog by ID (Public)
// @route   GET /api/blogs/:id
export const fetchBlogById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM blogs WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return errorResponse(res, 'Blog not found', 404);
    }

    return successResponse(res, 'Blog fetched', result.rows[0]);
  } catch (err) {
    return errorResponse(res, 'Error fetching blog', 500, err.message);
  }
};

// Update blog by ID (Admin only)
// @route   PUT /api/blogs/:id
export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content, cover_image, published } = req.body;

  try {
    const result = await pool.query(
      `UPDATE blogs
       SET title = $1, content = $2, cover_image = $3, published = $4, updated_at = CURRENT_TIMESTAMP
       WHERE id = $5 RETURNING *`,
      [title, content, cover_image, published, id]
    );

    if (result.rowCount === 0) {
      return errorResponse(res, 'Blog not found', 404);
    }

    return successResponse(res, 'Blog updated', result.rows[0]);
  } catch (err) {
    return errorResponse(res, 'Error updating blog', 500, err.message);
  }
};

// Delete blog by ID (Admin only)
// @route   DELETE /api/blogs/:id
export const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM blogs WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return errorResponse(res, 'Blog not found', 404);
    }

    return successResponse(res, 'Blog deleted', result.rows[0]);
  } catch (err) {
    return errorResponse(res, 'Error deleting blog', 500, err.message);
  }
};
