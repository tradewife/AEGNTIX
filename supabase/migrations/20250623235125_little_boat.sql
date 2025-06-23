/*
  # Add assessment requests table

  1. New Tables
    - `assessment_requests`
      - `id` (uuid, primary key)
      - `email` (text)
      - `website` (text)
      - `persona` (text)
      - `status` (text, default 'pending')
      - `requested_at` (timestamp)

  2. Security
    - Enable RLS on assessment_requests table
    - Add policy for anonymous users to submit requests
*/

CREATE TABLE IF NOT EXISTS assessment_requests (
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