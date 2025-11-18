/**
 * Zotero Search Server Wrapper
 * Wraps mcp__zotero__search MCP tool
 *
 * Usage:
 *   import { search } from './servers/zotero/search.ts'
 *   const items = await search("attention mechanisms")
 */

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
  tags: Array<{ tag: string }>;
  collections: string[];
  relations: Record<string, any>;
  dateAdded: string;
  dateModified: string;
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
  console.log(`[Zotero] Searching library for: "${query || 'all items'}"`)

  // Call the actual mcp__zotero__search tool
  const results = await globalThis.mcp__zotero__search({
    query,
    collection_id: options.collectionId,
    tag: options.tag
  });

  console.log(`[Zotero] Found ${results.length} items in library`)

  // Filter by item type if specified
  let filteredResults = results;
  if (options.itemType) {
    filteredResults = results.filter(
      (item: ZoteroItem) => item.itemType === options.itemType
    );
    console.log(`[Zotero] ${filteredResults.length} items after type filtering`)
  }

  // Limit results if specified
  if (options.limit) {
    filteredResults = filteredResults.slice(0, options.limit);
  }

  return filteredResults;
}

/**
 * Search by author name
 */
export async function searchByAuthor(
  authorName: string,
  additionalKeywords?: string
): Promise<ZoteroItem[]> {
  const items = await search(additionalKeywords);

  // Filter by author
  return items.filter(item =>
    item.creators.some(creator => {
      const fullName = creator.name ||
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
  const allItems = await search();

  return allItems.filter(item => {
    const itemTags = item.tags.map(t => t.tag.toLowerCase());
    return tags.every(tag =>
      itemTags.some(itemTag => itemTag.includes(tag.toLowerCase()))
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
    .filter(item => new Date(item.dateAdded) >= cutoffDate)
    .sort((a, b) =>
      new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
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

  return items.filter(item => {
    if (!item.date) return false;
    const itemYear = parseInt(item.date.match(/\d{4}/)?.[0] || '0');
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

  return items.filter(item => {
    if (!item.date) return false;
    const itemYear = parseInt(item.date.match(/\d{4}/)?.[0] || '0');
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
    item => !exactMatches.some(exact => exact.key === item.key)
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
    const hasContent = libraryItems.some(item => {
      const searchText = [
        item.title,
        item.abstractNote || '',
        ...item.tags.map(t => t.tag)
      ].join(' ').toLowerCase();

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
    coverage: covered.length / expectedTopics.length
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
  const allItems = await search();

  // Count by type
  const byType: Record<string, number> = {};
  allItems.forEach(item => {
    byType[item.itemType] = (byType[item.itemType] || 0) + 1;
  });

  // Count by year
  const byYear: Record<string, number> = {};
  allItems.forEach(item => {
    if (item.date) {
      const year = item.date.match(/\d{4}/)?.[0] || 'unknown';
      byYear[year] = (byYear[year] || 0) + 1;
    }
  });

  // Top tags
  const tagCounts: Record<string, number> = {};
  allItems.forEach(item => {
    item.tags.forEach(t => {
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
    recentAdditions: recent.length
  };
}
