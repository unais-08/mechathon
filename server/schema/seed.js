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
    const hashedPassword3 = await hashPassword('hashedpassword789');
    const adminResult = await pool.query(
      `INSERT INTO admins (name, email, password_hash)
       VALUES 
        ('Mike Wheeler', 'mike@example.com', $1),
        ('Jane Doe', 'jane@example.com', $2),
        ('Nancy Wheeler', 'nancy@example.com', $3)
       RETURNING id;`,
      [hashedPassword1, hashedPassword2, hashedPassword3]
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

    // 4. Insert Hackathon History
    await pool.query(
      `INSERT INTO hackathon_history (year, title, team_name, position, project_title, description)
       VALUES 
        (2023, 'Hackathon 2023', 'Team Innovators', 1, 'Smart City Solutions', 'Developed a smart city management system.'),
        (2022, 'Hackathon 2022', 'Team Visionaries', 2, 'AI for Healthcare', 'Created an AI tool for patient diagnosis.')
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
