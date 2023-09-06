import { Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { outboxEventSchema } from '../schemas';
import { DB, DbType } from '../database/database.provider';

export class OutboxEventsRepository {
  constructor(@Inject(DB) private readonly database: DbType) {}

  async findNotProcessed() {
    const events = this.database
      .select({
        id: outboxEventSchema.id,
        status: outboxEventSchema.status,
        event_name: outboxEventSchema.event_name,
        user_id: outboxEventSchema.user_id,
      })
      .from(outboxEventSchema)
      .where(eq(outboxEventSchema.status, 'not_processed'))
      .limit(10);

    return events;
  }

  async findAll() {
    const events = this.database
      .select({
        id: outboxEventSchema.id,
        status: outboxEventSchema.status,
        event_name: outboxEventSchema.event_name,
        user_id: outboxEventSchema.user_id,
      })
      .from(outboxEventSchema)
      .limit(10);

    return events;
  }

  async findById(id: number) {
    const [event] = await this.database
      .select({
        id: outboxEventSchema.id,
        status: outboxEventSchema.status,
        event_name: outboxEventSchema.event_name,
        user_id: outboxEventSchema.user_id,
      })
      .from(outboxEventSchema)
      .where(eq(outboxEventSchema.id, id))
      .limit(1);

    return event;
  }

  async markAsProcessed(id: number) {
    const [event] = await this.database
      .update(outboxEventSchema)
      .set({ status: 'processed' })
      .where(eq(outboxEventSchema.id, id));

    return event;
  }
}
