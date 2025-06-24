/*
  # Create assessment requests table

  1. New Tables
    - `assessment_requests`
      - `id` (uuid, primary key)
      - `email` (text, required)
      - `website` (text, required)
      - `persona` (text, required)
      - `status` (text, default 'pending')
      - `requested_at` (timestamp)

  2. Security
    - Enable RLS on `assessment_requests` table
    - Add policy for anonymous users to submit requests
*/

-- Drop existing table if it exists to recreate with proper structure
DROP TABLE IF EXISTS assessment_requests;

CREATE TABLE assessment_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  website text NOT NULL,
  persona text NOT NULL,
  status text DEFAULT 'pending' NOT NULL,
  requested_at timestamptz DEFAULT now()
);

ALTER TABLE assessment_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can request assessment"
  ON assessment_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);