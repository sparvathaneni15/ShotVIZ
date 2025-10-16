DROP TABLE IF EXISTS stats, tag_players, shot_details, tag_action_result, shots, results, roles, actions, practice_sessions, players, users CASCADE;

-- Players
CREATE TABLE players (
  id             SERIAL PRIMARY KEY,
  first_name     TEXT NOT NULL,
  last_name      TEXT NOT NULL,
  age            INTEGER,
  number         INTEGER,
  position       TEXT,                -- e.g. "G", "F", "C"
  hand           TEXT,         -- e.g. "L", "R"
  height         TEXT,              -- e.g. "6'3"
  weight         INTEGER              -- e.g. "190");
);

-- Practice Sessions (video uploads)
CREATE TABLE films_metadata (
  id             SERIAL PRIMARY KEY,
  session_date   DATE UNIQUE NOT NULL,
  video_url      TEXT NOT NULL,       -- S3/streaming URL
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE box_stats (
    id SERIAL PRIMARY KEY,
    films_metadata_id INTEGER NOT NULL REFERENCES films_metadata(id) ON DELETE CASCADE,
    players_id INTEGER NOT NULL REFERENCES players(id) ON DELETE CASCADE,
    min INTEGER DEFAULT 0,
    pts INTEGER DEFAULT 0,
    fgm INTEGER DEFAULT 0,
    fga INTEGER DEFAULT 0,
    fg% DECIMAL DEFAULT 0,
    3pm INTEGER DEFAULT 0,
    3pa INTEGER DEFAULT 0,
    3p% DECIMAL DEFAULT 0,
    ftm INTEGER DEFAULT 0,
    fta INTEGER DEFAULT 0,
    ft% DECIMAL DEFAULT 0,
    oreb INTEGER DEFAULT 0,
    dreb INTEGER DEFAULT 0,
    reb INTEGER DEFAULT 0,
    ast INTEGER DEFAULT 0,
    ast_to DECIMAL DEFAULT 0,
    ast% DECIMAL default 0,
    stl INTEGER DEFAULT 0,
    blk INTEGER DEFAULT 0,
    blka INTEGER DEFAULT 0,
    tov INTEGER DEFAULT 0,
    pf INTEGER DEFAULT 0,
    fd INTEGER DEFAULT 0,
    tech INTEGER DEFAULT 0,
    flg INTEGER DEFAULT 0,
    +/- INTEGER DEFAULT 0,
    eff INTEGER DEFAULT 0,
    per DECIMAL DEFAULT 0,
    usg% DECIMAL DEFAULT 0,
    ts% DECIMAL DEFAULT 0,
    efg% DECIMAL DEFAULT 0,
    touches INTEGER DEFAULT 0,
    screen_assist INTEGER DEFAULT 0,
    contests INTEGER DEFAULT 0,
    deflections INTEGER DEFAULT 0,
    charges_taken INTEGER DEFAULT 0,
    sec_chance_points INTEGER DEFAULT 0,
    fast_break_points INTEGER DEFAULT 0,
    points_off_to INTEGER DEFAULT 0
);