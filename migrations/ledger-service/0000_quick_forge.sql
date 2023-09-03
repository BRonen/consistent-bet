CREATE TABLE IF NOT EXISTS "ledgers" (
	"id" serial PRIMARY KEY NOT NULL,
	"balance" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"status" varchar DEFAULT 'processing' NOT NULL,
	"amount" integer NOT NULL,
	"receiver_id" integer NOT NULL,
	"sender_id" integer NOT NULL
);
