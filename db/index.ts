import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// For server-side usage
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/jobs_tracker';

// Connection for migrations and queries
const client = postgres(connectionString);
export const db = drizzle(client, { schema }); 