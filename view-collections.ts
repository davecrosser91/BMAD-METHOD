import { getCollections, printCollectionHierarchy } from './.claude/servers/zotero/get-collections.ts';

async function main() {
  console.log('=== Zotero Collections Hierarchy ===\n');
  await printCollectionHierarchy();

  console.log('\n=== Raw Collections Data ===\n');
  const collections = await getCollections();
  console.log(JSON.stringify(collections, null, 2));
}

main().catch(console.error);
