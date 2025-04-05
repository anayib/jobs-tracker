import { db } from './index';
import { columns } from './schema';

async function seed() {
  console.log('Seeding database...');
  
  // Check if columns already exist
  const existingColumns = await db.query.columns.findMany();
  
  if (existingColumns.length === 0) {
    // Create default columns
    await db.insert(columns).values([
      { title: 'Opportunities', order: 0 },
      { title: 'Applied', order: 1 },
      { title: 'Interviewing', order: 2 },
      { title: 'Closed', order: 3 }
    ]);
    
    console.log('Created default columns');
  } else {
    console.log('Columns already exist, skipping seed');
  }
  
  console.log('Seeding completed');
}

seed().catch(e => {
  console.error('Seeding failed:', e);
  process.exit(1);
}); 