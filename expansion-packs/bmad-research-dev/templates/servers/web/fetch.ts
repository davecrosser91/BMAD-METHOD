/**
 * Web Fetch Server Wrapper
 * Wraps Claude Code's built-in WebFetch tool
 *
 * Usage:
 *   import { fetch } from './servers/web/fetch.ts'
 *   const content = await fetch("https://example.com", "Extract main points")
 */

interface FetchOptions {
  url: string;
  prompt: string;
  extractTables?: boolean;
  extractCode?: boolean;
}

interface FetchResult {
  content: string;
  url: string;
  extractedAt: string;
  metadata?: {
    title?: string;
    author?: string;
    publishedDate?: string;
  };
}

/**
 * Fetch and extract content from a URL
 *
 * @param url - The URL to fetch (must be valid HTTPS)
 * @param prompt - What information to extract from the page
 * @param options - Optional configuration
 * @returns Extracted content
 *
 * @example
 * // Extract specific information
 * const content = await fetch(
 *   "https://pytorch.org/tutorials/beginner/basics/quickstart_tutorial.html",
 *   "Extract code examples for loading data"
 * )
 *
 * @example
 * // Extract blog post content
 * const article = await fetch(
 *   "https://blog.google/technology/ai/...",
 *   "Summarize the main technical innovations"
 * )
 */
export async function fetch(
  url: string,
  prompt: string
): Promise<FetchResult> {
  console.log(`[Web Fetch] Fetching: ${url}`)
  console.log(`[Web Fetch] Prompt: ${prompt}`)

  // Validate URL
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    throw new Error(`Invalid URL: ${url}. Must start with http:// or https://`)
  }

  // Call the actual WebFetch tool
  const result = await globalThis.WebFetch({
    url,
    prompt
  });

  console.log(`[Web Fetch] Successfully extracted content from ${url}`)

  return {
    content: result,
    url,
    extractedAt: new Date().toISOString()
  };
}

/**
 * Fetch multiple URLs in parallel
 */
export async function fetchMultiple(
  urls: string[],
  prompt: string
): Promise<FetchResult[]> {
  console.log(`[Web Fetch] Fetching ${urls.length} URLs in parallel...`)

  const results = await Promise.all(
    urls.map(url => fetch(url, prompt))
  );

  console.log(`[Web Fetch] Completed fetching ${results.length} URLs`)

  return results;
}

/**
 * Fetch and extract code examples
 */
export async function fetchCodeExamples(url: string): Promise<string[]> {
  const result = await fetch(
    url,
    "Extract all code examples. Return each code block separately."
  );

  // Parse code blocks from markdown
  const codeBlocks = result.content.match(/```[\s\S]*?```/g) || [];
  return codeBlocks.map(block =>
    block.replace(/```\w*\n?/g, '').replace(/```$/g, '').trim()
  );
}

/**
 * Fetch GitHub README
 */
export async function fetchGitHubReadme(repoUrl: string): Promise<FetchResult> {
  const readmeUrl = `${repoUrl}/blob/main/README.md`;
  return fetch(
    readmeUrl,
    "Extract: project description, key features, installation instructions, and usage examples"
  );
}

/**
 * Fetch documentation page
 */
export async function fetchDocs(url: string, topic: string): Promise<FetchResult> {
  return fetch(
    url,
    `Extract documentation about ${topic}. Include API signatures, parameters, examples, and best practices.`
  );
}
