
import { sqliQueue } from '../src/worker/queues/sqli';

async function flush() {
    console.log('🗑️ Flushing SQLi Queue...');
    await sqliQueue.obliterate({ force: true });
    console.log('✅ Queue obliterated.');
    process.exit(0);
}

flush();
