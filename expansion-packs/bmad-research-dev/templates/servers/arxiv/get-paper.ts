/**
 * ArXiv Paper Management Server Wrapper
 * Wraps mcp__arxiv__download_paper, mcp__arxiv__read_paper, and mcp__arxiv__list_papers MCP tools
 *
 * Based on: blazickjp/arxiv-mcp-server
 * API: https://github.com/blazickjp/arxiv-mcp-server
 *
 * Usage:
 *   import { downloadPaper, readPaper } from './servers/arxiv/get-paper.ts'
 *   await downloadPaper("2401.12345")
 *   const content = await readPaper("2401.12345")
 */

interface DownloadResult {
  success: boolean;
  paper_id: string;
  message: string;
  storage_path?: string;
}

interface PaperContent {
  paper_id: string;
  title: string;
  authors: string[];
  abstract: string;
  full_text: string; // Complete paper text content
  metadata: {
    published: string;
    updated?: string;
    categories: string[];
    pdf_url: string;
  };
}

interface StoredPaper {
  paper_id: string;
  title: string;
  downloaded_date: string;
  storage_path: string;
}

/**
 * Download a paper from arXiv and store it locally
 *
 * Papers are stored in ~/.arxiv-mcp-server/papers/ by default
 * (configurable via ARXIV_STORAGE_PATH environment variable)
 *
 * @param paperId - ArXiv paper identifier (e.g., "2401.12345")
 * @returns Download result with success status and storage path
 *
 * @example
 * // Download a single paper
 * const result = await downloadPaper("2401.12345")
 * if (result.success) {
 *   console.log(`Downloaded to: ${result.storage_path}`)
 * }
 *
 * @example
 * // Download paper then read it
 * await downloadPaper("2401.12345")
 * const content = await readPaper("2401.12345")
 * console.log(content.full_text)
 */
export async function downloadPaper(paperId: string): Promise<DownloadResult> {
  // Normalize arXiv ID (remove "arXiv:" prefix if present)
  const normalizedId = paperId.replace(/^arXiv:/i, '').trim();

  console.log(`[ArXiv] Downloading paper: ${normalizedId}`)

  // Call the actual mcp__arxiv__download_paper tool
  const result = await globalThis.mcp__arxiv__download_paper({
    paper_id: normalizedId
  });

  if (result.success) {
    console.log(`[ArXiv] ✅ Downloaded successfully: ${normalizedId}`)
  } else {
    console.log(`[ArXiv] ❌ Download failed: ${result.message}`)
  }

  return result;
}

/**
 * Download multiple papers in parallel
 *
 * @example
 * const results = await downloadPapers([
 *   "2401.12345",
 *   "2402.23456",
 *   "2403.34567"
 * ])
 * const successful = results.filter(r => r.success)
 * console.log(`Downloaded ${successful.length}/${results.length} papers`)
 */
export async function downloadPapers(
  paperIds: string[]
): Promise<DownloadResult[]> {
  console.log(`[ArXiv] Downloading ${paperIds.length} papers in parallel...`)

  const results = await Promise.all(
    paperIds.map(id => downloadPaper(id))
  );

  const successful = results.filter(r => r.success).length;
  console.log(`[ArXiv] Downloaded ${successful}/${paperIds.length} papers`)

  return results;
}

/**
 * Read the full text content of a downloaded paper
 *
 * Paper must be downloaded first using downloadPaper()
 *
 * @param paperId - ArXiv paper identifier
 * @returns Full paper content including text, metadata, and abstract
 *
 * @example
 * // Read a downloaded paper
 * const content = await readPaper("2401.12345")
 * console.log(`Title: ${content.title}`)
 * console.log(`Abstract: ${content.abstract}`)
 * console.log(`Full text length: ${content.full_text.length} chars`)
 *
 * @example
 * // Search for methodology section
 * const content = await readPaper("2401.12345")
 * if (content.full_text.includes("Methodology")) {
 *   const methodologyStart = content.full_text.indexOf("Methodology")
 *   const methodologySection = content.full_text.slice(methodologyStart, methodologyStart + 2000)
 *   console.log(methodologySection)
 * }
 */
export async function readPaper(paperId: string): Promise<PaperContent> {
  const normalizedId = paperId.replace(/^arXiv:/i, '').trim();

  console.log(`[ArXiv] Reading paper: ${normalizedId}`)

  // Call the actual mcp__arxiv__read_paper tool
  const content = await globalThis.mcp__arxiv__read_paper({
    paper_id: normalizedId
  });

  console.log(`[ArXiv] Read paper: "${content.title}" (${content.full_text.length} chars)`)

  return content;
}

/**
 * List all downloaded papers
 *
 * @returns Array of papers stored in local storage
 *
 * @example
 * const papers = await listDownloadedPapers()
 * console.log(`You have ${papers.length} papers downloaded:`)
 * papers.forEach(p => {
 *   console.log(`- ${p.paper_id}: ${p.title}`)
 * })
 */
export async function listDownloadedPapers(): Promise<StoredPaper[]> {
  console.log(`[ArXiv] Listing downloaded papers...`)

  // Call the actual mcp__arxiv__list_papers tool
  const papers = await globalThis.mcp__arxiv__list_papers({});

  console.log(`[ArXiv] Found ${papers.length} downloaded papers`)

  return papers;
}

/**
 * Check if a paper is already downloaded
 *
 * @example
 * if (await isPaperDownloaded("2401.12345")) {
 *   console.log("Paper already downloaded, reading from cache...")
 *   const content = await readPaper("2401.12345")
 * } else {
 *   await downloadPaper("2401.12345")
 * }
 */
export async function isPaperDownloaded(paperId: string): Promise<boolean> {
  const normalizedId = paperId.replace(/^arXiv:/i, '').trim();
  const papers = await listDownloadedPapers();

  return papers.some(p => p.paper_id === normalizedId);
}

/**
 * Get or download paper (downloads only if not already cached)
 *
 * @example
 * // Always works - downloads if needed, reads from cache if available
 * const content = await getPaper("2401.12345")
 */
export async function getPaper(paperId: string): Promise<PaperContent> {
  const normalizedId = paperId.replace(/^arXiv:/i, '').trim();

  // Check if already downloaded
  const isDownloaded = await isPaperDownloaded(normalizedId);

  if (!isDownloaded) {
    console.log(`[ArXiv] Paper not cached, downloading first...`)
    const result = await downloadPaper(normalizedId);

    if (!result.success) {
      throw new Error(`Failed to download paper ${normalizedId}: ${result.message}`);
    }
  } else {
    console.log(`[ArXiv] Paper found in cache, reading...`)
  }

  return readPaper(normalizedId);
}

/**
 * Get multiple papers (downloads missing ones)
 *
 * @example
 * const papers = await getPapers([
 *   "2401.12345",
 *   "2402.23456",
 *   "2403.34567"
 * ])
 */
export async function getPapers(paperIds: string[]): Promise<PaperContent[]> {
  console.log(`[ArXiv] Getting ${paperIds.length} papers...`)

  // Check which ones need downloading
  const downloadStatus = await Promise.all(
    paperIds.map(async id => ({
      id,
      downloaded: await isPaperDownloaded(id)
    }))
  );

  const needDownload = downloadStatus
    .filter(s => !s.downloaded)
    .map(s => s.id);

  // Download missing papers
  if (needDownload.length > 0) {
    console.log(`[ArXiv] Downloading ${needDownload.length} missing papers...`)
    await downloadPapers(needDownload);
  }

  // Read all papers
  const papers = await Promise.all(
    paperIds.map(id => readPaper(id))
  );

  console.log(`[ArXiv] Retrieved ${papers.length} papers`)

  return papers;
}

/**
 * Extract methodology section from paper
 *
 * @example
 * const methodology = await extractMethodology("2401.12345")
 * console.log(methodology)
 */
export async function extractMethodology(paperId: string): Promise<string> {
  const content = await getPaper(paperId);

  const text = content.full_text;

  // Common methodology section headers
  const headers = [
    'Methodology',
    'Methods',
    'Method',
    'Approach',
    'Proposed Method',
    'Our Approach'
  ];

  for (const header of headers) {
    const regex = new RegExp(`\\n\\s*\\d*\\.?\\s*${header}\\s*\\n`, 'i');
    const match = text.match(regex);

    if (match && match.index !== undefined) {
      // Extract from header to next major section (or 5000 chars)
      const start = match.index;
      const nextSectionRegex = /\n\s*\d+\.\s*[A-Z][a-z]+\s*\n/g;
      nextSectionRegex.lastIndex = start + 100; // Skip current header

      const nextSection = nextSectionRegex.exec(text);
      const end = nextSection ? nextSection.index : start + 5000;

      return text.slice(start, end).trim();
    }
  }

  // Fallback: return section around keyword "method"
  const methodIndex = text.toLowerCase().indexOf('method');
  if (methodIndex !== -1) {
    return text.slice(Math.max(0, methodIndex - 500), methodIndex + 2500).trim();
  }

  return 'Methodology section not clearly identified';
}

/**
 * Extract experimental results from paper
 *
 * @example
 * const results = await extractResults("2401.12345")
 */
export async function extractResults(paperId: string): Promise<string> {
  const content = await getPaper(paperId);

  const text = content.full_text;

  const headers = [
    'Results',
    'Experiments',
    'Experimental Results',
    'Evaluation',
    'Empirical Results'
  ];

  for (const header of headers) {
    const regex = new RegExp(`\\n\\s*\\d*\\.?\\s*${header}\\s*\\n`, 'i');
    const match = text.match(regex);

    if (match && match.index !== undefined) {
      const start = match.index;
      const nextSectionRegex = /\n\s*\d+\.\s*[A-Z][a-z]+\s*\n/g;
      nextSectionRegex.lastIndex = start + 100;

      const nextSection = nextSectionRegex.exec(text);
      const end = nextSection ? nextSection.index : start + 5000;

      return text.slice(start, end).trim();
    }
  }

  return 'Results section not clearly identified';
}

/**
 * Check for code/data availability
 *
 * @example
 * const availability = await checkReproducibility("2401.12345")
 * if (availability.hasCode) {
 *   console.log(`Code available at: ${availability.codeUrl}`)
 * }
 */
export async function checkReproducibility(paperId: string): Promise<{
  hasCode: boolean;
  codeUrl?: string;
  hasData: boolean;
  dataUrl?: string;
  keywords: string[];
}> {
  const content = await getPaper(paperId);
  const fullText = content.abstract + ' ' + content.full_text;

  // Check for code availability
  const hasCode = /github|code available|repository available|source code/i.test(fullText);
  const codeMatch = fullText.match(/github\.com\/[\w-]+\/[\w-]+/i);
  const codeUrl = codeMatch ? `https://${codeMatch[0]}` : undefined;

  // Check for data availability
  const hasData = /dataset.*available|data.*available|data.*provided/i.test(fullText);
  const dataMatch = fullText.match(/(https?:\/\/[^\s]+(?:dataset|data))/i);
  const dataUrl = dataMatch ? dataMatch[1] : undefined;

  // Extract reproducibility keywords
  const keywords = [];
  if (/open.source/i.test(fullText)) keywords.push('open-source');
  if (/reproducible/i.test(fullText)) keywords.push('reproducible');
  if (/pretrained.*model/i.test(fullText)) keywords.push('pretrained-models');
  if (/implementation.*details/i.test(fullText)) keywords.push('implementation-details');

  return {
    hasCode,
    codeUrl,
    hasData,
    dataUrl,
    keywords
  };
}

/**
 * Compare multiple papers (must be downloaded first)
 *
 * @example
 * const comparison = await comparePapers([
 *   "2401.12345",
 *   "2402.23456",
 *   "2403.34567"
 * ])
 * comparison.forEach(p => {
 *   console.log(`${p.title}: ${p.approach}`)
 * })
 */
export async function comparePapers(
  paperIds: string[]
): Promise<Array<{
  paperId: string;
  title: string;
  approach: string; // First sentence of abstract
  authors: string[];
  published: string;
}>> {
  console.log(`[ArXiv] Comparing ${paperIds.length} papers...`)

  const papers = await getPapers(paperIds);

  return papers.map(paper => ({
    paperId: paper.paper_id,
    title: paper.title,
    approach: paper.abstract.split('.')[0] + '.', // First sentence
    authors: paper.authors,
    published: paper.metadata.published
  }));
}

/**
 * Search paper content for specific terms
 *
 * @example
 * const mentions = await searchInPaper("2401.12345", "flash attention")
 * console.log(`Found ${mentions.length} mentions`)
 * mentions.forEach(m => console.log(m.context))
 */
export async function searchInPaper(
  paperId: string,
  searchTerm: string,
  contextLength: number = 200
): Promise<Array<{ position: number; context: string }>> {
  const content = await getPaper(paperId);
  const text = content.full_text;

  const results = [];
  const regex = new RegExp(searchTerm, 'gi');

  let match;
  while ((match = regex.exec(text)) !== null) {
    const position = match.index;
    const start = Math.max(0, position - contextLength / 2);
    const end = Math.min(text.length, position + searchTerm.length + contextLength / 2);

    results.push({
      position,
      context: text.slice(start, end)
    });
  }

  console.log(`[ArXiv] Found ${results.length} mentions of "${searchTerm}" in ${paperId}`)

  return results;
}

/**
 * Get paper summary (title, abstract, key points)
 *
 * @example
 * const summary = formatPaperSummary(await getPaper("2401.12345"))
 * console.log(summary)
 */
export function formatPaperSummary(content: PaperContent): string {
  const authors = content.authors.slice(0, 3).join(', ') +
    (content.authors.length > 3 ? ' et al.' : '');

  return `
**${content.title}**

**Authors:** ${authors}
**Published:** ${new Date(content.metadata.published).toLocaleDateString()}
**Categories:** ${content.metadata.categories.join(', ')}
**ArXiv ID:** ${content.paper_id}
**PDF:** ${content.metadata.pdf_url}

**Abstract:**
${content.abstract}

**Full text available:** ${content.full_text.length.toLocaleString()} characters
  `.trim();
}
