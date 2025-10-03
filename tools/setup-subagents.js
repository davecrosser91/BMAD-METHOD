/**
 * Automatic subagent setup for BMAD expansion packs
 * Runs after npm install to configure Claude Code subagents
 */

const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');

// Colors for console output
const colors = {
  reset: '\u001B[0m',
  bright: '\u001B[1m',
  green: '\u001B[32m',
  yellow: '\u001B[33m',
  blue: '\u001B[34m',
  cyan: '\u001B[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logHeader(message) {
  log(`\n${'='.repeat(60)}`, 'cyan');
  log(message, 'bright');
  log('='.repeat(60), 'cyan');
}

function findExpansionPacks() {
  const expansionPacksDir = path.join(__dirname, '..', 'expansion-packs');

  if (!fs.existsSync(expansionPacksDir)) {
    return [];
  }

  const dirs = fs.readdirSync(expansionPacksDir, { withFileTypes: true });
  return dirs
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => ({
      name: dirent.name,
      path: path.join(expansionPacksDir, dirent.name),
      setupScript: path.join(expansionPacksDir, dirent.name, 'setup-bmad-subagents.sh'),
    }))
    .filter((pack) => fs.existsSync(pack.setupScript));
}

function runSetupScript(packInfo) {
  log(`\n📦 Setting up: ${packInfo.name}`, 'blue');

  try {
    // Make script executable
    fs.chmodSync(packInfo.setupScript, '755');

    // Run the setup script
    execSync(`bash ${packInfo.setupScript}`, {
      cwd: packInfo.path,
      stdio: 'inherit',
    });

    log(`✅ ${packInfo.name} configured successfully`, 'green');
    return true;
  } catch (error) {
    log(`⚠️  Failed to setup ${packInfo.name}: ${error.message}`, 'yellow');
    return false;
  }
}

function main() {
  // Skip if running in CI or if NO_POSTINSTALL is set
  if (process.env.CI || process.env.NO_POSTINSTALL) {
    log('Skipping postinstall setup (CI environment)', 'yellow');
    return;
  }

  logHeader('🎭 BMAD Subagent Auto-Configuration');

  log('\nSearching for expansion packs with subagent configs...', 'cyan');

  const expansionPacks = findExpansionPacks();

  if (expansionPacks.length === 0) {
    log('No expansion packs with setup scripts found.', 'yellow');
    log('Subagent configuration skipped.\n');
    return;
  }

  log(`Found ${expansionPacks.length} expansion pack(s):\n`, 'green');
  for (const pack of expansionPacks) {
    log(`  • ${pack.name}`, 'blue');
  }

  let successCount = 0;
  let failCount = 0;

  for (const pack of expansionPacks) {
    if (runSetupScript(pack)) {
      successCount++;
    } else {
      failCount++;
    }
  }

  logHeader('📊 Setup Summary');
  log(`\n✅ Successfully configured: ${successCount}`, 'green');
  if (failCount > 0) {
    log(`⚠️  Failed: ${failCount}`, 'yellow');
  }

  log('\n💡 Next steps:', 'cyan');
  log('   1. Restart Claude Code to load new subagents');
  log('   2. Verify with: /agents command in Claude Code');
  log('   3. Use agents by describing your task\n');
}

// Only run if called directly (not required as module)
if (require.main === module) {
  main();
}

module.exports = { findExpansionPacks, runSetupScript };
