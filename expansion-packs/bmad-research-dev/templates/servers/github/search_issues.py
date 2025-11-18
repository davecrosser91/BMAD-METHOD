"""
GitHub Issues Search Server Wrapper
Wraps GitHub CLI (gh) and MCP GitHub tools

Usage:
    from servers.github.search_issues import search_issues
    issues = search_issues("label:bug is:open")
"""

import json
import subprocess
from typing import List, Dict, Optional, Literal
from datetime import datetime


def search_issues(
    query: Optional[str] = None,
    state: Optional[Literal['open', 'closed', 'all']] = None,
    labels: Optional[List[str]] = None,
    assignee: Optional[str] = None,
    milestone: Optional[str] = None,
    author: Optional[str] = None,
    limit: int = 50,
    sort: Optional[Literal['created', 'updated', 'comments']] = None,
    order: Optional[Literal['asc', 'desc']] = None
) -> List[Dict]:
    """
    Search GitHub issues in current repository

    Args:
        query: GitHub search query (uses GitHub search syntax)
        state: Issue state filter
        labels: Label filters
        assignee: Assignee filter
        milestone: Milestone filter
        author: Author filter
        limit: Maximum results (default: 50)
        sort: Sort field
        order: Sort order

    Returns:
        Array of issues matching the search

    Examples:
        # Search open bugs
        bugs = search_issues("is:open label:bug")

        # Search by milestone
        issues = search_issues("milestone:'Sprint 1'")

        # Search with filters
        issues = search_issues("neural", state='open', labels=['type:experiment'], limit=20)
    """
    print(f"[GitHub] Searching issues: \"{query or 'all'}\"")

    # Build search query
    search_query = query or ''

    # Add filters
    if state:
        search_query += f" is:{state}"

    if labels:
        for label in labels:
            search_query += f" label:\"{label}\""

    if assignee:
        search_query += f" assignee:{assignee}"

    if milestone:
        search_query += f" milestone:\"{milestone}\""

    if author:
        search_query += f" author:{author}"

    # Build command
    cmd = ['gh', 'issue', 'list']

    if search_query.strip():
        cmd.extend(['--search', search_query.strip()])

    cmd.extend(['--limit', str(limit)])
    cmd.extend([
        '--json',
        'number,title,state,author,labels,assignees,milestone,body,createdAt,updatedAt,closedAt,url,comments'
    ])

    print(f"[GitHub] Executing: {' '.join(cmd)}")

    result = subprocess.run(cmd, capture_output=True, text=True, check=True)
    issues = json.loads(result.stdout)

    print(f"[GitHub] Found {len(issues)} issues")

    return issues


def get_open_issues(limit: int = 100) -> List[Dict]:
    """Get all open issues"""
    return search_issues(state='open', limit=limit)


def get_issues_by_label(label: str) -> List[Dict]:
    """Get issues by label"""
    return search_issues(labels=[label], state='all')


def get_issues_by_milestone(milestone: str) -> List[Dict]:
    """Get issues in milestone"""
    return search_issues(milestone=milestone, state='all')


def get_assigned_issues(assignee: str) -> List[Dict]:
    """Get issues assigned to user"""
    return search_issues(assignee=assignee, state='open')


def get_issues_by_type(issue_type: str) -> List[Dict]:
    """Get issues by type"""
    type_labels = {
        'epic': 'type:epic',
        'story': 'type:story',
        'task': 'type:task',
        'bug': 'type:bug',
        'experiment': 'type:experiment',
        'analysis': 'type:analysis'
    }

    label = type_labels.get(issue_type.lower(), f"type:{issue_type}")

    return get_issues_by_label(label)


def get_issues_by_status(status: str) -> List[Dict]:
    """Get issues by status"""
    status_labels = {
        'backlog': 'status:backlog',
        'todo': 'status:todo',
        'doing': 'status:doing',
        'review': 'status:review',
        'done': 'status:done'
    }

    label = status_labels.get(status.lower(), f"status:{status}")

    return get_issues_by_label(label)


def search_research_issues(keywords: Optional[str] = None) -> Dict[str, List[Dict]]:
    """Search research-related issues"""
    experiments = get_issues_by_label('research:experiment')
    literature = get_issues_by_label('research:literature')
    analysis = get_issues_by_label('research:analysis')
    papers = get_issues_by_label('research:paper')

    # Filter by keywords if provided
    def filter_by_keywords(issues: List[Dict]) -> List[Dict]:
        if not keywords:
            return issues
        lower_keywords = keywords.lower()
        return [
            issue for issue in issues
            if lower_keywords in issue['title'].lower() or
               lower_keywords in issue.get('body', '').lower()
        ]

    return {
        'experiments': filter_by_keywords(experiments),
        'literature': filter_by_keywords(literature),
        'analysis': filter_by_keywords(analysis),
        'papers': filter_by_keywords(papers)
    }


def get_issue_stats() -> Dict:
    """Get issue statistics"""
    all_issues = search_issues(state='all', limit=1000)

    open_count = len([i for i in all_issues if i['state'] == 'open'])
    closed_count = len([i for i in all_issues if i['state'] == 'closed'])

    # Count by label
    by_label: Dict[str, int] = {}
    for issue in all_issues:
        for label in issue.get('labels', []):
            label_name = label.get('name', '') if isinstance(label, dict) else str(label)
            by_label[label_name] = by_label.get(label_name, 0) + 1

    # Count by milestone
    by_milestone: Dict[str, int] = {}
    for issue in all_issues:
        milestone = issue.get('milestone')
        if milestone:
            title = milestone.get('title', '') if isinstance(milestone, dict) else str(milestone)
            by_milestone[title] = by_milestone.get(title, 0) + 1

    # Count by assignee
    by_assignee: Dict[str, int] = {}
    for issue in all_issues:
        for assignee in issue.get('assignees', []):
            assignee_name = assignee.get('login', '') if isinstance(assignee, dict) else str(assignee)
            by_assignee[assignee_name] = by_assignee.get(assignee_name, 0) + 1

    # Calculate average time to close
    closed_issues = [i for i in all_issues if i.get('closedAt')]
    if closed_issues:
        total_time = 0
        for issue in closed_issues:
            created = datetime.fromisoformat(issue['createdAt'].replace('Z', '+00:00'))
            closed = datetime.fromisoformat(issue['closedAt'].replace('Z', '+00:00'))
            total_time += (closed - created).total_seconds()
        avg_time_to_close = (total_time / len(closed_issues)) / (60 * 60 * 24)  # Convert to days
    else:
        avg_time_to_close = 0

    return {
        'total': len(all_issues),
        'open': open_count,
        'closed': closed_count,
        'byLabel': by_label,
        'byMilestone': by_milestone,
        'byAssignee': by_assignee,
        'avgTimeToClose': avg_time_to_close
    }


def find_related_issues(issue_number: int) -> List[Dict]:
    """Find related issues"""
    # Get the issue details
    cmd = ['gh', 'issue', 'view', str(issue_number), '--json', 'number,title,body,labels']
    result = subprocess.run(cmd, capture_output=True, text=True, check=True)
    issue = json.loads(result.stdout)

    # Extract keywords from title
    keywords = [
        word for word in issue['title'].lower().split()
        if len(word) > 4
    ][:3]

    search_query = ' '.join(keywords)

    # Search for similar issues
    related = search_issues(search_query, state='all', limit=10)

    # Filter out the original issue
    return [i for i in related if i['number'] != issue_number]
