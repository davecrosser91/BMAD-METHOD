/**
 * Zotero Collections Server - Direct Web API
 * Makes direct HTTPS requests to api.zotero.org (NO MCP)
 *
 * API Docs: https://www.zotero.org/support/dev/web_api/v3/basics
 *
 * Usage:
 *   import { getCollections } from './servers/zotero/get-collections.ts'
 *   const collections = await getCollections()
 */

// Environment variables (set in .env file)
declare const ZOTERO_API_KEY: string;
declare const ZOTERO_USER_ID: string;

interface Collection {
  key: string;
  version: number;
  library: {
    type: string;
    id: number;
    name: string;
  };
  data: {
    key: string;
    version: number;
    name: string;
    parentCollection: boolean | string; // false or parent key
  };
  meta: {
    numCollections: number; // Number of subcollections
    numItems: number; // Number of items
  };
}

interface ZoteroItem {
  key: string;
  data: {
    itemType: string;
    title: string;
    creators: any[];
    date?: string;
    tags: any[];
  };
}

/**
 * Get environment configuration
 */
function getConfig(): { apiKey: string; userId: string } {
  const apiKey = typeof ZOTERO_API_KEY !== 'undefined' ? ZOTERO_API_KEY : '';
  const userId = typeof ZOTERO_USER_ID !== 'undefined' ? ZOTERO_USER_ID : '';

  if (!apiKey || !userId) {
    throw new Error(
      'Zotero credentials not found. Set ZOTERO_API_KEY and ZOTERO_USER_ID in .env file.'
    );
  }

  return { apiKey, userId };
}

/**
 * Make direct API request to Zotero
 */
async function apiRequest<T>(
  endpoint: string,
  params: Record<string, string> = {}
): Promise<T> {
  const { apiKey, userId } = getConfig();

  // Build URL with query parameters
  const url = new URL(`https://api.zotero.org/users/${userId}${endpoint}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.append(key, value);
  });

  console.log(`[Zotero API] GET ${url.pathname}${url.search}`);

  // Make HTTPS request
  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Zotero-API-Key': apiKey,
      'Zotero-API-Version': '3',
    },
  });

  if (!response.ok) {
    throw new Error(
      `Zotero API error: ${response.status} ${response.statusText}`
    );
  }

  return (await response.json()) as T;
}

/**
 * Get all collections in your Zotero library
 *
 * @returns Array of collections with hierarchy information
 *
 * @example
 * const collections = await getCollections()
 * collections.forEach(c => {
 *   console.log(`${c.data.name}: ${c.meta.numItems} items`)
 * })
 */
export async function getCollections(): Promise<Collection[]> {
  console.log(`[Zotero] Getting all collections`);

  const collections = await apiRequest<Collection[]>('/collections', {
    limit: '100',
  });

  console.log(`[Zotero] Found ${collections.length} collections`);

  return collections;
}

/**
 * Get items in a specific collection
 */
export async function getCollectionItems(
  collectionKey: string,
  limit?: number
): Promise<ZoteroItem[]> {
  console.log(`[Zotero] Getting items in collection: ${collectionKey}`);

  const items = await apiRequest<ZoteroItem[]>(
    `/collections/${collectionKey}/items`,
    {
      limit: (limit || 100).toString(),
    }
  );

  console.log(`[Zotero] Found ${items.length} items in collection`);

  return items;
}

/**
 * Find collection by name (case-insensitive)
 */
export async function findCollectionByName(
  name: string
): Promise<Collection | undefined> {
  const collections = await getCollections();

  return collections.find((c) =>
    c.data.name.toLowerCase().includes(name.toLowerCase())
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

  collections.forEach((collection) => {
    if (
      collection.data.parentCollection === false ||
      !collection.data.parentCollection
    ) {
      topLevel.push(collection);
    } else {
      const parentKey =
        typeof collection.data.parentCollection === 'string'
          ? collection.data.parentCollection
          : '';
      if (!byParent[parentKey]) {
        byParent[parentKey] = [];
      }
      byParent[parentKey].push(collection);
    }
  });

  return { topLevel, byParent };
}

/**
 * Print collection hierarchy in tree format
 */
export async function printCollectionHierarchy(): Promise<void> {
  const { topLevel, byParent } = await getCollectionHierarchy();

  console.log(`## Your Zotero Collections\n`);

  function printCollection(collection: Collection, indent: number = 0) {
    const prefix = '  '.repeat(indent);
    console.log(
      `${prefix}📁 ${collection.data.name} (${collection.meta.numItems} items)`
    );

    // Print children
    const children = byParent[collection.key] || [];
    children.forEach((child) => printCollection(child, indent + 1));
  }

  topLevel.forEach((collection) => printCollection(collection));
}

/**
 * Get total item count across all collections
 */
export async function getTotalItemCount(): Promise<{
  total: number;
  byCollection: Record<string, number>;
}> {
  const collections = await getCollections();

  const byCollection: Record<string, number> = {};
  let total = 0;

  collections.forEach((collection) => {
    byCollection[collection.data.name] = collection.meta.numItems;
    total += collection.meta.numItems;
  });

  return { total, byCollection };
}

/**
 * Find collections by keyword
 */
export async function findCollectionsByKeyword(
  keyword: string
): Promise<Collection[]> {
  const collections = await getCollections();

  return collections.filter((c) =>
    c.data.name.toLowerCase().includes(keyword.toLowerCase())
  );
}

/**
 * Get largest collections
 */
export async function getLargestCollections(
  limit: number = 10
): Promise<Collection[]> {
  const collections = await getCollections();

  return collections
    .sort((a, b) => b.meta.numItems - a.meta.numItems)
    .slice(0, limit);
}
