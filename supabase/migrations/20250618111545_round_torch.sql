/*
  # Create waitlist and contact tables

  1. New Tables
    - `waitlist_signups`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `persona` (text)
      - `website` (text, optional)
      - `created_at` (timestamp)
    - `contact_messages`
      - `id` (uuid, primary key)  
      - `email` (text)
      - `subject` (text)
      - `message` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for anonymous users to insert data
*/

CREATE TABLE IF NOT EXISTS waitlist_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  persona text NOT NULL,
  website text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE waitlist_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can join waitlist"
  ON waitlist_signups
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can send contact messages"
  ON contact_messages
  FOR INSERT
  TO anon
  WITH CHECK (true);