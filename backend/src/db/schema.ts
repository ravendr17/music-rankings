import { integer, pgTable, primaryKey, unique, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: varchar({length: 30}).notNull().unique(),
  passwordHash: varchar("password_hash", {length: 255}).notNull()
});

export const songs = pgTable("songs", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({length: 100}).notNull(),
  artist: varchar({length: 100}).notNull()

}, (t) => [
  unique().on(t.title, t.artist)
]);

export const reports = pgTable("reports", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id").notNull().references(() => users.id),

  year: integer().notNull(),
  month: integer().notNull(),
  totalHours: integer("total_hours").notNull()
  
}, (t) => [
  unique().on(t.userId, t.year, t.month)
]);

export const reportSongs = pgTable("report_songs", {
  reportId: integer("report_id").notNull().references(() => reports.id),
  songId: integer("song_id").notNull().references(() => songs.id),
  playCount: integer("play_count").notNull()

}, (t) => [
  primaryKey({columns: [t.reportId, t.songId]})
]);