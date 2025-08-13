-- admins
CREATE TABLE admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- blogs
CREATE TABLE blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  published BOOLEAN DEFAULT FALSE,
  author_id UUID REFERENCES admins(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- sponsor_requests
CREATE TABLE sponsor_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  company_name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending',
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE hackathon_history (
  id SERIAL PRIMARY KEY,
  year INT NOT NULL,
  title TEXT NOT NULL,
  team_name TEXT NOT NULL,
  position INT DEFAULT NULL,  -- 1 = First, 2 = Second, NULL = Not ranked
  project_title TEXT,
  description TEXT,       -- Optional: Summary or theme of the hackathon
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
