-- migrate:up

CREATE TABLE users(
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username TEXT NOT NULL UNIQUE 
        CHECK (LENGTH(TRIM(username)) BETWEEN 8 AND 30),
    password_hash TEXT NOT NULL
        CHECK (LENGTH(TRIM(password_hash)) BETWEEN 1 AND 255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE songs(
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title TEXT NOT NULL
        CHECK (LENGTH(TRIM(title)) BETWEEN 1 AND 100),
    artist TEXT NOT NULL
        CHECK (LENGTH(TRIM(artist)) BETWEEN 1 AND 100),

    UNIQUE(title, artist)
);

CREATE TABLE reports(
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL REFERENCES users(id),
    year INT NOT NULL 
        CHECK (year BETWEEN 1900 AND 2999),
    month INT NOT NULL
        CHECK (month BETWEEN 1 AND 12),
    total_hours INT NOT NULL
        CHECK (total_hours BETWEEN 1 AND 999),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE(user_id, year, month)
);

CREATE TABLE report_songs(
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    report_id INT NOT NULL REFERENCES reports(id) ON DELETE CASCADE,
    song_id INT NOT NULL REFERENCES songs(id),
    play_count INT NOT NULL
        CHECK (play_count BETWEEN 1 AND 99999),

    UNIQUE(report_id, song_id)
);

-- migrate:down

DROP TABLE report_songs;
DROP TABLE reports;
DROP TABLE songs;
DROP TABLE users;