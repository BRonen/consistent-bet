CREATE TABLE IF NOT EXISTS "outbox_events" (
	"id" serial PRIMARY KEY NOT NULL,
	"status" varchar(256) DEFAULT 'not_processed' NOT NULL,
	"event_name" varchar(256) NOT NULL,
	"user_id" integer
);
