// debug-env.ts
import 'dotenv/config';

console.log('--- ENV DEBUG ---');
console.log('DATABASE_URL loaded from .env:');
console.log(process.env.DATABASE_URL);
console.log('--- END DEBUG ---');
