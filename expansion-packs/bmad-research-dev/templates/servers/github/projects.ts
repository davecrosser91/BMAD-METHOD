/**
 * GitHub Projects Server Wrapper
 * Wraps GitHub CLI for GitHub Projects v2
 *
 * Usage:
 *   import { createProject } from './servers/github/projects.ts'
 *   const project = await createProject("Research Sprint 1")
 */

interface Project {
  id: string;
  number: number;
  title: string;
  url: string;
  shortDescription?: string;
  public: boolean;
  closed: boolean;
  readme?: string;
}

interface ProjectItem {
  id: string;
  content: {
    number: number;
    title: string;
    type: 'Issue' | 'PullRequest' | 'DraftIssue';
  };
  fieldValues: Record<string, any>;
}

/**
 * Create a new GitHub Project
 *
 * @param title - Project title
 * @param description - Optional project description
 * @returns Created project details
 *
 * @example
 * const project = await createProject(
 *   "Research Phase 2",
 *   "Experiment implementation and analysis"
 * )
 */
export async function createProject(
  title: string,
  description?: string
): Promise<Project> {
  console.log(`[GitHub] Creating project: "${title}"`)

  const cmd = [
    'gh project create',
    `--title "${title}"`,
    description ? `--description "${description}"` : '',
    '--format json'
  ].filter(Boolean).join(' ');

  const result = await globalThis.Bash({ command: cmd });
  const project = JSON.parse(result);

  console.log(`[GitHub] Created project #${project.number}: ${project.url}`)

  return project;
}

/**
 * List all projects
 */
export async function listProjects(): Promise<Project[]> {
  console.log(`[GitHub] Listing projects`)

  const result = await globalThis.Bash({
    command: 'gh project list --format json'
  });

  const projects = JSON.parse(result);

  console.log(`[GitHub] Found ${projects.length} projects`)

  return projects;
}

/**
 * Get project by number or title
 */
export async function getProject(
  identifier: number | string
): Promise<Project> {
  const projects = await listProjects();

  const project = typeof identifier === 'number'
    ? projects.find(p => p.number === identifier)
    : projects.find(p => p.title.toLowerCase().includes(identifier.toLowerCase()));

  if (!project) {
    throw new Error(`Project not found: ${identifier}`);
  }

  return project;
}

/**
 * Add issue to project
 */
export async function addIssueToProject(
  projectNumber: number,
  issueNumber: number
): Promise<void> {
  console.log(`[GitHub] Adding issue #${issueNumber} to project #${projectNumber}`)

  await globalThis.Bash({
    command: `gh project item-add ${projectNumber} --owner @me --url https://github.com/$(gh repo view --json nameWithOwner -q .nameWithOwner)/issues/${issueNumber}`
  });

  console.log(`[GitHub] Added issue #${issueNumber} to project #${projectNumber}`)
}

/**
 * Add multiple issues to project
 */
export async function addIssuesToProject(
  projectNumber: number,
  issueNumbers: number[]
): Promise<void> {
  console.log(`[GitHub] Adding ${issueNumbers.length} issues to project #${projectNumber}`)

  for (const issueNumber of issueNumbers) {
    await addIssueToProject(projectNumber, issueNumber);

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`[GitHub] Added ${issueNumbers.length} issues to project #${projectNumber}`)
}

/**
 * Update project item field
 */
export async function updateProjectItemField(
  projectNumber: number,
  itemId: string,
  fieldName: string,
  value: string
): Promise<void> {
  console.log(`[GitHub] Updating project item field: ${fieldName} = ${value}`)

  await globalThis.Bash({
    command: `gh project item-edit --project-id ${projectNumber} --id ${itemId} --field-name "${fieldName}" --text "${value}"`
  });

  console.log(`[GitHub] Updated project item field`)
}

/**
 * List project items
 */
export async function listProjectItems(
  projectNumber: number
): Promise<ProjectItem[]> {
  console.log(`[GitHub] Listing items in project #${projectNumber}`)

  const result = await globalThis.Bash({
    command: `gh project item-list ${projectNumber} --format json`
  });

  const items = JSON.parse(result);

  console.log(`[GitHub] Found ${items.length} items in project #${projectNumber}`)

  return items;
}

/**
 * Create project with standard BMAD workflow
 */
export async function createBMADProject(
  title: string,
  description?: string
): Promise<{
  project: Project;
  fields: {
    status: string;
    priority: string;
    size: string;
  };
}> {
  console.log(`[GitHub] Creating BMAD workflow project: "${title}"`)

  // Create project
  const project = await createProject(title, description);

  // Note: Field creation requires GitHub Projects v2 API
  // This is a placeholder for the field structure
  const fields = {
    status: 'Status',
    priority: 'Priority',
    size: 'Size'
  };

  console.log(`[GitHub] BMAD project created: ${project.url}`)
  console.log(`[GitHub] Configure these fields manually:`)
  console.log(`  - Status: Backlog, Todo, In Progress, In Review, Done`)
  console.log(`  - Priority: P0, P1, P2, P3`)
  console.log(`  - Size: XS, S, M, L, XL`)

  return { project, fields };
}

/**
 * Create research project
 */
export async function createResearchProject(
  researchArea: string,
  milestoneTitle?: string
): Promise<Project> {
  const title = milestoneTitle || `Research: ${researchArea}`;
  const description = `Research project for ${researchArea}

## Project Structure
- 📚 Literature Review
- 🧪 Experiments
- 📊 Analysis
- 📝 Paper Writing

Use labels:
- research:literature
- research:experiment
- research:analysis
- research:paper
`;

  return createProject(title, description);
}

/**
 * Archive/close project
 */
export async function closeProject(projectNumber: number): Promise<void> {
  console.log(`[GitHub] Closing project #${projectNumber}`)

  await globalThis.Bash({
    command: `gh project close ${projectNumber}`
  });

  console.log(`[GitHub] Closed project #${projectNumber}`)
}

/**
 * Reopen project
 */
export async function reopenProject(projectNumber: number): Promise<void> {
  console.log(`[GitHub] Reopening project #${projectNumber}`)

  await globalThis.Bash({
    command: `gh project reopen ${projectNumber}`
  });

  console.log(`[GitHub] Reopened project #${projectNumber}`)
}

/**
 * Get project statistics
 */
export async function getProjectStats(
  projectNumber: number
): Promise<{
  totalItems: number;
  byStatus: Record<string, number>;
  byType: Record<string, number>;
}> {
  const items = await listProjectItems(projectNumber);

  const byStatus: Record<string, number> = {};
  const byType: Record<string, number> = {};

  items.forEach(item => {
    // Count by type
    const type = item.content.type;
    byType[type] = (byType[type] || 0) + 1;

    // Count by status (if available in fieldValues)
    const status = item.fieldValues['Status'] || 'Unknown';
    byStatus[status] = (byStatus[status] || 0) + 1;
  });

  return {
    totalItems: items.length,
    byStatus,
    byType
  };
}
