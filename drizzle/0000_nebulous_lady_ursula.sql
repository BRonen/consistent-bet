CREATE TABLE IF NOT EXISTS "betable_purchase" (
	"id" serial PRIMARY KEY NOT NULL,
	"buyer_id" integer NOT NULL,
	"betable_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "betable" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"price" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"status" varchar(256) DEFAULT 'processing' NOT NULL,
	"amount" integer NOT NULL,
	"receiver_id" integer NOT NULL,
	"sender_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"password" varchar(256) NOT NULL,
	"balance" integer DEFAULT 10 NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "betable_purchase" ADD CONSTRAINT "betable_purchase_buyer_id_users_id_fk" FOREIGN KEY ("buyer_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "betable_purchase" ADD CONSTRAINT "betable_purchase_betable_id_betable_purchase_id_fk" FOREIGN KEY ("betable_id") REFERENCES "betable_purchase"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_receiver_id_users_id_fk" FOREIGN KEY ("receiver_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_sender_id_users_id_fk" FOREIGN KEY ("sender_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
