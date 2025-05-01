/*
  # Initial Schema Setup for College Management System

  1. New Tables
    - users
      - id (uuid, primary key)
      - email (text, unique)
      - full_name (text)
      - role (text) - admin, student, teaching_staff, non_teaching_staff
      - department (text)
      - created_at (timestamptz)
      - updated_at (timestamptz)

    - students
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - roll_number (text, unique)
      - year (text)
      - semester (text)
      - admission_date (date)

    - teaching_staff
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - designation (text)
      - joining_date (date)
      - subjects (text[])

    - non_teaching_staff
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - designation (text)
      - department (text)
      - shift (text)
      - joining_date (date)

    - courses
      - id (uuid, primary key)
      - title (text)
      - description (text)
      - department (text)
      - semester (text)
      - created_at (timestamptz)
      - updated_at (timestamptz)

    - course_materials
      - id (uuid, primary key)
      - course_id (uuid, foreign key)
      - title (text)
      - description (text)
      - type (text) - video, document, note
      - url (text)
      - uploaded_by (uuid, foreign key)
      - created_at (timestamptz)

    - events
      - id (uuid, primary key)
      - title (text)
      - description (text)
      - date (date)
      - time (time)
      - venue (text)
      - capacity (integer)
      - organizer (uuid, foreign key)
      - status (text) - upcoming, ongoing, completed
      - created_at (timestamptz)

    - event_registrations
      - id (uuid, primary key)
      - event_id (uuid, foreign key)
      - user_id (uuid, foreign key)
      - created_at (timestamptz)

    - clubs
      - id (uuid, primary key)
      - name (text)
      - description (text)
      - category (text)
      - advisor (uuid, foreign key)
      - meeting_schedule (text)
      - status (text) - active, inactive
      - created_at (timestamptz)

    - club_members
      - id (uuid, primary key)
      - club_id (uuid, foreign key)
      - user_id (uuid, foreign key)
      - role (text) - member, leader
      - joined_at (timestamptz)

    - activities
      - id (uuid, primary key)
      - title (text)
      - description (text)
      - type (text)
      - date (date)
      - time (time)
      - venue (text)
      - coordinator (uuid, foreign key)
      - status (text) - upcoming, ongoing, completed
      - created_at (timestamptz)

    - activity_participants
      - id (uuid, primary key)
      - activity_id (uuid, foreign key)
      - user_id (uuid, foreign key)
      - created_at (timestamptz)

    - complaints
      - id (uuid, primary key)
      - title (text)
      - description (text)
      - submitted_by (uuid, foreign key)
      - department (text)
      - status (text) - pending, resolved, rejected
      - response (text)
      - is_anonymous (boolean)
      - created_at (timestamptz)
      - updated_at (timestamptz)

    - facilities
      - id (uuid, primary key)
      - name (text)
      - type (text)
      - capacity (integer)
      - location (text)
      - status (text) - available, maintenance, booked
      - created_at (timestamptz)

    - facility_bookings
      - id (uuid, primary key)
      - facility_id (uuid, foreign key)
      - user_id (uuid, foreign key)
      - date (date)
      - start_time (time)
      - end_time (time)
      - purpose (text)
      - status (text) - pending, approved, rejected
      - created_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for each table based on user roles
*/

-- Create users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL CHECK (role IN ('admin', 'student', 'teaching_staff', 'non_teaching_staff')),
  department text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create students table
CREATE TABLE students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  roll_number text UNIQUE NOT NULL,
  year text NOT NULL,
  semester text NOT NULL,
  admission_date date NOT NULL,
  UNIQUE(user_id)
);

-- Create teaching_staff table
CREATE TABLE teaching_staff (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  designation text NOT NULL,
  joining_date date NOT NULL,
  subjects text[] NOT NULL DEFAULT '{}',
  UNIQUE(user_id)
);

-- Create non_teaching_staff table
CREATE TABLE non_teaching_staff (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  designation text NOT NULL,
  department text NOT NULL,
  shift text NOT NULL,
  joining_date date NOT NULL,
  UNIQUE(user_id)
);

-- Create courses table
CREATE TABLE courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  department text NOT NULL,
  semester text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create course_materials table
CREATE TABLE course_materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  type text NOT NULL CHECK (type IN ('video', 'document', 'note')),
  url text NOT NULL,
  uploaded_by uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- Create events table
CREATE TABLE events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  date date NOT NULL,
  time time NOT NULL,
  venue text NOT NULL,
  capacity integer NOT NULL,
  organizer uuid REFERENCES users(id) ON DELETE SET NULL,
  status text NOT NULL CHECK (status IN ('upcoming', 'ongoing', 'completed')) DEFAULT 'upcoming',
  created_at timestamptz DEFAULT now()
);

-- Create event_registrations table
CREATE TABLE event_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(event_id, user_id)
);

-- Create clubs table
CREATE TABLE clubs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  category text NOT NULL,
  advisor uuid REFERENCES users(id) ON DELETE SET NULL,
  meeting_schedule text,
  status text NOT NULL CHECK (status IN ('active', 'inactive')) DEFAULT 'active',
  created_at timestamptz DEFAULT now()
);

-- Create club_members table
CREATE TABLE club_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id uuid REFERENCES clubs(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('member', 'leader')) DEFAULT 'member',
  joined_at timestamptz DEFAULT now(),
  UNIQUE(club_id, user_id)
);

-- Create activities table
CREATE TABLE activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  type text NOT NULL,
  date date NOT NULL,
  time time NOT NULL,
  venue text NOT NULL,
  coordinator uuid REFERENCES users(id) ON DELETE SET NULL,
  status text NOT NULL CHECK (status IN ('upcoming', 'ongoing', 'completed')) DEFAULT 'upcoming',
  created_at timestamptz DEFAULT now()
);

-- Create activity_participants table
CREATE TABLE activity_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id uuid REFERENCES activities(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(activity_id, user_id)
);

-- Create complaints table
CREATE TABLE complaints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  submitted_by uuid REFERENCES users(id) ON DELETE SET NULL,
  department text NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'resolved', 'rejected')) DEFAULT 'pending',
  response text,
  is_anonymous boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create facilities table
CREATE TABLE facilities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  capacity integer NOT NULL,
  location text NOT NULL,
  status text NOT NULL CHECK (status IN ('available', 'maintenance', 'booked')) DEFAULT 'available',
  created_at timestamptz DEFAULT now()
);

-- Create facility_bookings table
CREATE TABLE facility_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  facility_id uuid REFERENCES facilities(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  date date NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  purpose text NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE teaching_staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE non_teaching_staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE clubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE club_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE facility_bookings ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can view their own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admin can view all users"
  ON users
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

-- Create policies for students table
CREATE POLICY "Students can view their own data"
  ON students
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Staff can view all students"
  ON students
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'teaching_staff')
  ));

-- Create policies for teaching_staff table
CREATE POLICY "Teaching staff can view their own data"
  ON teaching_staff
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admin can view all teaching staff"
  ON teaching_staff
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

-- Create policies for non_teaching_staff table
CREATE POLICY "Non-teaching staff can view their own data"
  ON non_teaching_staff
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admin can view all non-teaching staff"
  ON non_teaching_staff
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

-- Create policies for courses table
CREATE POLICY "Anyone can view courses"
  ON courses
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Teaching staff can manage courses"
  ON courses
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'teaching_staff')
  ));

-- Create policies for course_materials table
CREATE POLICY "Anyone can view course materials"
  ON course_materials
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Teaching staff can manage course materials"
  ON course_materials
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'teaching_staff')
  ));

-- Create policies for events table
CREATE POLICY "Anyone can view events"
  ON events
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Staff can manage events"
  ON events
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'teaching_staff', 'non_teaching_staff')
  ));

-- Create policies for event_registrations table
CREATE POLICY "Users can view their own registrations"
  ON event_registrations
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can register for events"
  ON event_registrations
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Create policies for clubs table
CREATE POLICY "Anyone can view clubs"
  ON clubs
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Staff can manage clubs"
  ON clubs
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'teaching_staff')
  ));

-- Create policies for club_members table
CREATE POLICY "Users can view club members"
  ON club_members
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can join clubs"
  ON club_members
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Create policies for activities table
CREATE POLICY "Anyone can view activities"
  ON activities
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Staff can manage activities"
  ON activities
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'teaching_staff', 'non_teaching_staff')
  ));

-- Create policies for activity_participants table
CREATE POLICY "Users can view their own participations"
  ON activity_participants
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can register for activities"
  ON activity_participants
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Create policies for complaints table
CREATE POLICY "Users can view their own complaints"
  ON complaints
  FOR SELECT
  TO authenticated
  USING (
    submitted_by = auth.uid() 
    OR EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'teaching_staff')
      AND department = complaints.department
    )
  );

CREATE POLICY "Users can submit complaints"
  ON complaints
  FOR INSERT
  TO authenticated
  WITH CHECK (submitted_by = auth.uid());

-- Create policies for facilities table
CREATE POLICY "Anyone can view facilities"
  ON facilities
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Staff can manage facilities"
  ON facilities
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'non_teaching_staff')
  ));

-- Create policies for facility_bookings table
CREATE POLICY "Users can view their own bookings"
  ON facility_bookings
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Staff can view all bookings"
  ON facility_bookings
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'non_teaching_staff')
  ));

CREATE POLICY "Users can create bookings"
  ON facility_bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Create function to handle user management
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO users (id, email, full_name, role)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'role');
  
  -- Create role-specific records
  CASE new.raw_user_meta_data->>'role'
    WHEN 'student' THEN
      INSERT INTO students (user_id, roll_number, year, semester, admission_date)
      VALUES (
        new.id,
        new.raw_user_meta_data->>'roll_number',
        new.raw_user_meta_data->>'year',
        new.raw_user_meta_data->>'semester',
        COALESCE((new.raw_user_meta_data->>'admission_date')::date, CURRENT_DATE)
      );
    WHEN 'teaching_staff' THEN
      INSERT INTO teaching_staff (user_id, designation, joining_date)
      VALUES (
        new.id,
        new.raw_user_meta_data->>'designation',
        COALESCE((new.raw_user_meta_data->>'joining_date')::date, CURRENT_DATE)
      );
    WHEN 'non_teaching_staff' THEN
      INSERT INTO non_teaching_staff (user_id, designation, department, shift, joining_date)
      VALUES (
        new.id,
        new.raw_user_meta_data->>'designation',
        new.raw_user_meta_data->>'department',
        new.raw_user_meta_data->>'shift',
        COALESCE((new.raw_user_meta_data->>'joining_date')::date, CURRENT_DATE)
      );
    ELSE NULL;
  END CASE;
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user management
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();