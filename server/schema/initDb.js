import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pool from '../src/config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sql = readFileSync(join(__dirname, 'schema.sql')).toString();
// console.log(sql);
pool
  .query(sql)
  .then(() => {
    console.log('✅ Database schema created successfully.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Error running schema:', err);
    process.exit(1);
  });
