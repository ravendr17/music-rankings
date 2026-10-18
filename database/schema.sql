
PRAGMA foreign_keys = ON;

CREATE TABLE songs (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL
        CHECK (LENGTH(TRIM(title)) BETWEEN 1 AND 100),
    artist TEXT NOT NULL
        CHECK (LENGTH(TRIM(artist)) BETWEEN 1 AND 100),

    UNIQUE(title, artist)
);

CREATE TABLE reports (
    id INTEGER PRIMARY KEY,
    year INTEGER NOT NULL
        CHECK (year BETWEEN 1900 AND 2999),
    month INTEGER NOT NULL
        CHECK (month BETWEEN 1 AND 12),
    total_hours INTEGER NOT NULL
        CHECK (total_hours BETWEEN 1 AND 999),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(year, month)
);

CREATE TABLE report_songs (
    id INTEGER PRIMARY KEY,
    report_id INTEGER NOT NULL REFERENCES reports(id) ON DELETE CASCADE,
    song_id INTEGER NOT NULL REFERENCES songs(id),
    play_count INTEGER NOT NULL
        CHECK (play_count BETWEEN 1 AND 999999),

    UNIQUE(report_id, song_id)
);
