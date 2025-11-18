/**
 * Zotero Get Item Server - Direct Web API
 * Makes direct HTTPS requests to api.zotero.org (NO MCP)
 *
 * API Docs: https://www.zotero.org/support/dev/web_api/v3/basics
 *
 * Usage:
 *   import { getItem } from './servers/zotero/get-item.ts'
 *   const item = await getItem("ABC123XYZ")
 */

// Environment variables (set in .env file)
declare const ZOTERO_API_KEY: string;
declare const ZOTERO_USER_ID: string;

interface ItemMetadata {
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
    DOI?: string;
    url?: string;
    pages?: string;
    volume?: string;
    issue?: string;
    tags: Array<{ tag: string; type?: number }>;
    collections: string[];
    relations: Record<string, any>;
    dateAdded: string;
    dateModified: string;
    extra?: string;
  };
}

interface Note {
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
    itemType: 'note';
    note: string; // HTML content
    tags: Array<{ tag: string }>;
    dateAdded: string;
    dateModified: string;
    parentItem?: string;
  };
}

interface Annotation {
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
    itemType: 'annotation';
    annotationType: 'highlight' | 'note' | 'image';
    annotationText?: string;
    annotationComment?: string;
    annotationColor?: string;
    annotationPageLabel?: string;
    annotationPosition?: string;
    dateAdded: string;
    dateModified: string;
    parentItem: string;
  };
}

interface Attachment {
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
    itemType: 'attachment';
    linkMode: string;
    title: string;
    filename?: string;
    path?: string;
    contentType?: string;
    url?: string;
    dateAdded: string;
    dateModified: string;
    parentItem?: string;
  };
}

type ChildItem = Note | Annotation | Attachment;

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
  options: {
    params?: Record<string, string>;
    format?: 'json' | 'bibtex';
  } = {}
): Promise<T> {
  const { apiKey, userId } = getConfig();

  // Build URL
  const url = new URL(`https://api.zotero.org/users/${userId}${endpoint}`);

  // Add format parameter if specified
  if (options.format && options.format !== 'json') {
    url.searchParams.append('format', options.format);
  }

  // Add other parameters
  if (options.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      if (value) url.searchParams.append(key, value);
    });
  }

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

  // Return as text for bibtex, JSON for others
  if (options.format === 'bibtex') {
    return (await response.text()) as T;
  } else {
    return (await response.json()) as T;
  }
}

/**
 * Get full metadata for a Zotero item by key
 *
 * @param itemKey - Zotero item key
 * @param format - Output format (json, bibtex)
 * @returns Item metadata
 *
 * @example
 * // Get item metadata
 * const item = await getItem("ABC123XYZ")
 * console.log(item.data.title)
 *
 * @example
 * // Get BibTeX citation
 * const bibtex = await getItem("ABC123XYZ", "bibtex")
 * console.log(bibtex)
 */
export async function getItem(
  itemKey: string,
  format: 'json' | 'bibtex' = 'json'
): Promise<ItemMetadata | string> {
  console.log(`[Zotero] Getting item: ${itemKey} (format: ${format})`);

  const result = await apiRequest<ItemMetadata | string>(
    `/items/${itemKey}`,
    { format }
  );

  if (typeof result === 'string') {
    console.log(`[Zotero] Retrieved BibTeX citation`);
  } else {
    console.log(`[Zotero] Retrieved item: ${result.data.title}`);
  }

  return result;
}

/**
 * Get multiple items in parallel
 */
export async function getItems(
  itemKeys: string[],
  format: 'json' | 'bibtex' = 'json'
): Promise<Array<ItemMetadata | string>> {
  console.log(`[Zotero] Getting ${itemKeys.length} items in parallel...`);

  const items = await Promise.all(itemKeys.map((key) => getItem(key, format)));

  console.log(`[Zotero] Retrieved ${items.length} items`);

  return items;
}

/**
 * Get item's full text content
 */
export async function getItemFulltext(itemKey: string): Promise<string> {
  console.log(`[Zotero] Getting full text for item: ${itemKey}`);

  try {
    const result = await apiRequest<{
      content: string;
      indexedPages?: number;
      totalPages?: number;
      indexedChars?: number;
      totalChars?: number;
    }>(`/items/${itemKey}/fulltext`);

    const content = result.content;
    console.log(`[Zotero] Retrieved full text (${content.length} characters)`);

    return content;
  } catch (error) {
    // Fulltext may not be available
    console.log(`[Zotero] No fulltext available for ${itemKey}`);
    throw error;
  }
}

/**
 * Get item's child items (attachments, notes, annotations)
 */
export async function getItemChildren(itemKey: string): Promise<{
  attachments: Attachment[];
  notes: Note[];
  annotations: Annotation[];
}> {
  console.log(`[Zotero] Getting children for item: ${itemKey}`);

  const children = await apiRequest<ChildItem[]>(`/items/${itemKey}/children`);

  // Categorize children by type
  const attachments: Attachment[] = [];
  const notes: Note[] = [];
  const annotations: Annotation[] = [];

  children.forEach((child) => {
    if (child.data.itemType === 'attachment') {
      attachments.push(child as Attachment);
    } else if (child.data.itemType === 'note') {
      notes.push(child as Note);
    } else if (child.data.itemType === 'annotation') {
      annotations.push(child as Annotation);
    }
  });

  console.log(
    `[Zotero] Found ${attachments.length} attachments, ${notes.length} notes, ${annotations.length} annotations`
  );

  return { attachments, notes, annotations };
}

/**
 * Get annotations for an item
 */
export async function getAnnotations(itemKey: string): Promise<Annotation[]> {
  console.log(`[Zotero] Getting annotations for item: ${itemKey}`);

  const children = await getItemChildren(itemKey);
  const annotations = children.annotations;

  console.log(`[Zotero] Found ${annotations.length} annotations`);

  return annotations;
}

/**
 * Get notes for an item
 */
export async function getNotes(itemKey: string): Promise<Note[]> {
  console.log(`[Zotero] Getting notes for item: ${itemKey}`);

  const children = await getItemChildren(itemKey);
  const notes = children.notes;

  console.log(`[Zotero] Found ${notes.length} notes`);

  return notes;
}

/**
 * Get comprehensive item details (metadata + children + fulltext)
 */
export async function getItemComplete(itemKey: string): Promise<{
  metadata: ItemMetadata;
  fulltext?: string;
  attachments: Attachment[];
  notes: Note[];
  annotations: Annotation[];
}> {
  console.log(`[Zotero] Getting complete details for item: ${itemKey}`);

  // Fetch everything in parallel
  const [metadata, children, fulltext] = await Promise.all([
    getItem(itemKey),
    getItemChildren(itemKey),
    getItemFulltext(itemKey).catch(() => undefined), // Fulltext may not be available
  ]);

  console.log(`[Zotero] Retrieved complete item details`);

  return {
    metadata: metadata as ItemMetadata,
    fulltext,
    ...children,
  };
}

/**
 * Export items as BibTeX
 */
export async function exportBibTeX(itemKeys: string[]): Promise<string> {
  console.log(`[Zotero] Exporting ${itemKeys.length} items as BibTeX`);

  const bibtexEntries = await Promise.all(
    itemKeys.map((key) => getItem(key, 'bibtex'))
  );

  const bibtex = bibtexEntries.join('\n\n');

  console.log(`[Zotero] Exported ${itemKeys.length} BibTeX entries`);

  return bibtex;
}

/**
 * Analyze item's research value
 */
export async function analyzeItemResearchValue(itemKey: string): Promise<{
  hasFulltext: boolean;
  hasAnnotations: boolean;
  hasNotes: boolean;
  annotationCount: number;
  noteCount: number;
  hasCode: boolean;
  hasData: boolean;
  readiness: 'ready' | 'partial' | 'metadata-only';
}> {
  const [fulltext, children] = await Promise.all([
    getItemFulltext(itemKey).catch(() => undefined),
    getItemChildren(itemKey),
  ]);

  const hasFulltext = !!fulltext;
  const hasAnnotations = children.annotations.length > 0;
  const hasNotes = children.notes.length > 0;

  // Check for code/data availability
  const fulltextLower = fulltext?.toLowerCase() || '';
  const hasCode = /github|code.*available|repository/i.test(fulltextLower);
  const hasData = /dataset.*available|data.*provided/i.test(fulltextLower);

  // Determine readiness for research use
  let readiness: 'ready' | 'partial' | 'metadata-only' = 'metadata-only';
  if (hasFulltext && (hasAnnotations || hasNotes)) {
    readiness = 'ready';
  } else if (hasFulltext) {
    readiness = 'partial';
  }

  return {
    hasFulltext,
    hasAnnotations,
    hasNotes,
    annotationCount: children.annotations.length,
    noteCount: children.notes.length,
    hasCode,
    hasData,
    readiness,
  };
}
