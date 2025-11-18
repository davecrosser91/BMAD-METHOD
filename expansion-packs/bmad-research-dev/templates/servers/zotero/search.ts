/**
 * Zotero Search Server - Direct Web API
 * Makes direct HTTPS requests to api.zotero.org (NO MCP)
 *
 * API Docs: https://www.zotero.org/support/dev/web_api/v3/basics
 *
 * Usage:
 *   import { search } from './servers/zotero/search.ts'
 *   const items = await search("attention mechanisms")
 */

// Environment variables (set in .env file)
declare const ZOTERO_API_KEY: string;
declare const ZOTERO_USER_ID: string;

interface SearchOptions {
  query?: string;
  collectionId?: string;
  tag?: string;
  itemType?: 'book' | 'journalArticle' | 'conferencePaper' | 'thesis' | 'webpage';
  limit?: number;
}

interface ZoteroItem {
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
    itemType: string;
    title: string;
    creators: Array<{
      creatorType: string;
      firstName?: string;
      lastName: string;
      name?: string;
    }>;
    abstractNote?: string;
    publicationTitle?: string;
    date?: string;
    url?: string;
    tags: Array<{ tag: string; type?: number }>;
    collections: string[];
    relations: Record<string, any>;
    dateAdded: string;
    dateModified: string;
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
async function apiRequest(
  endpoint: string,
  params: Record<string, string> = {}
): Promise<ZoteroItem[]> {
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

  const items: ZoteroItem[] = await response.json();
  console.log(`[Zotero API] Received ${items.length} items`);

  return items;
}

/**
 * Search Zotero library
 *
 * @param query - Keywords to search (title, author, abstract)
 * @param options - Optional search filters
 * @returns Array of Zotero items matching the search
 *
 * @example
 * // Basic keyword search
 * const items = await search("transformer architecture")
 *
 * @example
 * // Search within specific collection
 * const items = await search("attention", {
 *   collectionId: "ABC123"
 * })
 *
 * @example
 * // Search by tag
 * const items = await search(undefined, {
 *   tag: "deep-learning"
 * })
 *
 * @example
 * // Search for specific item type
 * const articles = await search("neural networks", {
 *   itemType: 'journalArticle'
 * })
 */
export async function search(
  query?: string,
  options: Omit<SearchOptions, 'query'> = {}
): Promise<ZoteroItem[]> {
  console.log(`[Zotero] Searching library for: "${query || 'all items'}"`);

  // Build API parameters
  const params: Record<string, string> = {};

  if (query) {
    params.q = query;
  }

  if (options.tag) {
    params.tag = options.tag;
  }

  if (options.itemType) {
    params.itemType = options.itemType;
  }

  if (options.limit) {
    params.limit = options.limit.toString();
  } else {
    params.limit = '100'; // Default limit
  }

  // Determine endpoint
  let endpoint = '/items';
  if (options.collectionId) {
    endpoint = `/collections/${options.collectionId}/items`;
  }

  // Make API request
  const results = await apiRequest(endpoint, params);

  console.log(`[Zotero] Found ${results.length} items in library`);

  return results;
}

/**
 * Search by author name
 */
export async function searchByAuthor(
  authorName: string,
  additionalKeywords?: string
): Promise<ZoteroItem[]> {
  const searchQuery = additionalKeywords
    ? `${authorName} ${additionalKeywords}`
    : authorName;

  const items = await search(searchQuery);

  // Filter by author (client-side for precision)
  return items.filter((item) =>
    item.data.creators.some((creator) => {
      const fullName =
        creator.name ||
        `${creator.firstName || ''} ${creator.lastName}`.trim();
      return fullName.toLowerCase().includes(authorName.toLowerCase());
    })
  );
}

/**
 * Search by tag
 */
export async function searchByTag(tag: string): Promise<ZoteroItem[]> {
  return search(undefined, { tag });
}

/**
 * Search by multiple tags (AND logic)
 */
export async function searchByTags(tags: string[]): Promise<ZoteroItem[]> {
  // Get all items (Zotero API doesn't support multiple tag AND)
  const allItems = await search();

  // Client-side filtering for multiple tags
  return allItems.filter((item) => {
    const itemTags = item.data.tags.map((t) => t.tag.toLowerCase());
    return tags.every((tag) =>
      itemTags.some((itemTag) => itemTag.includes(tag.toLowerCase()))
    );
  });
}

/**
 * Search recent additions to library
 */
export async function searchRecent(
  daysBack: number = 30,
  keywords?: string
): Promise<ZoteroItem[]> {
  const items = await search(keywords);

  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysBack);

  return items
    .filter((item) => new Date(item.data.dateAdded) >= cutoffDate)
    .sort(
      (a, b) =>
        new Date(b.data.dateAdded).getTime() -
        new Date(a.data.dateAdded).getTime()
    );
}

/**
 * Search by publication year
 */
export async function searchByYear(
  year: number,
  keywords?: string
): Promise<ZoteroItem[]> {
  const items = await search(keywords);

  return items.filter((item) => {
    if (!item.data.date) return false;
    const itemYear = parseInt(item.data.date.match(/\d{4}/)?.[0] || '0');
    return itemYear === year;
  });
}

/**
 * Search by year range
 */
export async function searchByYearRange(
  startYear: number,
  endYear: number,
  keywords?: string
): Promise<ZoteroItem[]> {
  const items = await search(keywords);

  return items.filter((item) => {
    if (!item.data.date) return false;
    const itemYear = parseInt(item.data.date.match(/\d{4}/)?.[0] || '0');
    return itemYear >= startYear && itemYear <= endYear;
  });
}

/**
 * Find papers by topic using tag-based organization
 */
export async function findByTopic(topic: string): Promise<{
  exactMatches: ZoteroItem[];
  relatedMatches: ZoteroItem[];
}> {
  const exactMatches = await searchByTag(topic);

  // Search for related items (title/abstract contains topic)
  const allMatches = await search(topic);
  const relatedMatches = allMatches.filter(
    (item) => !exactMatches.some((exact) => exact.key === item.key)
  );

  return { exactMatches, relatedMatches };
}

/**
 * Identify gaps in library coverage
 */
export async function identifyGaps(
  researchArea: string,
  expectedTopics: string[]
): Promise<{
  covered: string[];
  missing: string[];
  coverage: number; // 0-1
}> {
  const libraryItems = await search(researchArea);

  const covered: string[] = [];
  const missing: string[] = [];

  for (const topic of expectedTopics) {
    const hasContent = libraryItems.some((item) => {
      const searchText = [
        item.data.title,
        item.data.abstractNote || '',
        ...item.data.tags.map((t) => t.tag),
      ]
        .join(' ')
        .toLowerCase();

      return searchText.includes(topic.toLowerCase());
    });

    if (hasContent) {
      covered.push(topic);
    } else {
      missing.push(topic);
    }
  }

  return {
    covered,
    missing,
    coverage: covered.length / expectedTopics.length,
  };
}

/**
 * Get library statistics
 */
export async function getStats(): Promise<{
  totalItems: number;
  byType: Record<string, number>;
  byYear: Record<string, number>;
  topTags: Array<{ tag: string; count: number }>;
  recentAdditions: number;
}> {
  const allItems = await search(undefined, { limit: 10000 });

  // Count by type
  const byType: Record<string, number> = {};
  allItems.forEach((item) => {
    byType[item.data.itemType] = (byType[item.data.itemType] || 0) + 1;
  });

  // Count by year
  const byYear: Record<string, number> = {};
  allItems.forEach((item) => {
    if (item.data.date) {
      const year = item.data.date.match(/\d{4}/)?.[0] || 'unknown';
      byYear[year] = (byYear[year] || 0) + 1;
    }
  });

  // Top tags
  const tagCounts: Record<string, number> = {};
  allItems.forEach((item) => {
    item.data.tags.forEach((t) => {
      tagCounts[t.tag] = (tagCounts[t.tag] || 0) + 1;
    });
  });
  const topTags = Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20);

  // Recent additions (last 30 days)
  const recent = await searchRecent(30);

  return {
    totalItems: allItems.length,
    byType,
    byYear,
    topTags,
    recentAdditions: recent.length,
  };
}
