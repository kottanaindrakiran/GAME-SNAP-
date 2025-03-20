/*
  # Create leaderboard tables

  1. New Tables
    - `leaderboard_entries`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles.id)
      - `game_id` (uuid, references games.id)
      - `score` (integer)
      - `created_at` (timestamp)
      - `time_period` (text) - 'daily', 'weekly', 'all_time'

  2. Security
    - Enable RLS on `leaderboard_entries` table
    - Add policies for:
      - Anyone can read leaderboard entries
      - Authenticated users can create their own entries
*/

CREATE TABLE IF NOT EXISTS leaderboard_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  game_id uuid REFERENCES games(id) ON DELETE CASCADE NOT NULL,
  score integer NOT NULL,
  time_period text NOT NULL CHECK (time_period IN ('daily', 'weekly', 'all_time')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leaderboard_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Leaderboard entries are viewable by everyone"
  ON leaderboard_entries
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can create their own leaderboard entries"
  ON leaderboard_entries
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX leaderboard_game_time_idx ON leaderboard_entries (game_id, time_period, score DESC);
CREATE INDEX leaderboard_user_game_idx ON leaderboard_entries (user_id, game_id);