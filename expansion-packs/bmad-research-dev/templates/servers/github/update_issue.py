"""
GitHub Update Issue Server Wrapper
Wraps GitHub CLI (gh issue edit)

Usage:
    from servers.github.update_issue import update_issue
    update_issue(123, state='closed')
"""

import json
import subprocess
import time
from typing import List, Dict, Optional, Literal


def update_issue(
    issue_number: int,
    title: Optional[str] = None,
    body: Optional[str] = None,
    add_labels: Optional[List[str]] = None,
    remove_labels: Optional[List[str]] = None,
    add_assignees: Optional[List[str]] = None,
    remove_assignees: Optional[List[str]] = None,
    milestone: Optional[str] = None,
    state: Optional[Literal['open', 'closed']] = None
) -> Dict:
    """
    Update an existing GitHub issue

    Args:
        issue_number: Issue number to update
        title: New title
        body: New body
        add_labels: Labels to add
        remove_labels: Labels to remove
        add_assignees: Assignees to add
        remove_assignees: Assignees to remove
        milestone: Milestone to set
        state: State to set (open/closed)

    Returns:
        Updated issue details

    Examples:
        # Update issue title
        update_issue(42, title="Updated title")

        # Add labels
        update_issue(42, add_labels=['status:doing', 'priority:p1'])

        # Close issue
        update_issue(42, state='closed', add_labels=['status:done'])
    """
    print(f"[GitHub] Updating issue #{issue_number}")

    # Build command
    cmd = ['gh', 'issue', 'edit', str(issue_number)]

    if title:
        cmd.extend(['--title', title])

    if body:
        cmd.extend(['--body', body])

    if add_labels:
        cmd.extend(['--add-label', ','.join(add_labels)])

    if remove_labels:
        cmd.extend(['--remove-label', ','.join(remove_labels)])

    if add_assignees:
        cmd.extend(['--add-assignee', ','.join(add_assignees)])

    if remove_assignees:
        cmd.extend(['--remove-assignee', ','.join(remove_assignees)])

    if milestone:
        cmd.extend(['--milestone', milestone])

    subprocess.run(cmd, capture_output=True, text=True, check=True)

    # Handle state change separately if needed
    if state == 'closed':
        subprocess.run(
            ['gh', 'issue', 'close', str(issue_number)],
            capture_output=True, text=True, check=True
        )
    elif state == 'open':
        subprocess.run(
            ['gh', 'issue', 'reopen', str(issue_number)],
            capture_output=True, text=True, check=True
        )

    # Get updated issue
    result = subprocess.run(
        ['gh', 'issue', 'view', str(issue_number), '--json', 'number,title,url,state'],
        capture_output=True, text=True, check=True
    )
    issue = json.loads(result.stdout)

    print(f"[GitHub] Updated issue #{issue['number']}")

    return issue


def update_status(
    issue_number: int,
    new_status: Literal['backlog', 'todo', 'doing', 'review', 'done']
) -> Dict:
    """Update issue status (BMAD workflow)"""
    print(f"[GitHub] Moving issue #{issue_number} to {new_status}")

    # Map of status labels
    status_labels = {
        'backlog': 'status:backlog',
        'todo': 'status:todo',
        'doing': 'status:doing',
        'review': 'status:review',
        'done': 'status:done'
    }

    all_status_labels = list(status_labels.values())
    new_label = status_labels[new_status]

    # Remove old status labels and add new one
    kwargs = {
        'remove_labels': all_status_labels,
        'add_labels': [new_label]
    }

    if new_status == 'done':
        kwargs['state'] = 'closed'

    return update_issue(issue_number, **kwargs)


def move_to_backlog(issue_number: int) -> Dict:
    """Move issue to backlog"""
    return update_status(issue_number, 'backlog')


def move_to_todo(issue_number: int) -> Dict:
    """Move issue to todo"""
    return update_status(issue_number, 'todo')


def move_to_doing(issue_number: int, assignee: Optional[str] = None) -> Dict:
    """Move issue to doing (in progress)"""
    kwargs = {
        'remove_labels': ['status:backlog', 'status:todo', 'status:review', 'status:done'],
        'add_labels': ['status:doing']
    }

    if assignee:
        kwargs['add_assignees'] = [assignee]

    return update_issue(issue_number, **kwargs)


def move_to_review(issue_number: int) -> Dict:
    """Move issue to review"""
    return update_status(issue_number, 'review')


def move_to_done(issue_number: int) -> Dict:
    """Move issue to done (close)"""
    return update_status(issue_number, 'done')


def update_priority(
    issue_number: int,
    priority: Literal['p0', 'p1', 'p2', 'p3']
) -> Dict:
    """Update issue priority"""
    priority_labels = ['priority:p0', 'priority:p1', 'priority:p2', 'priority:p3']
    new_priority = f"priority:{priority}"

    return update_issue(
        issue_number,
        remove_labels=priority_labels,
        add_labels=[new_priority]
    )


def assign_issue(issue_number: int, assignees: any) -> Dict:
    """Assign issue to user"""
    assignee_list = assignees if isinstance(assignees, list) else [assignees]

    return update_issue(issue_number, add_assignees=assignee_list)


def add_comment(issue_number: int, comment: str) -> None:
    """Add comment to issue"""
    print(f"[GitHub] Adding comment to issue #{issue_number}")

    subprocess.run(
        ['gh', 'issue', 'comment', str(issue_number), '--body', comment],
        capture_output=True, text=True, check=True
    )

    print(f"[GitHub] Comment added to issue #{issue_number}")


def add_experiment_results(
    issue_number: int,
    experiment_id: str,
    status: Literal['success', 'failure', 'partial'],
    metrics: Optional[Dict[str, float]] = None,
    findings: Optional[str] = None,
    next_steps: Optional[str] = None
) -> None:
    """Add experiment results comment"""
    status_emoji = {
        'success': '✅',
        'failure': '❌',
        'partial': '⚠️'
    }

    comment_parts = [
        f"## Experiment Results: {experiment_id}\n",
        f"**Status:** {status_emoji[status]} {status.upper()}\n"
    ]

    if metrics:
        comment_parts.append("### Metrics")
        for key, value in metrics.items():
            comment_parts.append(f"- **{key}**: {value}")
        comment_parts.append("")

    if findings:
        comment_parts.append(f"### Findings\n{findings}\n")

    if next_steps:
        comment_parts.append(f"### Next Steps\n{next_steps}")

    comment = '\n'.join(comment_parts)

    add_comment(issue_number, comment)


def update_issues(updates: List[Dict]) -> List[Dict]:
    """Update multiple issues in batch"""
    print(f"[GitHub] Updating {len(updates)} issues...")

    updated = []
    for item in updates:
        issue_number = item['issueNumber']
        changes = item['changes']
        issue = update_issue(issue_number, **changes)
        updated.append(issue)

        # Small delay to avoid rate limiting
        time.sleep(0.5)

    print(f"[GitHub] Updated {len(updated)} issues")

    return updated


def bulk_status_update(
    issue_numbers: List[int],
    new_status: Literal['backlog', 'todo', 'doing', 'review', 'done']
) -> List[Dict]:
    """Bulk status update"""
    updates = []
    for num in issue_numbers:
        changes = {
            'remove_labels': ['status:backlog', 'status:todo', 'status:doing', 'status:review', 'status:done'],
            'add_labels': [f"status:{new_status}"]
        }
        if new_status == 'done':
            changes['state'] = 'closed'

        updates.append({
            'issueNumber': num,
            'changes': changes
        })

    return update_issues(updates)
