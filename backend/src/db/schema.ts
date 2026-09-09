import { integer, pgTable, primaryKey, unique, varchar } from "drizzle-orm/pg-core";

export const songsTable = pgTable('songs', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({length: 200}).notNull(),
  artist: varchar({length: 200}).notNull()
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

export const reportSongsTable = pgTable('report_songs', {
  reportId: integer().notNull().references(() => reportsTable.id),
  songId: integer().notNull().references(() => songsTable.id),
  playCount: integer('play_count').notNull()
}, (t) => [
  primaryKey({
    name: 'pk_report_songs_report_id_song_id',
    columns: [t.reportId, t.songId]
  })
]);