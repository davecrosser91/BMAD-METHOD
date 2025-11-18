/**
 * Zotero Get Item Server Wrapper
 * Wraps mcp__zotero__get_item_metadata and related MCP tools
 *
 * Usage:
 *   import { getItem } from './servers/zotero/get-item.ts'
 *   const item = await getItem("ABC123XYZ")
 */

interface ItemMetadata {
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
}

interface Note {
  key: string;
  itemType: 'note';
  note: string; // HTML content
  tags: Array<{ tag: string }>;
  dateAdded: string;
  dateModified: string;
}

interface Annotation {
  key: string;
  itemType: 'annotation';
  annotationType: 'highlight' | 'note' | 'image';
  annotationText?: string;
  annotationComment?: string;
  annotationColor?: string;
  annotationPageLabel?: string;
  annotationPosition?: string;
  dateAdded: string;
  dateModified: string;
}

interface Attachment {
  key: string;
  itemType: 'attachment';
  title: string;
  filename?: string;
  path?: string;
  contentType?: string;
  url?: string;
  dateAdded: string;
  dateModified: string;
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
 * console.log(item.title)
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
  console.log(`[Zotero] Getting item: ${itemKey} (format: ${format})`)

  // Call the actual mcp__zotero__get_item_metadata tool
  const result = await globalThis.mcp__zotero__get_item_metadata({
    item_key: itemKey,
    format
  });

  console.log(`[Zotero] Retrieved item: ${typeof result === 'string' ? 'BibTeX' : result.title}`)

  return result;
}

/**
 * Get multiple items in parallel
 */
export async function getItems(
  itemKeys: string[],
  format: 'json' | 'bibtex' = 'json'
): Promise<Array<ItemMetadata | string>> {
  console.log(`[Zotero] Getting ${itemKeys.length} items in parallel...`)

  const items = await Promise.all(
    itemKeys.map(key => getItem(key, format))
  );

  console.log(`[Zotero] Retrieved ${items.length} items`)

  return items;
}

/**
 * Get item's full text content
 */
export async function getItemFulltext(itemKey: string): Promise<string> {
  console.log(`[Zotero] Getting full text for item: ${itemKey}`)

  const result = await globalThis.mcp__zotero__get_item_fulltext({
    item_key: itemKey
  });

  console.log(`[Zotero] Retrieved full text (${result.length} characters)`)

  return result;
}

/**
 * Get item's child items (attachments, notes)
 */
export async function getItemChildren(itemKey: string): Promise<{
  attachments: Attachment[];
  notes: Note[];
  annotations: Annotation[];
}> {
  console.log(`[Zotero] Getting children for item: ${itemKey}`)

  const children = await globalThis.mcp__zotero__get_item_children({
    item_key: itemKey
  });

  // Categorize children by type
  const attachments: Attachment[] = [];
  const notes: Note[] = [];
  const annotations: Annotation[] = [];

  children.forEach((child: any) => {
    if (child.itemType === 'attachment') {
      attachments.push(child);
    } else if (child.itemType === 'note') {
      notes.push(child);
    } else if (child.itemType === 'annotation') {
      annotations.push(child);
    }
  });

  console.log(`[Zotero] Found ${attachments.length} attachments, ${notes.length} notes, ${annotations.length} annotations`)

  return { attachments, notes, annotations };
}

/**
 * Get annotations for an item
 */
export async function getAnnotations(itemKey: string): Promise<Annotation[]> {
  console.log(`[Zotero] Getting annotations for item: ${itemKey}`)

  const result = await globalThis.mcp__zotero__get_annotations({
    item_key: itemKey
  });

  console.log(`[Zotero] Found ${result.length} annotations`)

  return result;
}

/**
 * Get notes for an item
 */
export async function getNotes(itemKey: string): Promise<Note[]> {
  console.log(`[Zotero] Getting notes for item: ${itemKey}`)

  const result = await globalThis.mcp__zotero__get_notes({
    item_key: itemKey
  });

  console.log(`[Zotero] Found ${result.length} notes`)

  return result;
}

/**
 * Search within notes and annotations
 */
export async function searchNotes(
  query: string,
  searchAnnotations: boolean = true
): Promise<Array<{ itemKey: string; content: string; type: 'note' | 'annotation' }>> {
  console.log(`[Zotero] Searching notes for: "${query}"`)

  const result = await globalThis.mcp__zotero__search_notes({
    query,
    search_annotations: searchAnnotations
  });

  console.log(`[Zotero] Found ${result.length} matching notes/annotations`)

  return result;
}

/**
 * Create a new note for an item
 */
export async function createNote(
  itemKey: string,
  noteContent: string,
  tags?: string[]
): Promise<Note> {
  console.log(`[Zotero] Creating note for item: ${itemKey}`)

  const result = await globalThis.mcp__zotero__create_note({
    item_key: itemKey,
    note: noteContent,
    tags: tags || []
  });

  console.log(`[Zotero] Created note: ${result.key}`)

  return result;
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
  console.log(`[Zotero] Getting complete details for item: ${itemKey}`)

  // Fetch everything in parallel
  const [metadata, children, fulltext] = await Promise.all([
    getItem(itemKey),
    getItemChildren(itemKey),
    getItemFulltext(itemKey).catch(() => undefined) // Fulltext may not be available
  ]);

  console.log(`[Zotero] Retrieved complete item details`)

  return {
    metadata: metadata as ItemMetadata,
    fulltext,
    ...children
  };
}

/**
 * Export items as BibTeX
 */
export async function exportBibTeX(itemKeys: string[]): Promise<string> {
  console.log(`[Zotero] Exporting ${itemKeys.length} items as BibTeX`)

  const bibtexEntries = await Promise.all(
    itemKeys.map(key => getItem(key, 'bibtex'))
  );

  const bibtex = bibtexEntries.join('\n\n');

  console.log(`[Zotero] Exported ${itemKeys.length} BibTeX entries`)

  return bibtex;
}

/**
 * Analyze item's research value
 */
export async function analyzeItemResearchValue(
  itemKey: string
): Promise<{
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
    getItemChildren(itemKey)
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
    readiness
  };
}

/**
 * Get items with your annotations/notes (well-read papers)
 */
export async function getAnnotatedItems(limit?: number): Promise<Array<{
  item: ItemMetadata;
  annotationCount: number;
  noteCount: number;
}>> {
  // This requires searching all items and checking for annotations
  // In practice, you'd use zotero_search_items with specific criteria
  console.log(`[Zotero] Finding annotated items...`)

  // This is a placeholder - actual implementation would query Zotero
  // for items with annotations/notes
  throw new Error('getAnnotatedItems requires advanced search - use search with filters instead');
}
