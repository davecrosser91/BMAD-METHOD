/**
 * GitHub Create Issue Server Wrapper
 * Wraps GitHub CLI (gh issue create)
 *
 * Usage:
 *   import { createIssue } from './servers/github/create-issue.ts'
 *   const issue = await createIssue("Bug in login", "Users cannot log in")
 */

interface CreateIssueOptions {
  title: string;
  body: string;
  labels?: string[];
  assignees?: string[];
  milestone?: string;
  project?: string;
}

interface Issue {
  number: number;
  title: string;
  url: string;
  state: string;
}

/**
 * Create a new GitHub issue
 *
 * @param title - Issue title
 * @param body - Issue description (supports markdown)
 * @param options - Optional issue configuration
 * @returns Created issue details
 *
 * @example
 * // Simple issue
 * const issue = await createIssue(
 *   "Implement attention mechanism",
 *   "Add efficient attention to transformer model"
 * )
 *
 * @example
 * // Issue with labels and milestone
 * const issue = await createIssue(
 *   "Experiment: Test Flash Attention",
 *   "## Hypothesis\\nFlash Attention will improve speed by 2x",
 *   {
 *     labels: ['type:experiment', 'research:experiment'],
 *     milestone: 'Research Phase 2',
 *     assignees: ['@me']
 *   }
 * )
 */
export async function createIssue(
  title: string,
  body: string,
  options: Omit<CreateIssueOptions, 'title' | 'body'> = {}
): Promise<Issue> {
  console.log(`[GitHub] Creating issue: "${title}"`)

  // Build command
  const cmdParts = ['gh issue create'];

  cmdParts.push(`--title "${title.replace(/"/g, '\\"')}"`);
  cmdParts.push(`--body "${body.replace(/"/g, '\\"')}"`);

  if (options.labels && options.labels.length > 0) {
    cmdParts.push(`--label "${options.labels.join(',')}"`);
  }

  if (options.assignees && options.assignees.length > 0) {
    cmdParts.push(`--assignee "${options.assignees.join(',')}"`);
  }

  if (options.milestone) {
    cmdParts.push(`--milestone "${options.milestone}"`);
  }

  if (options.project) {
    cmdParts.push(`--project "${options.project}"`);
  }

  cmdParts.push('--json number,title,url,state');

  const cmd = cmdParts.join(' ');

  console.log(`[GitHub] Executing: ${cmd}`)

  const result = await globalThis.Bash({ command: cmd });
  const issue = JSON.parse(result);

  console.log(`[GitHub] Created issue #${issue.number}: ${issue.url}`)

  return issue;
}

/**
 * Create a bug report issue
 */
export async function createBugReport(
  title: string,
  description: string,
  stepsToReproduce?: string[],
  expectedBehavior?: string,
  actualBehavior?: string
): Promise<Issue> {
  const body = `## Description
${description}

${stepsToReproduce ? `## Steps to Reproduce
${stepsToReproduce.map((step, i) => `${i + 1}. ${step}`).join('\n')}
` : ''}
${expectedBehavior ? `## Expected Behavior
${expectedBehavior}
` : ''}
${actualBehavior ? `## Actual Behavior
${actualBehavior}
` : ''}`;

  return createIssue(title, body, {
    labels: ['type:bug']
  });
}

/**
 * Create a feature request issue
 */
export async function createFeatureRequest(
  title: string,
  userStory: string,
  acceptanceCriteria: string[],
  priority?: string
): Promise<Issue> {
  const body = `## User Story
${userStory}

## Acceptance Criteria
${acceptanceCriteria.map((criteria, i) => `- [ ] ${criteria}`).join('\n')}
`;

  const labels = ['type:feature'];
  if (priority) {
    labels.push(`priority:${priority}`);
  }

  return createIssue(title, body, { labels });
}

/**
 * Create a research experiment issue
 */
export async function createExperimentIssue(
  title: string,
  hypothesis: string,
  methodology: string,
  expectedResults: string,
  milestone?: string
): Promise<Issue> {
  const body = `## Hypothesis
${hypothesis}

## Methodology
${methodology}

## Expected Results
${expectedResults}

## Experiment Checklist
- [ ] Design experiment
- [ ] Implement in \`experiments/\` folder
- [ ] Run experiment
- [ ] Analyze results in \`results/\` folder
- [ ] Document findings
- [ ] Update paper (if applicable)
`;

  return createIssue(title, body, {
    labels: ['type:experiment', 'research:experiment'],
    milestone
  });
}

/**
 * Create a literature review issue
 */
export async function createLiteratureReviewIssue(
  topic: string,
  researchQuestions: string[],
  milestone?: string
): Promise<Issue> {
  const body = `## Topic
${topic}

## Research Questions
${researchQuestions.map((q, i) => `${i + 1}. ${q}`).join('\n')}

## Review Tasks
- [ ] Search academic databases (ArXiv, Google Scholar)
- [ ] Search industry blogs and documentation
- [ ] Search personal Zotero library
- [ ] Synthesize findings
- [ ] Identify research gaps
- [ ] Create literature review document in \`docs/research/literature-reviews/\`
`;

  return createIssue(`Literature Review: ${topic}`, body, {
    labels: ['research:literature'],
    milestone
  });
}

/**
 * Create a paper writing issue
 */
export async function createPaperWritingIssue(
  section: string,
  requirements: string,
  milestone?: string
): Promise<Issue> {
  const body = `## Section
${section}

## Requirements
${requirements}

## Writing Tasks
- [ ] Draft section content
- [ ] Include figures/tables (if applicable)
- [ ] Add citations
- [ ] Review for clarity and coherence
- [ ] Get feedback
- [ ] Revise and finalize
`;

  return createIssue(`Paper: Write ${section} section`, body, {
    labels: ['research:paper'],
    milestone
  });
}

/**
 * Create an analysis issue
 */
export async function createAnalysisIssue(
  title: string,
  dataSource: string,
  analysisGoals: string[],
  deliverables: string[]
): Promise<Issue> {
  const body = `## Data Source
${dataSource}

## Analysis Goals
${analysisGoals.map((goal, i) => `${i + 1}. ${goal}`).join('\n')}

## Deliverables
${deliverables.map((d, i) => `- [ ] ${d}`).join('\n')}

## Output Location
Results should be saved in \`results/analysis/\`
`;

  return createIssue(title, body, {
    labels: ['type:analysis', 'research:analysis']
  });
}

/**
 * Create multiple issues from a list
 */
export async function createIssues(
  issues: Array<{
    title: string;
    body: string;
    labels?: string[];
    milestone?: string;
  }>
): Promise<Issue[]> {
  console.log(`[GitHub] Creating ${issues.length} issues...`)

  const created = [];
  for (const issueData of issues) {
    const issue = await createIssue(issueData.title, issueData.body, {
      labels: issueData.labels,
      milestone: issueData.milestone
    });
    created.push(issue);

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`[GitHub] Created ${created.length} issues`)

  return created;
}

/**
 * Create epic with child stories
 */
export async function createEpic(
  epicTitle: string,
  epicDescription: string,
  stories: Array<{ title: string; body: string }>,
  milestone?: string
): Promise<{ epic: Issue; stories: Issue[] }> {
  // Create epic first
  const epic = await createIssue(epicTitle, epicDescription, {
    labels: ['type:epic'],
    milestone
  });

  console.log(`[GitHub] Created epic #${epic.number}, now creating ${stories.length} stories...`)

  // Create stories referencing the epic
  const createdStories = [];
  for (const story of stories) {
    const storyBody = `${story.body}\n\n---\nPart of epic #${epic.number}`;
    const createdStory = await createIssue(story.title, storyBody, {
      labels: ['type:story'],
      milestone
    });
    createdStories.push(createdStory);

    // Small delay
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`[GitHub] Epic #${epic.number} created with ${createdStories.length} stories`)

  return { epic, stories: createdStories };
}
