import express from 'express';

const router = express.Router();

// Test routes
router.get('/', (req, res) => {
  res.send('server is running');
});
export { router as healthCheckRouter };
