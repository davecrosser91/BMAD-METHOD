/**
 * GitHub Update Issue Server Wrapper
 * Wraps GitHub CLI (gh issue edit)
 *
 * Usage:
 *   import { updateIssue } from './servers/github/update-issue.ts'
 *   await updateIssue(123, { state: 'closed' })
 */

interface UpdateOptions {
  title?: string;
  body?: string;
  addLabels?: string[];
  removeLabels?: string[];
  addAssignees?: string[];
  removeAssignees?: string[];
  milestone?: string;
  state?: 'open' | 'closed';
}

interface Issue {
  number: number;
  title: string;
  url: string;
  state: string;
}

/**
 * Update an existing GitHub issue
 *
 * @param issueNumber - Issue number to update
 * @param updates - Fields to update
 * @returns Updated issue details
 *
 * @example
 * // Update issue title
 * await updateIssue(42, {
 *   title: "Updated title"
 * })
 *
 * @example
 * // Add labels
 * await updateIssue(42, {
 *   addLabels: ['status:doing', 'priority:p1']
 * })
 *
 * @example
 * // Close issue
 * await updateIssue(42, {
 *   state: 'closed',
 *   addLabels: ['status:done']
 * })
 */
export async function updateIssue(
  issueNumber: number,
  updates: UpdateOptions
): Promise<Issue> {
  console.log(`[GitHub] Updating issue #${issueNumber}`)

  const cmdParts = [`gh issue edit ${issueNumber}`];

  if (updates.title) {
    cmdParts.push(`--title "${updates.title.replace(/"/g, '\\"')}"`);
  }

  if (updates.body) {
    cmdParts.push(`--body "${updates.body.replace(/"/g, '\\"')}"`);
  }

  if (updates.addLabels && updates.addLabels.length > 0) {
    cmdParts.push(`--add-label "${updates.addLabels.join(',')}"`);
  }

  if (updates.removeLabels && updates.removeLabels.length > 0) {
    cmdParts.push(`--remove-label "${updates.removeLabels.join(',')}"`);
  }

  if (updates.addAssignees && updates.addAssignees.length > 0) {
    cmdParts.push(`--add-assignee "${updates.addAssignees.join(',')}"`);
  }

  if (updates.removeAssignees && updates.removeAssignees.length > 0) {
    cmdParts.push(`--remove-assignee "${updates.removeAssignees.join(',')}"`);
  }

  if (updates.milestone) {
    cmdParts.push(`--milestone "${updates.milestone}"`);
  }

  const cmd = cmdParts.join(' ');

  await globalThis.Bash({ command: cmd });

  // Handle state change separately if needed
  if (updates.state === 'closed') {
    await globalThis.Bash({
      command: `gh issue close ${issueNumber}`
    });
  } else if (updates.state === 'open') {
    await globalThis.Bash({
      command: `gh issue reopen ${issueNumber}`
    });
  }

  // Get updated issue
  const result = await globalThis.Bash({
    command: `gh issue view ${issueNumber} --json number,title,url,state`
  });
  const issue = JSON.parse(result);

  console.log(`[GitHub] Updated issue #${issue.number}`)

  return issue;
}

/**
 * Update issue status (BMAD workflow)
 */
export async function updateStatus(
  issueNumber: number,
  newStatus: 'backlog' | 'todo' | 'doing' | 'review' | 'done'
): Promise<Issue> {
  console.log(`[GitHub] Moving issue #${issueNumber} to ${newStatus}`)

  // Map of status transitions
  const statusLabels = {
    'backlog': 'status:backlog',
    'todo': 'status:todo',
    'doing': 'status:doing',
    'review': 'status:review',
    'done': 'status:done'
  };

  const allStatusLabels = Object.values(statusLabels);
  const newLabel = statusLabels[newStatus];

  // Remove old status labels and add new one
  return updateIssue(issueNumber, {
    removeLabels: allStatusLabels,
    addLabels: [newLabel],
    ...(newStatus === 'done' && { state: 'closed' })
  });
}

/**
 * Move issue to backlog
 */
export async function moveToBacklog(issueNumber: number): Promise<Issue> {
  return updateStatus(issueNumber, 'backlog');
}

/**
 * Move issue to todo
 */
export async function moveToTodo(issueNumber: number): Promise<Issue> {
  return updateStatus(issueNumber, 'todo');
}

/**
 * Move issue to doing (in progress)
 */
export async function moveToDoing(issueNumber: number, assignee?: string): Promise<Issue> {
  const updates: UpdateOptions = {
    removeLabels: ['status:backlog', 'status:todo', 'status:review', 'status:done'],
    addLabels: ['status:doing']
  };

  if (assignee) {
    updates.addAssignees = [assignee];
  }

  return updateIssue(issueNumber, updates);
}

/**
 * Move issue to review
 */
export async function moveToReview(issueNumber: number): Promise<Issue> {
  return updateStatus(issueNumber, 'review');
}

/**
 * Move issue to done (close)
 */
export async function moveToDone(issueNumber: number): Promise<Issue> {
  return updateStatus(issueNumber, 'done');
}

/**
 * Update issue priority
 */
export async function updatePriority(
  issueNumber: number,
  priority: 'p0' | 'p1' | 'p2' | 'p3'
): Promise<Issue> {
  const priorityLabels = ['priority:p0', 'priority:p1', 'priority:p2', 'priority:p3'];
  const newPriority = `priority:${priority}`;

  return updateIssue(issueNumber, {
    removeLabels: priorityLabels,
    addLabels: [newPriority]
  });
}

/**
 * Assign issue to user
 */
export async function assignIssue(
  issueNumber: number,
  assignees: string | string[]
): Promise<Issue> {
  const assigneeList = Array.isArray(assignees) ? assignees : [assignees];

  return updateIssue(issueNumber, {
    addAssignees: assigneeList
  });
}

/**
 * Add comment to issue
 */
export async function addComment(
  issueNumber: number,
  comment: string
): Promise<void> {
  console.log(`[GitHub] Adding comment to issue #${issueNumber}`)

  await globalThis.Bash({
    command: `gh issue comment ${issueNumber} --body "${comment.replace(/"/g, '\\"')}"`
  });

  console.log(`[GitHub] Comment added to issue #${issueNumber}`)
}

/**
 * Add experiment results comment
 */
export async function addExperimentResults(
  issueNumber: number,
  experimentId: string,
  results: {
    status: 'success' | 'failure' | 'partial';
    metrics?: Record<string, number>;
    findings?: string;
    nextSteps?: string;
  }
): Promise<void> {
  const statusEmoji = {
    success: '✅',
    failure: '❌',
    partial: '⚠️'
  };

  let comment = `## Experiment Results: ${experimentId}\n\n`;
  comment += `**Status:** ${statusEmoji[results.status]} ${results.status.toUpperCase()}\n\n`;

  if (results.metrics) {
    comment += `### Metrics\n`;
    Object.entries(results.metrics).forEach(([key, value]) => {
      comment += `- **${key}**: ${value}\n`;
    });
    comment += '\n';
  }

  if (results.findings) {
    comment += `### Findings\n${results.findings}\n\n`;
  }

  if (results.nextSteps) {
    comment += `### Next Steps\n${results.nextSteps}\n`;
  }

  await addComment(issueNumber, comment);
}

/**
 * Update multiple issues in batch
 */
export async function updateIssues(
  updates: Array<{ issueNumber: number; changes: UpdateOptions }>
): Promise<Issue[]> {
  console.log(`[GitHub] Updating ${updates.length} issues...`)

  const updated = [];
  for (const { issueNumber, changes } of updates) {
    const issue = await updateIssue(issueNumber, changes);
    updated.push(issue);

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`[GitHub] Updated ${updated.length} issues`)

  return updated;
}

/**
 * Bulk status update
 */
export async function bulkStatusUpdate(
  issueNumbers: number[],
  newStatus: 'backlog' | 'todo' | 'doing' | 'review' | 'done'
): Promise<Issue[]> {
  return updateIssues(
    issueNumbers.map(num => ({
      issueNumber: num,
      changes: {
        removeLabels: ['status:backlog', 'status:todo', 'status:doing', 'status:review', 'status:done'],
        addLabels: [`status:${newStatus}`],
        ...(newStatus === 'done' && { state: 'closed' })
      }
    }))
  );
}
