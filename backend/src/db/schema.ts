import { integer, pgTable, unique, varchar } from "drizzle-orm/pg-core";

export const songsTable = pgTable('songs', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar().notNull(),
  artist: varchar().notNull()
}, (t) => [
  unique('uq_songs_title_artist').on(t.title, t.artist)
]);

export const reportsTable = pgTable('reports', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  year: integer().notNull(),
  month: integer().notNull(),
  totalHours: integer('total_hours').notNull()
}, (t) => [
  unique('uq_reports_year_month').on(t.year, t.month)
]);

export const rankingsTable = pgTable('rankings', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  reportId: integer('report_id').notNull().references(() => reportsTable.id),
  songId: integer('song_id').notNull().references(() => songsTable.id),
  playCount: integer('play_count').notNull()
}, (t) => [
  unique('uq_rankings_report_id_song_id').on(t.reportId, t.songId)
]);