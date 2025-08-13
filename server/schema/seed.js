import pool from '../src/config/db.js';
import { hashPassword } from '../src/utils/hash.js';

async function seed() {
  try {
    console.log('🌱 Starting seed...');

    // Ensure pgcrypto is enabled for UUID generation
    await pool.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);

    // 1. Insert Admins
    const hashedPassword1 = await hashPassword('hashedpassword123');
    const hashedPassword2 = await hashPassword('hashedpassword456');
    const adminResult = await pool.query(
      `INSERT INTO admins (name, email, password_hash)
       VALUES 
        ('Shaikh Unais', 'unais@example.com', $1),
        ('Jane Doe', 'jane@example.com', $2)
       RETURNING id;`,
      [hashedPassword1, hashedPassword2]
    );
    const adminId = adminResult.rows[0].id;

    // 2. Insert Blogs
    await pool.query(
      `INSERT INTO blogs (title, content, cover_image, published, author_id)
       VALUES 
        (
          'Welcome to the Hackathon!',
          'This blog introduces our event and what participants can expect.',
          'cover1.jpg',
          TRUE,
          $1
        ),
        (
          'Behind the Scenes',
          'A look into how the organizing team prepared for this event.',
          'cover2.jpg',
          FALSE,
          $1
        )
      ;`,
      [adminId]
    );

    // 3. Insert Sponsor Requests
    await pool.query(
      `INSERT INTO sponsor_requests (name, company_name, email, phone, message, status)
       VALUES 
        ('Amit Singh', 'TechMotive Inc.', 'amit@example.com', '9876543210', 'Happy to sponsor.', 'approved'),
        ('Priya Sharma', 'MechaX Solutions', 'priya@example.com', '9123456780', 'Interested in partnership.', 'pending'),
        ('John Carter', 'AutoDrive Ltd.', 'john@example.com', '9000000000', 'Let’s collaborate.', 'rejected')
      ;`
    );

    console.log('✅ Seeding completed successfully!');
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
  } finally {
    await pool.end();
  }
}

seed();
