ALTER TABLE "betable_purchase" DROP CONSTRAINT "betable_purchase_betable_id_betable_purchase_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "betable_purchase" ADD CONSTRAINT "betable_purchase_betable_id_betable_id_fk" FOREIGN KEY ("betable_id") REFERENCES "betable"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
