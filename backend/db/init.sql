-- 1. Users (coaches/admin)
CREATE TABLE users (
  id             SERIAL PRIMARY KEY,
  email          TEXT UNIQUE NOT NULL,
  name           TEXT NOT NULL,
  password_hash  TEXT NOT NULL,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Players (all on the same squad for that user)
CREATE TABLE players (
  id             SERIAL PRIMARY KEY,
  jersey_no      INTEGER,
  first_name     TEXT NOT NULL,
  last_name      TEXT NOT NULL,
  position       TEXT,                -- e.g. "G", "F", "C"
  shooting_hand  TEXT,          -- e.g. "L", "R"
  year           TEXT,              -- e.g. 2023
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Practice Sessions (video uploads)
CREATE TABLE practice_sessions (
  id             SERIAL PRIMARY KEY,
  uploaded_by    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  session_date   DATE NOT NULL,
  video_url      TEXT NOT NULL,       -- S3/streaming URL
  notes          TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (uploaded_by, session_date)
);

-- 4. Clips (auto‐generated or coach‐defined segments)
CREATE TABLE clips (
  id             SERIAL PRIMARY KEY,
  session_id     INTEGER NOT NULL REFERENCES practice_sessions(id) ON DELETE CASCADE,
  start_offset   INTERVAL NOT NULL,   -- offset from video start
  end_offset     INTERVAL NOT NULL,
  thumbnail_url  TEXT,                -- optional
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Action Types (e.g. “ball screen”, “dribble hand-off”)
CREATE TABLE action_types (
  id             SERIAL PRIMARY KEY,
  name           TEXT UNIQUE NOT NULL,
  description    TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Result Types (e.g. “shot_attempt”, “turnover”, “assist”)
CREATE TABLE result_types (
  id             SERIAL PRIMARY KEY,
  name           TEXT UNIQUE NOT NULL,
  description    TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Shot Types (only used when result = shot_attempt)
CREATE TABLE shot_types (
  id             SERIAL PRIMARY KEY,
  name           TEXT UNIQUE NOT NULL,  -- e.g. “fadeaway”, “spot-up”
  description    TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. Tagged Actions
CREATE TABLE action_instances (
  id               SERIAL PRIMARY KEY,
  clip_id          INTEGER NOT NULL REFERENCES clips(id) ON DELETE CASCADE,
  player_id        INTEGER NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  action_type_id   INTEGER NOT NULL REFERENCES action_types(id),
  result_type_id   INTEGER NOT NULL REFERENCES result_types(id),
  occurred_at      TIMESTAMPTZ NOT NULL,  -- absolute timestamp in video/session
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. Shot‐Attempt Details
CREATE TABLE shot_attempt_details (
  action_instance_id  INTEGER PRIMARY KEY REFERENCES action_instances(id) ON DELETE CASCADE,
  x_coord             NUMERIC NOT NULL,           -- e.g. court X
  y_coord             NUMERIC NOT NULL,           -- e.g. court Y
  made                BOOLEAN NOT NULL,
  shot_type_id        INTEGER NOT NULL REFERENCES shot_types(id)
);