-- Users (coaches/admin)
CREATE TABLE users (
  id             SERIAL PRIMARY KEY,
  email          TEXT UNIQUE NOT NULL,
  name           TEXT NOT NULL,
  password_hash  TEXT NOT NULL,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Players
CREATE TABLE players (
  id             SERIAL PRIMARY KEY,
  jersey_no      INTEGER,
  first_name     TEXT NOT NULL,
  last_name      TEXT NOT NULL,
  position       TEXT,                -- e.g. "G", "F", "C"
  shooting_hand  TEXT,          -- e.g. "L", "R"
  year           TEXT,              -- e.g. 2023
  height         TEXT,              -- e.g. "6'3"
  weight         TEXT              -- e.g. "190");
);

-- Practice Sessions (video uploads)
CREATE TABLE practice_sessions (
  id             SERIAL PRIMARY KEY,
  uploaded_by    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  session_date   DATE NOT NULL,
  video_url      TEXT NOT NULL,       -- S3/streaming URL
  notes          TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (uploaded_by, session_date)
);

-- Action Types (e.g. “ball screen”, “dribble hand-off”)
CREATE TABLE action_types (
  id             SERIAL PRIMARY KEY,
  action_name_id INTEGER UNIQUE NOT NULL REFERENCES action_name(id) ON DELETE CASCADE,  -- e.g. "ball screen", "dribble hand-off"
  role_id    INTEGER NOT NULL REFERENCES role_types(id) ON DELETE CASCADE,  -- e.g. 'ball_handler', 'screener', 'defender1', etc.
  player_id INTEGER NOT NULL REFERENCES players(id) ON DELETE CASCADE
);

CREATE TABLE action_name (
    id            SERIAL PRIMARY KEY,
    name           TEXT UNIQUE NOT NULL  -- e.g. "ball screen", "dribble hand-off"
);

CREATE TABLE role_types (
    id             SERIAL PRIMARY KEY,
    name           TEXT UNIQUE NOT NULL,  -- e.g. "ball_handler", "screener", "defender1"
    description    TEXT NOT NULL  -- e.g. "The player who has the ball and is making the play"
);
-- Result Types (e.g. “shot_attempt”, “turnover”, “assist”)
CREATE TABLE result_types (
  id             SERIAL PRIMARY KEY,
  result_name_id INTEGER UNIQUE NOT NULL REFERENCES result_name(id) ON DELETE CASCADE,  -- e.g. "shot_attempt", "turnover", "assist"
  player_id INTEGER NOT NULL REFERENCES players(id) ON DELETE CASCADE
);

CREATE TABLE result_name (
    id            SERIAL PRIMARY KEY,
    name           TEXT UNIQUE NOT NULL  -- e.g. "shot_attempt", "turnover", "assist"
);

-- Shot Types (only used when result = shot_attempt)
CREATE TABLE shot_types (
  id             SERIAL PRIMARY KEY,
  shot_name_id   INTEGER NOT NULL REFERENCES shot_names(id) ON DELETE CASCADE,  -- e.g. "fadeaway", "spot-up"
  x_coord             NUMERIC NOT NULL,           -- e.g. court X
  y_coord             NUMERIC NOT NULL,           -- e.g. court Y
  made                BOOLEAN NOT NULL
);

CREATE TABLE shot_names (
    id            SERIAL PRIMARY KEY,
    name           TEXT UNIQUE NOT NULL  -- e.g. "fadeaway", "spot-up"
);

-- Tagged Actions
CREATE TABLE tag_instances (
  id               SERIAL PRIMARY KEY,
  practice_sessions_id INTEGER NOT NULL REFERENCES practice_sessions(id) ON DELETE CASCADE,
  start_time       NUMERIC NOT NULL,  -- e.g. 12.34 (seconds)
  end_time         NUMERIC NOT NULL,  -- e.g. 15.67 (seconds)
  action_type_id   INTEGER NOT NULL REFERENCES action_types(id) ON DELETE CASCADE,
  result_type_id   INTEGER NOT NULL REFERENCES result_types(id) ON DELETE CASCADE,
  occurred_at      TIMESTAMPTZ NOT NULL,  -- absolute timestamp in video/session
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Shot‐Attempt Details
CREATE TABLE shot_attempt_details (
  result_type_id  INTEGER PRIMARY KEY REFERENCES result_types(id) ON DELETE CASCADE,
  player_id       INTEGER NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  shot_type_id    INTEGER NOT NULL REFERENCES shot_types(id) ON DELETE CASCADE
);