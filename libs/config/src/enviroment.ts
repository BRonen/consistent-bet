import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number(),
  DB_CONNECTION_URI: z.string().url(),
  JWT_SECRET: z.string(),
});

export class Enviroment {
  public readonly env: typeof envSchema._type;

  constructor() {
    this.env = envSchema.parse(process.env);
  }

  get(key: keyof typeof this.env) {
    return this.env[key];
  }
}
