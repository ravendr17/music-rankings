CREATE TABLE "report_songs" (
	"report_id" integer NOT NULL,
	"song_id" integer NOT NULL,
	"play_count" integer NOT NULL,
	CONSTRAINT "report_songs_report_id_song_id_pk" PRIMARY KEY("report_id","song_id"),
	CONSTRAINT "play_count_range" CHECK ("report_songs"."play_count" BETWEEN 1 AND 999999)
);
--> statement-breakpoint
CREATE TABLE "reports" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "reports_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" integer NOT NULL,
	"year" integer NOT NULL,
	"month" integer NOT NULL,
	"total_hours" integer NOT NULL,
	CONSTRAINT "reports_user_id_year_month_unique" UNIQUE("user_id","year","month"),
	CONSTRAINT "year_range" CHECK ("reports"."year" BETWEEN 1900 AND 9999),
	CONSTRAINT "month_range" CHECK ("reports"."month" BETWEEN 1 AND 12),
	CONSTRAINT "total_hours_range" CHECK ("reports"."total_hours" BETWEEN 1 AND 999999)
);
--> statement-breakpoint
CREATE TABLE "songs" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "songs_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" text NOT NULL,
	"artist" text NOT NULL,
	CONSTRAINT "songs_title_artist_unique" UNIQUE("title","artist"),
	CONSTRAINT "title_length" CHECK (LENGTH(BTRIM("songs"."title")) BETWEEN 1 AND 100),
	CONSTRAINT "artist_length" CHECK (LENGTH(BTRIM("songs"."artist")) BETWEEN 1 AND 100)
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"username" text NOT NULL,
	"password_hash" text NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "username_length" CHECK (LENGTH(BTRIM("users"."username")) BETWEEN 8 AND 30),
	CONSTRAINT "password_hash_length" CHECK (LENGTH(BTRIM("users"."password_hash")) BETWEEN 1 AND 255)
);
--> statement-breakpoint
ALTER TABLE "report_songs" ADD CONSTRAINT "report_songs_report_id_reports_id_fk" FOREIGN KEY ("report_id") REFERENCES "public"."reports"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "report_songs" ADD CONSTRAINT "report_songs_song_id_songs_id_fk" FOREIGN KEY ("song_id") REFERENCES "public"."songs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reports" ADD CONSTRAINT "reports_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;