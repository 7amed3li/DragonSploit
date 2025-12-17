
import { Queue } from 'bullmq';
import { redisConnection as connection } from './src/worker/queues/connection';

const QUEUES_TO_CLEAR = [
    'scanQueue',
    'sqli-scans',
    'sqli-param-scans',
    'xss-scans',
    'wordpress-scans',
    'laravel-scans',
    'drupal-scans',
    'nginx-scans',
    'apache-scans'
];

async function clearQueues() {
    console.log('🧹 Starting deep clean of all queues...');

    for (const queueName of QUEUES_TO_CLEAR) {
        const queue = new Queue(queueName, { connection });
        try {
            console.log(`   - Obliterating queue: ${queueName}...`);
            await queue.obliterate({ force: true });
            console.log(`     ✅ Cleared.`);
        } catch (error: any) {
            console.log(`     ⚠️  Error clearing ${queueName}: ${error.message}`);
        } finally {
            await queue.close();
        }
    }

    console.log('✨ All queues flushed. Ready for a fresh start!');
    process.exit(0);
}

clearQueues();
