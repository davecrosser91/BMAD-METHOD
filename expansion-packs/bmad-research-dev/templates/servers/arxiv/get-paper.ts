/**
 * ArXiv Get Paper Server - Direct Web API
 * Makes direct HTTP requests to export.arxiv.org (NO MCP)
 *
 * NOTE: PDF text extraction requires external libraries not available in zero-MCP.
 * This module provides metadata and download URLs. For full text, download PDFs manually.
 *
 * API Docs: https://info.arxiv.org/help/api/user-manual.html
 *
 * Usage:
 *   import { getPaper } from './servers/arxiv/get-paper.ts'
 *   const paper = await getPaper("2401.12345")
 */

import { getPaperMetadata } from './search.ts';

// Re-export Paper type for convenience
export type { Paper } from './search.ts';

/**
 * Get paper metadata and download information
 *
 * @param arxivId - ArXiv ID (e.g., "2401.12345")
 * @returns Paper metadata with download URLs
 *
 * @example
 * const paper = await getPaper("2401.12345")
 * console.log(paper.title)
 * console.log(paper.pdf_url)
 */
export async function getPaper(arxivId: string) {
  console.log(`[ArXiv] Getting paper: ${arxivId}`);

  const paper = await getPaperMetadata(arxivId);

  if (paper) {
    console.log(`[ArXiv] Retrieved: ${paper.title}`);
  } else {
    console.log(`[ArXiv] Paper ${arxivId} not found`);
  }

  return paper;
}

/**
 * Get multiple papers in parallel
 */
export async function getPapers(arxivIds: string[]) {
  console.log(`[ArXiv] Getting ${arxivIds.length} papers in parallel...`);

  const papers = await Promise.all(arxivIds.map((id) => getPaper(id)));

  const validPapers = papers.filter((p) => p !== null);

  console.log(`[ArXiv] Retrieved ${validPapers.length} papers`);

  return validPapers;
}

/**
 * Check if paper mentions specific methodology/technique
 *
 * @param arxivId - ArXiv ID
 * @param methodology - Methodology to search for (e.g., "attention", "transformer")
 * @returns True if methodology is mentioned in title or abstract
 */
export async function checkMethodology(
  arxivId: string,
  methodology: string
): Promise<boolean> {
  const paper = await getPaper(arxivId);

  if (!paper) return false;

  const searchText = `${paper.title} ${paper.summary}`.toLowerCase();
  return searchText.includes(methodology.toLowerCase());
}

/**
 * Extract methodology-related keywords from abstract
 */
export async function extractMethodology(arxivId: string): Promise<string> {
  const paper = await getPaper(arxivId);

  if (!paper) {
    throw new Error(`Paper ${arxivId} not found`);
  }

  // Extract sentences mentioning common methodology keywords
  const methodologyKeywords = [
    'method',
    'approach',
    'algorithm',
    'model',
    'architecture',
    'framework',
    'technique',
    'propose',
    'introduce',
  ];

  const sentences = paper.summary.split(/\. +/);
  const relevantSentences = sentences.filter((sentence) =>
    methodologyKeywords.some((keyword) =>
      sentence.toLowerCase().includes(keyword)
    )
  );

  return relevantSentences.join('. ');
}

/**
 * Check reproducibility indicators
 */
export async function checkReproducibility(arxivId: string): Promise<{
  hasCode: boolean;
  hasData: boolean;
  codeUrl?: string;
  keywords: string[];
}> {
  const paper = await getPaper(arxivId);

  if (!paper) {
    throw new Error(`Paper ${arxivId} not found`);
  }

  const fullText = `${paper.title} ${paper.summary}`.toLowerCase();

  // Check for code availability
  const codePatterns = [
    /github\.com\/[\w-]+\/[\w-]+/i,
    /code.*available/i,
    /implementation.*available/i,
    /open.*source/i,
  ];

  const hasCode = codePatterns.some((pattern) =>
    new RegExp(pattern).test(fullText)
  );

  // Extract GitHub URL if present
  const githubMatch = fullText.match(/github\.com\/[\w-]+\/[\w-]+/i);
  const codeUrl = githubMatch ? `https://${githubMatch[0]}` : undefined;

  // Check for dataset availability
  const hasData =
    /dataset.*available/i.test(fullText) ||
    /data.*provided/i.test(fullText) ||
    /benchmark/i.test(fullText);

  // Extract keywords
  const keywords = paper.categories;

  return {
    hasCode,
    hasData,
    codeUrl,
    keywords,
  };
}

/**
 * Compare multiple papers
 */
export async function comparePapers(arxivIds: string[]) {
  const papers = await getPapers(arxivIds);

  return await Promise.all(
    papers.map(async (paper) => ({
      id: paper.id,
      title: paper.title,
      authors: paper.authors.map((a) => a.name),
      published: paper.published,
      approach: await extractMethodology(paper.id).then((m) => m.slice(0, 200)),
      categories: paper.categories,
    }))
  );
}

/**
 * Get download information for a paper
 */
export function getDownloadInfo(paperId: string) {
  return {
    pdfUrl: `http://arxiv.org/pdf/${paperId}.pdf`,
    abstractUrl: `https://arxiv.org/abs/${paperId}`,
  };
}

/**
 * Format paper citation (simple format)
 */
export async function formatCitation(
  arxivId: string,
  style: 'plain' | 'bibtex' = 'plain'
): Promise<string> {
  const paper = await getPaper(arxivId);

  if (!paper) {
    throw new Error(`Paper ${arxivId} not found`);
  }

  if (style === 'bibtex') {
    const authors = paper.authors.map((a) => a.name).join(' and ');
    const year = new Date(paper.published).getFullYear();

    return `@article{${paper.id.replace('.', '_')},
  title={${paper.title}},
  author={${authors}},
  journal={arXiv preprint arXiv:${paper.id}},
  year={${year}}
}`;
  } else {
    // Plain citation
    const authors = paper.authors
      .slice(0, 3)
      .map((a) => a.name)
      .join(', ');
    const moreAuthors = paper.authors.length > 3 ? ', et al.' : '';
    const year = new Date(paper.published).getFullYear();

    return `${authors}${moreAuthors} (${year}). ${paper.title}. arXiv preprint arXiv:${paper.id}.`;
  }
}

/**
 * NOTE: PDF text extraction not available in zero-MCP architecture
 *
 * To read full paper text, you have two options:
 * 1. Download the PDF using the pdf_url and use external tools
 * 2. Use a PDF extraction MCP server (not zero-MCP)
 *
 * This function is a placeholder to document the limitation.
 */
export async function readPaperFulltext(arxivId: string): Promise<string> {
  const paper = await getPaper(arxivId);

  if (!paper) {
    throw new Error(`Paper ${arxivId} not found`);
  }

  throw new Error(
    `PDF text extraction not available in zero-MCP architecture.

Download PDF: ${paper.pdf_url}
Abstract page: https://arxiv.org/abs/${arxivId}

For full text extraction, download the PDF and use external tools.`
  );
}

/**
 * List downloaded papers (placeholder - no local storage in zero-MCP)
 */
export async function listDownloadedPapers(): Promise<
  Array<{ paper_id: string; title: string }>
> {
  throw new Error(
    'Local paper storage not available in zero-MCP architecture. Papers are not cached locally.'
  );
}

/**
 * Check if paper is downloaded (placeholder)
 */
export async function isPaperDownloaded(arxivId: string): Promise<boolean> {
  // In zero-MCP, we don't have local paper storage
  return false;
}
