import { z } from 'zod';
import { Config } from 'nest-zod-config';

const AppConfigSchema = z.object({
  PG_HOST: z.string(),
  PG_PORT: z.number(),
  PG_USERNAME: z.string(),
  PG_PASSWORD: z.string(),
  PG_DATABASE: z.string(),
  DB_POOL_MAX: z.number(),
  DB_POOL_MIN: z.number(),
  HTTP_PORT: z.number(),
  HTTP_HOST: z.string(),
});

export class AppConfig extends Config(AppConfigSchema) {}
