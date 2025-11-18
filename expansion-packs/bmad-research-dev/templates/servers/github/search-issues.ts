/**
 * GitHub Issues Search Server Wrapper
 * Wraps GitHub CLI (gh) and MCP GitHub tools
 *
 * Usage:
 *   import { searchIssues } from './servers/github/search-issues.ts'
 *   const issues = await searchIssues("label:bug is:open")
 */

interface Issue {
  number: number;
  title: string;
  state: 'open' | 'closed';
  author: string;
  labels: string[];
  assignees: string[];
  milestone?: {
    title: string;
    number: number;
  };
  body: string;
  createdAt: string;
  updatedAt: string;
  closedAt?: string;
  url: string;
  comments: number;
}

interface SearchOptions {
  state?: 'open' | 'closed' | 'all';
  labels?: string[];
  assignee?: string;
  milestone?: string;
  author?: string;
  limit?: number;
  sort?: 'created' | 'updated' | 'comments';
  order?: 'asc' | 'desc';
}

/**
 * Search GitHub issues in current repository
 *
 * @param query - GitHub search query (uses GitHub search syntax)
 * @param options - Optional search filters
 * @returns Array of issues matching the search
 *
 * @example
 * // Search open bugs
 * const bugs = await searchIssues("is:open label:bug")
 *
 * @example
 * // Search by milestone
 * const issues = await searchIssues("milestone:'Sprint 1'")
 *
 * @example
 * // Search with filters
 * const issues = await searchIssues("neural", {
 *   state: 'open',
 *   labels: ['type:experiment'],
 *   limit: 20
 * })
 */
export async function searchIssues(
  query?: string,
  options: SearchOptions = {}
): Promise<Issue[]> {
  console.log(`[GitHub] Searching issues: "${query || 'all'}"`)

  // Build GitHub CLI command
  let searchQuery = query || '';

  // Add filters
  if (options.state) {
    searchQuery += ` is:${options.state}`;
  }

  if (options.labels && options.labels.length > 0) {
    options.labels.forEach(label => {
      searchQuery += ` label:"${label}"`;
    });
  }

  if (options.assignee) {
    searchQuery += ` assignee:${options.assignee}`;
  }

  if (options.milestone) {
    searchQuery += ` milestone:"${options.milestone}"`;
  }

  if (options.author) {
    searchQuery += ` author:${options.author}`;
  }

  // Execute search using gh CLI
  const cmd = [
    'gh issue list',
    searchQuery ? `--search "${searchQuery.trim()}"` : '',
    options.limit ? `--limit ${options.limit}` : '--limit 50',
    '--json number,title,state,author,labels,assignees,milestone,body,createdAt,updatedAt,closedAt,url,comments'
  ].filter(Boolean).join(' ');

  console.log(`[GitHub] Executing: ${cmd}`)

  const result = await globalThis.Bash({ command: cmd });
  const issues = JSON.parse(result);

  console.log(`[GitHub] Found ${issues.length} issues`)

  return issues;
}

/**
 * Get all open issues
 */
export async function getOpenIssues(limit?: number): Promise<Issue[]> {
  return searchIssues(undefined, {
    state: 'open',
    limit: limit || 100
  });
}

/**
 * Get issues by label
 */
export async function getIssuesByLabel(label: string): Promise<Issue[]> {
  return searchIssues(undefined, {
    labels: [label],
    state: 'all'
  });
}

/**
 * Get issues in milestone
 */
export async function getIssuesByMilestone(milestone: string): Promise<Issue[]> {
  return searchIssues(undefined, {
    milestone,
    state: 'all'
  });
}

/**
 * Get issues assigned to user
 */
export async function getAssignedIssues(assignee: string): Promise<Issue[]> {
  return searchIssues(undefined, {
    assignee,
    state: 'open'
  });
}

/**
 * Get issues by type
 */
export async function getIssuesByType(type: string): Promise<Issue[]> {
  const typeLabels: Record<string, string> = {
    'epic': 'type:epic',
    'story': 'type:story',
    'task': 'type:task',
    'bug': 'type:bug',
    'experiment': 'type:experiment',
    'analysis': 'type:analysis'
  };

  const label = typeLabels[type.toLowerCase()] || `type:${type}`;

  return getIssuesByLabel(label);
}

/**
 * Get issues by status
 */
export async function getIssuesByStatus(status: string): Promise<Issue[]> {
  const statusLabels: Record<string, string> = {
    'backlog': 'status:backlog',
    'todo': 'status:todo',
    'doing': 'status:doing',
    'review': 'status:review',
    'done': 'status:done'
  };

  const label = statusLabels[status.toLowerCase()] || `status:${status}`;

  return getIssuesByLabel(label);
}

/**
 * Search research-related issues
 */
export async function searchResearchIssues(
  keywords?: string
): Promise<{
  experiments: Issue[];
  literature: Issue[];
  analysis: Issue[];
  papers: Issue[];
}> {
  const [experiments, literature, analysis, papers] = await Promise.all([
    getIssuesByLabel('research:experiment'),
    getIssuesByLabel('research:literature'),
    getIssuesByLabel('research:analysis'),
    getIssuesByLabel('research:paper')
  ]);

  // Filter by keywords if provided
  const filterByKeywords = (issues: Issue[]) => {
    if (!keywords) return issues;
    const lowerKeywords = keywords.toLowerCase();
    return issues.filter(issue =>
      issue.title.toLowerCase().includes(lowerKeywords) ||
      issue.body.toLowerCase().includes(lowerKeywords)
    );
  };

  return {
    experiments: filterByKeywords(experiments),
    literature: filterByKeywords(literature),
    analysis: filterByKeywords(analysis),
    papers: filterByKeywords(papers)
  };
}

/**
 * Get issue statistics
 */
export async function getIssueStats(): Promise<{
  total: number;
  open: number;
  closed: number;
  byLabel: Record<string, number>;
  byMilestone: Record<string, number>;
  byAssignee: Record<string, number>;
  avgTimeToClose: number; // days
}> {
  const allIssues = await searchIssues(undefined, {
    state: 'all',
    limit: 1000
  });

  const open = allIssues.filter(i => i.state === 'open').length;
  const closed = allIssues.filter(i => i.state === 'closed').length;

  // Count by label
  const byLabel: Record<string, number> = {};
  allIssues.forEach(issue => {
    issue.labels.forEach(label => {
      byLabel[label] = (byLabel[label] || 0) + 1;
    });
  });

  // Count by milestone
  const byMilestone: Record<string, number> = {};
  allIssues.forEach(issue => {
    if (issue.milestone) {
      const title = issue.milestone.title;
      byMilestone[title] = (byMilestone[title] || 0) + 1;
    }
  });

  // Count by assignee
  const byAssignee: Record<string, number> = {};
  allIssues.forEach(issue => {
    issue.assignees.forEach(assignee => {
      byAssignee[assignee] = (byAssignee[assignee] || 0) + 1;
    });
  });

  // Calculate average time to close
  const closedIssues = allIssues.filter(i => i.closedAt);
  const avgTimeToClose = closedIssues.length > 0
    ? closedIssues.reduce((sum, issue) => {
        const created = new Date(issue.createdAt).getTime();
        const closed = new Date(issue.closedAt!).getTime();
        return sum + (closed - created);
      }, 0) / closedIssues.length / (1000 * 60 * 60 * 24) // Convert to days
    : 0;

  return {
    total: allIssues.length,
    open,
    closed,
    byLabel,
    byMilestone,
    byAssignee,
    avgTimeToClose
  };
}

/**
 * Find related issues
 */
export async function findRelatedIssues(
  issueNumber: number
): Promise<Issue[]> {
  // Get the issue details
  const cmd = `gh issue view ${issueNumber} --json number,title,body,labels`;
  const result = await globalThis.Bash({ command: cmd });
  const issue = JSON.parse(result);

  // Extract keywords from title
  const keywords = issue.title
    .toLowerCase()
    .split(/\s+/)
    .filter((word: string) => word.length > 4)
    .slice(0, 3)
    .join(' ');

  // Search for similar issues
  const related = await searchIssues(keywords, {
    state: 'all',
    limit: 10
  });

  // Filter out the original issue
  return related.filter(i => i.number !== issueNumber);
}
