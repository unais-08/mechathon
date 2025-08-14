import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import { healthCheckRouter } from './routes/test.routes.js';
import { adminRouter } from './routes/admin.routes.js';
import { blogRouter } from './routes/blog.routes.js';
import { sponsorRouter } from './routes/sponsor.routes.js';
import { historyRouter } from './routes/history.routes.js';

const app = express();
const PORT = process.env.PORT || 8080;

// -------------------- MIDDLEWARE -------------------- //

// Parse incoming JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173', // Allow requests from the client URL
    credentials: true, // Allow cookies to be sent with requests
  })
);

// -------------------- ROUTES -------------------- //

// Health-check/test route
app.use('/', healthCheckRouter);

// Admin-related API routes
app.use('/api/admin', adminRouter);

// Blog routes
app.use('/api/blogs', blogRouter);

// Sponsor routes
app.use('/api/sponsors', sponsorRouter);

// History routes
app.use('/api/history', historyRouter);
// -------------------- SERVER START -------------------- //

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
