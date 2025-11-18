/**
 * Web Search Server Wrapper
 * Wraps Claude Code's built-in WebSearch tool
 *
 * Usage:
 *   import { search } from './servers/web/search.ts'
 *   const results = await search("transformer optimization 2024")
 */

interface SearchOptions {
  query: string;
  allowedDomains?: string[];
  blockedDomains?: string[];
  maxResults?: number;
}

interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  publishedDate?: string;
}

/**
 * Search the web using WebSearch tool
 *
 * @param query - Search query (2-5 focused keywords recommended)
 * @param options - Optional search configuration
 * @returns Array of search results
 *
 * @example
 * // Basic search
 * const results = await search("attention mechanisms 2024")
 *
 * @example
 * // Domain-restricted search
 * const results = await search("pytorch tutorial", {
 *   allowedDomains: ["pytorch.org", "github.com"]
 * })
 *
 * @example
 * // Block domains
 * const results = await search("ML frameworks", {
 *   blockedDomains: ["medium.com"]
 * })
 */
export async function search(
  query: string,
  options: Omit<SearchOptions, 'query'> = {}
): Promise<SearchResult[]> {
  // Call the actual WebSearch tool
  // In practice, this would be: await WebSearch({ query, ...options })
  // For now, this is a template showing the structure

  console.log(`[Web Search] Searching for: "${query}"`)

  // This is where the actual WebSearch MCP call happens
  // The agent will replace this with the real tool call
  const results = await globalThis.WebSearch({
    query,
    allowed_domains: options.allowedDomains,
    blocked_domains: options.blockedDomains
  });

  console.log(`[Web Search] Found ${results.length} results`)

  return results.slice(0, options.maxResults || 10);
}

/**
 * Search official documentation sites
 */
export async function searchDocs(framework: string, query: string): Promise<SearchResult[]> {
  const docSites: Record<string, string[]> = {
    pytorch: ["pytorch.org"],
    tensorflow: ["tensorflow.org"],
    react: ["react.dev", "reactjs.org"],
    nextjs: ["nextjs.org"],
    anthropic: ["docs.anthropic.com"]
  };

  const domains = docSites[framework.toLowerCase()] || [];

  return search(`${framework} ${query}`, {
    allowedDomains: domains
  });
}

/**
 * Search GitHub repositories
 */
export async function searchGitHub(query: string): Promise<SearchResult[]> {
  return search(`site:github.com ${query}`);
}

/**
 * Search technical blogs
 */
export async function searchBlogs(topic: string): Promise<SearchResult[]> {
  const blogDomains = [
    "dev.to",
    "medium.com",
    "towardsdatascience.com",
    "blog.google",
    "engineering.fb.com"
  ];

  return search(topic, {
    allowedDomains: blogDomains
  });
}
