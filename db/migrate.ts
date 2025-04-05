import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const runMigration = async () => {
  const connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/jobs_tracker';
  const sql = postgres(connectionString, { max: 1 });
  const db = drizzle(sql);

  console.log('Running migrations...');
  
  await migrate(db, { migrationsFolder: './db/migrations' });
  
  console.log('Migrations completed successfully');
  await sql.end();
  process.exit(0);
};

runMigration().catch((err) => {
  console.error('Migration failed', err);
  process.exit(1);
}); 