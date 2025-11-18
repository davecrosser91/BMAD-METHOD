"""
GitHub Projects Server Wrapper
Wraps GitHub CLI for GitHub Projects v2

Usage:
    from servers.github.projects import create_project
    project = create_project("Research Sprint 1")
"""

import json
import subprocess
import time
from typing import List, Dict, Optional, Union


def create_project(title: str, description: Optional[str] = None) -> Dict:
    """
    Create a new GitHub Project

    Args:
        title: Project title
        description: Optional project description

    Returns:
        Created project details

    Example:
        project = create_project(
            "Research Phase 2",
            "Experiment implementation and analysis"
        )
    """
    print(f"[GitHub] Creating project: \"{title}\"")

    cmd = ['gh', 'project', 'create', '--title', title]

    if description:
        cmd.extend(['--description', description])

    cmd.extend(['--format', 'json'])

    result = subprocess.run(cmd, capture_output=True, text=True, check=True)
    project = json.loads(result.stdout)

    print(f"[GitHub] Created project #{project['number']}: {project['url']}")

    return project


def list_projects() -> List[Dict]:
    """List all projects"""
    print("[GitHub] Listing projects")

    result = subprocess.run(
        ['gh', 'project', 'list', '--format', 'json'],
        capture_output=True, text=True, check=True
    )

    projects = json.loads(result.stdout)

    print(f"[GitHub] Found {len(projects)} projects")

    return projects


def get_project(identifier: Union[int, str]) -> Dict:
    """Get project by number or title"""
    projects = list_projects()

    if isinstance(identifier, int):
        project = next((p for p in projects if p['number'] == identifier), None)
    else:
        project = next(
            (p for p in projects if identifier.lower() in p['title'].lower()),
            None
        )

    if not project:
        raise ValueError(f"Project not found: {identifier}")

    return project


def add_issue_to_project(project_number: int, issue_number: int) -> None:
    """Add issue to project"""
    print(f"[GitHub] Adding issue #{issue_number} to project #{project_number}")

    # Get repo name
    repo_result = subprocess.run(
        ['gh', 'repo', 'view', '--json', 'nameWithOwner'],
        capture_output=True, text=True, check=True
    )
    repo_data = json.loads(repo_result.stdout)
    repo_name = repo_data['nameWithOwner']

    # Add issue to project
    subprocess.run(
        [
            'gh', 'project', 'item-add', str(project_number),
            '--owner', '@me',
            '--url', f"https://github.com/{repo_name}/issues/{issue_number}"
        ],
        capture_output=True, text=True, check=True
    )

    print(f"[GitHub] Added issue #{issue_number} to project #{project_number}")


def add_issues_to_project(project_number: int, issue_numbers: List[int]) -> None:
    """Add multiple issues to project"""
    print(f"[GitHub] Adding {len(issue_numbers)} issues to project #{project_number}")

    for issue_number in issue_numbers:
        add_issue_to_project(project_number, issue_number)

        # Small delay to avoid rate limiting
        time.sleep(0.5)

    print(f"[GitHub] Added {len(issue_numbers)} issues to project #{project_number}")


def update_project_item_field(
    project_number: int,
    item_id: str,
    field_name: str,
    value: str
) -> None:
    """Update project item field"""
    print(f"[GitHub] Updating project item field: {field_name} = {value}")

    subprocess.run(
        [
            'gh', 'project', 'item-edit',
            '--project-id', str(project_number),
            '--id', item_id,
            '--field-name', field_name,
            '--text', value
        ],
        capture_output=True, text=True, check=True
    )

    print("[GitHub] Updated project item field")


def list_project_items(project_number: int) -> List[Dict]:
    """List project items"""
    print(f"[GitHub] Listing items in project #{project_number}")

    result = subprocess.run(
        ['gh', 'project', 'item-list', str(project_number), '--format', 'json'],
        capture_output=True, text=True, check=True
    )

    items = json.loads(result.stdout)

    print(f"[GitHub] Found {len(items)} items in project #{project_number}")

    return items


def create_bmad_project(title: str, description: Optional[str] = None) -> Dict:
    """Create project with standard BMAD workflow"""
    print(f"[GitHub] Creating BMAD workflow project: \"{title}\"")

    # Create project
    project = create_project(title, description)

    # Note: Field creation requires GitHub Projects v2 API
    # This is a placeholder for the field structure
    fields = {
        'status': 'Status',
        'priority': 'Priority',
        'size': 'Size'
    }

    print(f"[GitHub] BMAD project created: {project['url']}")
    print("[GitHub] Configure these fields manually:")
    print("  - Status: Backlog, Todo, In Progress, In Review, Done")
    print("  - Priority: P0, P1, P2, P3")
    print("  - Size: XS, S, M, L, XL")

    return {
        'project': project,
        'fields': fields
    }


def create_research_project(
    research_area: str,
    milestone_title: Optional[str] = None
) -> Dict:
    """Create research project"""
    title = milestone_title or f"Research: {research_area}"
    description = f"""Research project for {research_area}

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
"""

    return create_project(title, description)


def close_project(project_number: int) -> None:
    """Archive/close project"""
    print(f"[GitHub] Closing project #{project_number}")

    subprocess.run(
        ['gh', 'project', 'close', str(project_number)],
        capture_output=True, text=True, check=True
    )

    print(f"[GitHub] Closed project #{project_number}")


def reopen_project(project_number: int) -> None:
    """Reopen project"""
    print(f"[GitHub] Reopening project #{project_number}")

    subprocess.run(
        ['gh', 'project', 'reopen', str(project_number)],
        capture_output=True, text=True, check=True
    )

    print(f"[GitHub] Reopened project #{project_number}")


def get_project_stats(project_number: int) -> Dict:
    """Get project statistics"""
    items = list_project_items(project_number)

    by_status: Dict[str, int] = {}
    by_type: Dict[str, int] = {}

    for item in items:
        # Count by type
        item_type = item.get('content', {}).get('type', 'Unknown')
        by_type[item_type] = by_type.get(item_type, 0) + 1

        # Count by status (if available in fieldValues)
        status = item.get('fieldValues', {}).get('Status', 'Unknown')
        by_status[status] = by_status.get(status, 0) + 1

    return {
        'totalItems': len(items),
        'byStatus': by_status,
        'byType': by_type
    }
