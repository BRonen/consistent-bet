ALTER TABLE "betable_purchase" ADD COLUMN "status" varchar DEFAULT 'processing' NOT NULL;--> statement-breakpoint
ALTER TABLE "betable_purchase" ADD COLUMN "buy_or_sell" boolean NOT NULL;