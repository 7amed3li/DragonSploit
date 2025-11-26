// clear-queue.ts
import { Queue } from 'bullmq';

const connection = {
  host: 'localhost',
  port: 6379
};

const queuesToClear = ['sqli-scans', 'xss-scans', 'scanQueue'];

async function clearQueue() {
  console.log('🧹 Starting queue cleanup...');

  for (const queueName of queuesToClear) {
    const queue = new Queue(queueName, { connection });
    try {
      await queue.obliterate({ force: true });
      console.log(`✅ Queue "${queueName}" obliterated.`);
    } catch (err) {
      console.error(`❌ Failed to clear "${queueName}":`, err);
    } finally {
      await queue.close();
    }
  }

  console.log('🏁 All queues processed.');
  process.exit(0);
}

clearQueue();