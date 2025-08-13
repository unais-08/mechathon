import express from 'express';
import verifyToken from '../middlewares/auth.js';
import {
  createBlog,
  updateBlog,
  deleteBlog,
  fetchAllBlogs,
  fetchBlogById,
} from '../controllers/blog.controller.js';

const router = express.Router();

// 🔓 PUBLIC ROUTES

// Get all blogs or create a new blog (GET: public, POST: protected)
router
  .route('/')
  .get(fetchAllBlogs) // GET /api/blogs
  .post(verifyToken, createBlog); // POST /api/blogs

// Get, update, or delete a blog by ID
router
  .route('/:id')
  .get(fetchBlogById) // GET /api/blogs/:id
  .put(verifyToken, updateBlog) // PUT /api/blogs/:id
  .delete(verifyToken, deleteBlog); // DELETE /api/blogs/:id

export { router as blogRouter };

/**
 * ==========================
 * 📝 FUTURE IMPROVEMENTS
 * ==========================
 * - Add cover image upload via multer or cloud storage
 * - Add published/unpublished toggle
 * - Add pagination or search on GET
 */
