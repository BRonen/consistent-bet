import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number(),
  AUTH_DATABASE_URI: z.string().url(),
  LEDGER_SERVICE_URI: z.string(),
  JWT_SECRET: z.string(),
});

export class AuthEnviroment {
  public readonly env: typeof envSchema._type;

  constructor() {
    this.env = envSchema.parse(process.env);
  }

  get(key: keyof typeof this.env) {
    return this.env[key];
  }
}
