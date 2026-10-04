import { sql } from "drizzle-orm";
import { check, integer, pgTable, primaryKey, text, unique } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: text().notNull().unique(),
  passwordHash: text("password_hash").notNull()

}, (t) => [
  check(
    "username_length", sql`LENGTH(BTRIM(${t.username})) BETWEEN 8 AND 30`
  ),
  check(
    "password_hash_length", sql`LENGTH(BTRIM(${t.passwordHash})) BETWEEN 1 AND 255`
  )
]);

export const songs = pgTable("songs", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: text().notNull(),
  artist: text().notNull()

}, (t) => [
  unique().on(t.title, t.artist),

  check(
    "title_length", sql`LENGTH(BTRIM(${t.title})) BETWEEN 1 AND 100`
  ),
  check(
    "artist_length", sql`LENGTH(BTRIM(${t.artist})) BETWEEN 1 AND 100`
  )
]);

export const reports = pgTable("reports", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id").notNull().references(() => users.id),

  year: integer().notNull(),
  month: integer().notNull(),
  totalHours: integer("total_hours").notNull()
  
}, (t) => [
  unique().on(t.userId, t.year, t.month),

  check(
    "year_range", sql`${t.year} BETWEEN 1900 AND 9999`
  ),
  check(
    "month_range", sql`${t.month} BETWEEN 1 AND 12`
  ),
  check(
    "total_hours_range", sql`${t.totalHours} BETWEEN 1 AND 999999`
  )
]);

export const reportSongs = pgTable("report_songs", {
  reportId: integer("report_id")
    .notNull()
    .references(() => reports.id, {onDelete: "cascade"}),

  songId: integer("song_id").notNull().references(() => songs.id),
  playCount: integer("play_count").notNull()

}, (t) => [
  primaryKey({columns: [t.reportId, t.songId]}),

  check(
    "play_count_range", sql`${t.playCount} BETWEEN 1 AND 999999`
  )
]);