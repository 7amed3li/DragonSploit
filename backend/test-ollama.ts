
import axios from 'axios';

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';

async function testOllama() {
    console.log(`Testing connection to: ${OLLAMA_BASE_URL}/api/tags`);
    try {
        const response = await axios.get(`${OLLAMA_BASE_URL}/api/tags`, {
            timeout: 5000
        });
        console.log('✅ Ollama is AVAILABLE');
        console.log('Available Models:');
        response.data.models.forEach((m: any) => console.log(` - ${m.name}`));
    } catch (error: any) {
        console.error('❌ Ollama is UNAVAILABLE');
        console.error('Error Message:', error.message);
        if (error.code) console.error('Error Code:', error.code);
        if (error.response) {
            console.error('Response Status:', error.response.status);
            console.error('Response Data:', error.response.data);
        }
    }
}

testOllama();
