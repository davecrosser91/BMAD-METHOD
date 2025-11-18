/**
 * Zotero Collections Server Wrapper
 * Wraps mcp__zotero__get_collections and collection-related MCP tools
 *
 * Usage:
 *   import { getCollections } from './servers/zotero/get-collections.ts'
 *   const collections = await getCollections()
 */

interface Collection {
  key: string;
  version: number;
  name: string;
  parentCollection?: string; // Key of parent collection
  data: {
    name: string;
    parentCollection: boolean | string;
  };
  meta: {
    numCollections: number; // Number of subcollections
    numItems: number; // Number of items
  };
}

interface ZoteroItem {
  key: string;
  itemType: string;
  title: string;
  creators: any[];
  date?: string;
  tags: any[];
}

/**
 * Get all collections in your Zotero library
 *
 * @returns Array of collections with hierarchy information
 *
 * @example
 * const collections = await getCollections()
 * collections.forEach(c => {
 *   console.log(`${c.name}: ${c.meta.numItems} items`)
 * })
 */
export async function getCollections(): Promise<Collection[]> {
  console.log(`[Zotero] Getting all collections`)

  // Call the actual mcp__zotero__get_collections tool
  const collections = await globalThis.mcp__zotero__get_collections({});

  console.log(`[Zotero] Found ${collections.length} collections`)

  return collections;
}

/**
 * Get items in a specific collection
 */
export async function getCollectionItems(
  collectionKey: string,
  limit?: number
): Promise<ZoteroItem[]> {
  console.log(`[Zotero] Getting items in collection: ${collectionKey}`)

  const result = await globalThis.mcp__zotero__get_collection_items({
    collection_key: collectionKey,
    limit: limit || 100
  });

  console.log(`[Zotero] Found ${result.length} items in collection`)

  return result;
}

/**
 * Find collection by name (case-insensitive)
 */
export async function findCollectionByName(
  name: string
): Promise<Collection | undefined> {
  const collections = await getCollections();

  return collections.find(c =>
    c.name.toLowerCase().includes(name.toLowerCase())
  );
}

/**
 * Get collection hierarchy (parent-child relationships)
 */
export async function getCollectionHierarchy(): Promise<{
  topLevel: Collection[];
  byParent: Record<string, Collection[]>;
}> {
  const collections = await getCollections();

  const topLevel: Collection[] = [];
  const byParent: Record<string, Collection[]> = {};

  collections.forEach(collection => {
    if (!collection.parentCollection || collection.parentCollection === false) {
      // Top-level collection
      topLevel.push(collection);
    } else {
      // Child collection
      const parentKey = String(collection.parentCollection);
      if (!byParent[parentKey]) {
        byParent[parentKey] = [];
      }
      byParent[parentKey].push(collection);
    }
  });

  console.log(`[Zotero] ${topLevel.length} top-level collections, ${Object.keys(byParent).length} with children`)

  return { topLevel, byParent };
}

/**
 * Get full collection tree as nested structure
 */
export async function getCollectionTree(): Promise<Array<Collection & { children?: any[] }>> {
  const { topLevel, byParent } = await getCollectionHierarchy();

  function buildTree(collection: Collection): Collection & { children?: any[] } {
    const children = byParent[collection.key] || [];

    return {
      ...collection,
      children: children.length > 0
        ? children.map(buildTree)
        : undefined
    };
  }

  return topLevel.map(buildTree);
}

/**
 * Print collection hierarchy (for debugging/display)
 */
export async function printCollectionHierarchy(): Promise<string> {
  const tree = await getCollectionTree();

  function formatTree(
    collections: Array<Collection & { children?: any[] }>,
    indent: string = ''
  ): string[] {
    const lines: string[] = [];

    collections.forEach((collection, i) => {
      const isLast = i === collections.length - 1;
      const connector = isLast ? '└─' : '├─';

      lines.push(`${indent}${connector} ${collection.name} (${collection.meta.numItems} items)`);

      if (collection.children && collection.children.length > 0) {
        const childIndent = indent + (isLast ? '   ' : '│  ');
        lines.push(...formatTree(collection.children, childIndent));
      }
    });

    return lines;
  }

  const output = [
    '# Zotero Collection Hierarchy',
    '',
    ...formatTree(tree)
  ].join('\n');

  console.log(output);

  return output;
}

/**
 * Find collections containing items with specific tag
 */
export async function findCollectionsByTag(tag: string): Promise<Collection[]> {
  const collections = await getCollections();

  // Get items for each collection and check tags
  const collectionsWithTag: Collection[] = [];

  for (const collection of collections) {
    const items = await getCollectionItems(collection.key, 10); // Sample first 10

    const hasTag = items.some(item =>
      item.tags.some(t => t.tag.toLowerCase().includes(tag.toLowerCase()))
    );

    if (hasTag) {
      collectionsWithTag.push(collection);
    }
  }

  console.log(`[Zotero] Found ${collectionsWithTag.length} collections with tag "${tag}"`)

  return collectionsWithTag;
}

/**
 * Get collection statistics
 */
export async function getCollectionStats(
  collectionKey: string
): Promise<{
  name: string;
  totalItems: number;
  itemTypes: Record<string, number>;
  recentItems: ZoteroItem[];
  topTags: Array<{ tag: string; count: number }>;
}> {
  console.log(`[Zotero] Getting statistics for collection: ${collectionKey}`)

  // Get collection metadata
  const collections = await getCollections();
  const collection = collections.find(c => c.key === collectionKey);

  if (!collection) {
    throw new Error(`Collection not found: ${collectionKey}`);
  }

  // Get all items
  const items = await getCollectionItems(collectionKey, 1000);

  // Count by item type
  const itemTypes: Record<string, number> = {};
  items.forEach(item => {
    itemTypes[item.itemType] = (itemTypes[item.itemType] || 0) + 1;
  });

  // Get recent items (by date added, assuming items are sorted)
  const recentItems = items.slice(0, 5);

  // Count tags
  const tagCounts: Record<string, number> = {};
  items.forEach(item => {
    item.tags.forEach(t => {
      const tag = t.tag;
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  const topTags = Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return {
    name: collection.name,
    totalItems: items.length,
    itemTypes,
    recentItems,
    topTags
  };
}

/**
 * Compare multiple collections
 */
export async function compareCollections(
  collectionKeys: string[]
): Promise<{
  collections: Array<{
    key: string;
    name: string;
    itemCount: number;
  }>;
  overlap: {
    sharedItems: number;
    uniqueToEach: Record<string, number>;
  };
}> {
  console.log(`[Zotero] Comparing ${collectionKeys.length} collections`)

  const collections = await getCollections();
  const collectionData = [];

  // Get items for each collection
  const itemsByCollection = new Map<string, Set<string>>();

  for (const key of collectionKeys) {
    const collection = collections.find(c => c.key === key);
    if (!collection) continue;

    const items = await getCollectionItems(key, 1000);
    const itemKeys = new Set(items.map(i => i.key));

    itemsByCollection.set(key, itemKeys);

    collectionData.push({
      key,
      name: collection.name,
      itemCount: items.length
    });
  }

  // Calculate overlap
  const allKeys = Array.from(itemsByCollection.values());
  const firstSet = allKeys[0];
  let sharedItems = firstSet.size;

  // Find intersection
  if (allKeys.length > 1) {
    const intersection = new Set(firstSet);
    allKeys.slice(1).forEach(set => {
      Array.from(intersection).forEach(key => {
        if (!set.has(key)) {
          intersection.delete(key);
        }
      });
    });
    sharedItems = intersection.size;
  }

  // Calculate unique items per collection
  const uniqueToEach: Record<string, number> = {};
  collectionKeys.forEach(key => {
    const thisSet = itemsByCollection.get(key);
    if (!thisSet) return;

    const otherKeys = collectionKeys.filter(k => k !== key);
    const otherSets = otherKeys
      .map(k => itemsByCollection.get(k))
      .filter((s): s is Set<string> => s !== undefined);

    let unique = thisSet.size;
    Array.from(thisSet).forEach(itemKey => {
      if (otherSets.some(set => set.has(itemKey))) {
        unique--;
      }
    });

    uniqueToEach[key] = unique;
  });

  return {
    collections: collectionData,
    overlap: {
      sharedItems,
      uniqueToEach
    }
  };
}

/**
 * Suggest collection based on item tags
 */
export async function suggestCollectionForItem(
  itemTags: string[]
): Promise<Collection[]> {
  console.log(`[Zotero] Suggesting collections for tags: ${itemTags.join(', ')}`)

  const collections = await getCollections();
  const suggestions: Array<Collection & { relevance: number }> = [];

  for (const collection of collections) {
    const items = await getCollectionItems(collection.key, 50); // Sample

    // Count tag matches
    let relevance = 0;
    items.forEach(item => {
      const itemTagStrings = item.tags.map(t => t.tag.toLowerCase());
      itemTags.forEach(tag => {
        if (itemTagStrings.some(t => t.includes(tag.toLowerCase()))) {
          relevance++;
        }
      });
    });

    if (relevance > 0) {
      suggestions.push({
        ...collection,
        relevance
      });
    }
  }

  // Sort by relevance
  suggestions.sort((a, b) => b.relevance - a.relevance);

  console.log(`[Zotero] Found ${suggestions.length} relevant collections`)

  return suggestions.slice(0, 5); // Top 5
}
