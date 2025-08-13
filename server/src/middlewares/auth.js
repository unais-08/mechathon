import jwt from 'jsonwebtoken';
import { errorResponse } from '../utils/response.js';

function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return errorResponse(res, 'No token provided', 401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch {
    return errorResponse(res, 'Invalid or expired token', 403);
  }
}

export default verifyToken;
