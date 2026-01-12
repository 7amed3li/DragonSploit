import * as fs from 'fs';
import * as path from 'path';

const PROOFS_DIR = path.resolve(__dirname, '../proofs/scans');

function cleanup() {
    if (!fs.existsSync(PROOFS_DIR)) {
        console.log('Proof directory does not exist.');
        return;
    }

    const scans = fs.readdirSync(PROOFS_DIR);
    console.log(`🔍 Checking ${scans.length} scan directories...`);

    let deletedCount = 0;
    let keptCount = 0;

    for (const scanId of scans) {
        const scanPath = path.join(PROOFS_DIR, scanId);
        
        // If it's a file for some reason, ignore
        if (!fs.statSync(scanPath).isDirectory()) continue;

        // Check subdirectories (vulnerabilities)
        const vulns = fs.readdirSync(scanPath);
        
        if (vulns.length === 0) {
            // Empty scan dir
            fs.rmdirSync(scanPath);
            console.log(`🗑️ Deleted empty scan dir: ${scanId}`);
            deletedCount++;
            continue;
        }

        let hasValidProof = false;

        for (const vulnId of vulns) {
            const vulnPath = path.join(scanPath, vulnId);
            if (!fs.statSync(vulnPath).isDirectory()) continue;

            const files = fs.readdirSync(vulnPath);
            // Valid proof must have a screenshot or video or html
            const evidence = files.filter(f => f.endsWith('.png') || f.endsWith('.mp4') || f.endsWith('.html'));

            if (evidence.length === 0) {
                // Empty vulnerability dir (orphaned)
                fs.rmSync(vulnPath, { recursive: true, force: true });
                console.log(`   🗑️ Deleted empty vuln dir: ${vulnId}`);
            } else {
                hasValidProof = true;
            }
        }

        // Re-check scan dir after cleaning subdirs
        if (fs.readdirSync(scanPath).length === 0) {
            fs.rmdirSync(scanPath);
            console.log(`🗑️ Deleted empty scan dir (after cleanup): ${scanId}`);
            deletedCount++;
        } else {
            keptCount++;
        }
    }

    console.log('\n================================');
    console.log(`✅ Cleanup Complete.`);
    console.log(`🗑️ Removed: ${deletedCount} directories`);
    console.log(`💾 Kept:    ${keptCount} directories`);
    console.log('================================');
}

cleanup();
