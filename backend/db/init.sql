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

CREATE TABLE actions (
    id            SERIAL PRIMARY KEY,
    name           TEXT UNIQUE NOT NULL,  -- e.g. "ball screen", "dribble hand-off"
    description    TEXT NOT NULL  -- e.g. "A player sets a screen for the ball handler"
);

CREATE TABLE roles (
    id             SERIAL PRIMARY KEY,
    name           TEXT UNIQUE NOT NULL,  -- e.g. "ball_handler", "screener", "defender1"
    description    TEXT NOT NULL  -- e.g. "The player who has the ball and is making the play"
);

CREATE TABLE results (
    id            SERIAL PRIMARY KEY,
    name           TEXT UNIQUE NOT NULL  -- e.g. "shot_attempt", "turnover", "assist"
);

CREATE TABLE shots (
    id            SERIAL PRIMARY KEY,
    name           TEXT UNIQUE NOT NULL  -- e.g. "fadeaway", "spot-up"
);

CREATE TABLE shot_details (
    id            SERIAL PRIMARY KEY,
    tag_id        INTEGER NOT NULL REFERENCES tag_action_result(id) ON DELETE CASCADE,
    player_id    INTEGER NOT NULL REFERENCES players(id) ON DELETE CASCADE,
    distance    NUMERIC NOT NULL,  -- e.g. 15.0 (feet)
    made     BOOLEAN NOT NULL,  -- e.g. true/false
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE tag_action_result (
  id               SERIAL PRIMARY KEY,
  practice_sessions_id INTEGER NOT NULL REFERENCES practice_sessions(id) ON DELETE CASCADE,
  start_time       NUMERIC NOT NULL,  -- e.g. 12.34 (seconds)
  end_time         NUMERIC NOT NULL,  -- e.g. 15.67 (seconds)
  action_id   INTEGER NOT NULL REFERENCES actions(id) ON DELETE CASCADE,
  result_id   INTEGER NOT NULL REFERENCES results(id) ON DELETE CASCADE,
  shot_id     INTEGER REFERENCES shots(id) ON DELETE CASCADE,
  occurred_at      TIMESTAMPTZ NOT NULL,  -- absolute timestamp in video/session
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE tag_players (
  id SERIAL PRIMARY KEY,
  tag_id INTEGER REFERENCES tag_action_result(id) ON DELETE CASCADE,
  role_id INTEGER REFERENCES roles(id),
  player_id INTEGER REFERENCES players(id)
);

CREATE TABLE stats (
    id SERIAL PRIMARY KEY,
    practice_session_id INTEGER NOT NULL REFERENCES practice_sessions(id) ON DELETE CASCADE,
    player_id INTEGER NOT NULL REFERENCES players(id) ON DELETE CASCADE,
    points INTEGER DEFAULT 0,
    assists INTEGER DEFAULT 0,
    rebounds INTEGER DEFAULT 0,
    steals INTEGER DEFAULT 0,
    turnovers INTEGER DEFAULT 0,
    blocks INTEGER DEFAULT 0,
    fouls INTEGER DEFAULT 0
);