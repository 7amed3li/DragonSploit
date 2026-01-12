
import { isOllamaAvailable, getNextSqlPayloadOllama } from '../src/services/ai-ollama';

async function verifyOllama() {
    console.log('🔍 Verifying Ollama Integration...');

    // 1. Check Availability
    const available = await isOllamaAvailable();
    console.log(`[Status] Ollama Available: ${available}`);

    if (!available) {
        console.error('❌ Ollama is not available. Ensure it is running and accessible.');
        process.exit(1);
    }

    // 2. Test Payload Generation
    console.log('\n🧪 Testing Payload Generation...');
    const feedback = "HTTP 500 Internal Server Error. The query failed near 'LIMIT'.";
    const context = {
        vector: 'search',
        parameter: 'q',
        attemptNumber: 1,
        fingerprint: {
            database: 'sqlite',
            server: 'nginx'
        }
    };

    try {
        const result = await getNextSqlPayloadOllama(feedback, context);
        console.log('\n✅ Payload Generated Successfully:');
        console.log(JSON.stringify(result, null, 2));

        if (result.payload) {
            console.log('\n🎉 Verification PASSED!');
        } else {
            console.warn('\n⚠️  Payload is null (might be expected if invulnerable, but check logic).');
        }

    } catch (error: any) {
        console.error('\n❌ Error generating payload:', error.message);
        process.exit(1);
    }
}

verifyOllama();
