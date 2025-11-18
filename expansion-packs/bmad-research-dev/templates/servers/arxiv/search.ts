/**
 * ArXiv Search Server Wrapper
 * Wraps mcp__arxiv__search_papers MCP tool
 *
 * Based on: blazickjp/arxiv-mcp-server
 * API: https://github.com/blazickjp/arxiv-mcp-server
 *
 * Usage:
 *   import { search } from './servers/arxiv/search.ts'
 *   const papers = await search("attention mechanisms")
 */

interface SearchOptions {
  maxResults?: number;
  dateFrom?: string; // YYYY-MM-DD format
  categories?: string[]; // e.g., ["cs.AI", "cs.LG"]
}

interface Paper {
  id: string; // ArXiv ID (e.g., "2401.12345")
  title: string;
  authors: Array<{ name: string }>;
  summary: string; // Abstract
  published: string; // ISO date string
  updated?: string; // ISO date string
  primary_category: string;
  categories: string[];
  pdf_url: string;
  entry_id: string; // Full arXiv URL
  links: Array<{ href: string; rel: string; type: string }>;
}

/**
 * Search arXiv papers
 *
 * @param query - Search query (keywords, author:Name, cat:cs.LG, etc.)
 * @param options - Optional search configuration
 * @returns Array of papers matching the query
 *
 * @example
 * // Basic keyword search
 * const papers = await search("transformer architecture")
 *
 * @example
 * // Search with author (arXiv query syntax)
 * const papers = await search("au:Vaswani attention")
 *
 * @example
 * // Search within category
 * const papers = await search("few-shot learning", {
 *   categories: ["cs.LG", "cs.AI"]
 * })
 *
 * @example
 * // Recent papers only
 * const papers = await search("efficient attention", {
 *   dateFrom: "2023-01-01",
 *   maxResults: 20
 * })
 */
export async function search(
  query: string,
  options: SearchOptions = {}
): Promise<Paper[]> {
  console.log(`[ArXiv] Searching for: "${query}"`)

  // Call the actual mcp__arxiv__search_papers tool
  const results = await globalThis.mcp__arxiv__search_papers({
    query,
    max_results: options.maxResults || 10,
    date_from: options.dateFrom,
    categories: options.categories
  });

  console.log(`[ArXiv] Found ${results.length} papers`)

  return results;
}

/**
 * Search recent papers (last 1-2 years)
 *
 * @example
 * const recent = await searchRecent("flash attention", 1)
 */
export async function searchRecent(
  topic: string,
  yearsBack: number = 2
): Promise<Paper[]> {
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - yearsBack);

  return search(topic, {
    dateFrom: startDate.toISOString().split('T')[0],
    maxResults: 30
  });
}

/**
 * Search papers by specific author
 *
 * @example
 * const papers = await searchByAuthor("Vaswani", "attention")
 */
export async function searchByAuthor(
  authorName: string,
  additionalKeywords?: string
): Promise<Paper[]> {
  const query = additionalKeywords
    ? `au:${authorName} ${additionalKeywords}`
    : `au:${authorName}`;

  return search(query, {
    maxResults: 20
  });
}

/**
 * Search within specific arXiv category
 *
 * @example
 * const papers = await searchByCategory(["cs.LG", "cs.AI"], "reinforcement learning")
 */
export async function searchByCategory(
  categories: string[],
  keywords: string,
  maxResults: number = 20
): Promise<Paper[]> {
  return search(keywords, {
    categories,
    maxResults
  });
}

/**
 * Find papers from a specific time period
 *
 * @example
 * const papers = await searchDateRange("transformers", "2017-01-01", "2019-12-31")
 */
export async function searchDateRange(
  topic: string,
  dateFrom: string,
  dateTo?: string
): Promise<Paper[]> {
  const papers = await search(topic, {
    dateFrom,
    maxResults: 50
  });

  // Client-side filtering for end date
  if (dateTo) {
    const endDate = new Date(dateTo);
    return papers.filter(p => new Date(p.published) <= endDate);
  }

  return papers;
}

/**
 * Compare papers across time periods
 *
 * @example
 * const { early, recent } = await compareAcrossTime("efficient transformers")
 */
export async function compareAcrossTime(
  topic: string
): Promise<{ early: Paper[], recent: Paper[] }> {
  const currentYear = new Date().getFullYear();

  const [early, recent] = await Promise.all([
    searchDateRange(topic, `${currentYear - 5}-01-01`, `${currentYear - 3}-12-31`),
    searchDateRange(topic, `${currentYear - 1}-01-01`)
  ]);

  return { early, recent };
}

/**
 * Survey a research area comprehensively
 *
 * @example
 * const survey = await surveyArea("flash attention", ["cs.LG", "cs.AI"])
 * console.log(`Total papers: ${survey.total}`)
 * console.log(`Recent: ${survey.recent.length}`)
 */
export async function surveyArea(
  topic: string,
  categories?: string[]
): Promise<{
  total: number;
  recent: Paper[];
  older: Paper[];
  byYear: Record<number, number>;
  byCategory: Record<string, number>;
}> {
  // Get comprehensive results
  const allPapers = await search(topic, {
    categories,
    maxResults: 100
  });

  // Separate recent vs older
  const currentYear = new Date().getFullYear();
  const recent = allPapers.filter(p =>
    new Date(p.published).getFullYear() >= currentYear - 2
  );

  const older = allPapers.filter(p =>
    new Date(p.published).getFullYear() < currentYear - 2
  );

  // Count by year
  const byYear: Record<number, number> = {};
  allPapers.forEach(p => {
    const year = new Date(p.published).getFullYear();
    byYear[year] = (byYear[year] || 0) + 1;
  });

  // Count by category
  const byCategory: Record<string, number> = {};
  allPapers.forEach(p => {
    p.categories.forEach(cat => {
      byCategory[cat] = (byCategory[cat] || 0) + 1;
    });
  });

  return {
    total: allPapers.length,
    recent,
    older,
    byYear,
    byCategory
  };
}

/**
 * Find highly relevant papers (using arXiv's relevance ranking)
 *
 * @example
 * const topPapers = await findMostRelevant("neural architecture search", 5)
 */
export async function findMostRelevant(
  topic: string,
  count: number = 10
): Promise<Paper[]> {
  // ArXiv returns results sorted by relevance by default
  const papers = await search(topic, {
    maxResults: count
  });

  return papers.slice(0, count);
}

/**
 * Get paper metadata without downloading
 * (Search for specific arXiv ID)
 *
 * @example
 * const paper = await getPaperMetadata("2401.12345")
 */
export async function getPaperMetadata(arxivId: string): Promise<Paper | null> {
  // Normalize ID (remove arXiv: prefix if present)
  const normalizedId = arxivId.replace(/^arXiv:/i, '');

  // Search by ID
  const results = await search(normalizedId, { maxResults: 1 });

  return results.length > 0 ? results[0] : null;
}

/**
 * Batch search for multiple topics in parallel
 *
 * @example
 * const results = await batchSearch([
 *   "flash attention",
 *   "sparse transformers",
 *   "efficient attention"
 * ])
 */
export async function batchSearch(
  topics: string[],
  options: SearchOptions = {}
): Promise<Record<string, Paper[]>> {
  console.log(`[ArXiv] Batch searching ${topics.length} topics...`)

  const searches = topics.map(topic =>
    search(topic, options).then(results => ({ topic, results }))
  );

  const allResults = await Promise.all(searches);

  const resultsByTopic: Record<string, Paper[]> = {};
  allResults.forEach(({ topic, results }) => {
    resultsByTopic[topic] = results;
  });

  console.log(`[ArXiv] Batch search complete`)

  return resultsByTopic;
}

/**
 * Extract arXiv ID from paper object or URL
 *
 * @example
 * const id = extractArxivId(paper) // "2401.12345"
 * const id2 = extractArxivId("https://arxiv.org/abs/2401.12345") // "2401.12345"
 */
export function extractArxivId(paperOrUrl: Paper | string): string {
  if (typeof paperOrUrl === 'string') {
    // Extract from URL
    const match = paperOrUrl.match(/(\d{4}\.\d{4,5})/);
    return match ? match[1] : paperOrUrl;
  } else {
    // Extract from paper object
    return paperOrUrl.id;
  }
}

/**
 * Format paper for display
 */
export function formatPaper(paper: Paper): string {
  const authors = paper.authors.slice(0, 3).map(a => a.name).join(', ');
  const moreAuthors = paper.authors.length > 3 ? ' et al.' : '';

  return `
**${paper.title}**
- **Authors:** ${authors}${moreAuthors}
- **Published:** ${new Date(paper.published).toLocaleDateString()}
- **Categories:** ${paper.categories.join(', ')}
- **ArXiv ID:** ${paper.id}
- **PDF:** ${paper.pdf_url}

**Abstract:**
${paper.summary}
  `.trim();
}
