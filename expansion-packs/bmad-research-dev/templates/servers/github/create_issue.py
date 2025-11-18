"""
GitHub Create Issue Server Wrapper
Wraps GitHub CLI (gh issue create)

Usage:
    from servers.github.create_issue import create_issue
    issue = create_issue("Bug in login", "Users cannot log in")
"""

import json
import subprocess
import time
from typing import List, Dict, Optional


def create_issue(
    title: str,
    body: str,
    labels: Optional[List[str]] = None,
    assignees: Optional[List[str]] = None,
    milestone: Optional[str] = None,
    project: Optional[str] = None
) -> Dict:
    """
    Create a new GitHub issue

    Args:
        title: Issue title
        body: Issue description (supports markdown)
        labels: Optional labels
        assignees: Optional assignees
        milestone: Optional milestone
        project: Optional project

    Returns:
        Created issue details

    Examples:
        # Simple issue
        issue = create_issue(
            "Implement attention mechanism",
            "Add efficient attention to transformer model"
        )

        # Issue with labels and milestone
        issue = create_issue(
            "Experiment: Test Flash Attention",
            "## Hypothesis\\nFlash Attention will improve speed by 2x",
            labels=['type:experiment', 'research:experiment'],
            milestone='Research Phase 2',
            assignees=['@me']
        )
    """
    print(f"[GitHub] Creating issue: \"{title}\"")

    # Build command
    cmd = ['gh', 'issue', 'create']

    cmd.extend(['--title', title])
    cmd.extend(['--body', body])

    if labels:
        cmd.extend(['--label', ','.join(labels)])

    if assignees:
        cmd.extend(['--assignee', ','.join(assignees)])

    if milestone:
        cmd.extend(['--milestone', milestone])

    if project:
        cmd.extend(['--project', project])

    cmd.extend(['--json', 'number,title,url,state'])

    print(f"[GitHub] Executing: {' '.join(cmd)}")

    result = subprocess.run(cmd, capture_output=True, text=True, check=True)
    issue = json.loads(result.stdout)

    print(f"[GitHub] Created issue #{issue['number']}: {issue['url']}")

    return issue


def create_bug_report(
    title: str,
    description: str,
    steps_to_reproduce: Optional[List[str]] = None,
    expected_behavior: Optional[str] = None,
    actual_behavior: Optional[str] = None
) -> Dict:
    """Create a bug report issue"""
    body_parts = [f"## Description\n{description}\n"]

    if steps_to_reproduce:
        body_parts.append("## Steps to Reproduce")
        for i, step in enumerate(steps_to_reproduce, 1):
            body_parts.append(f"{i}. {step}")
        body_parts.append("")

    if expected_behavior:
        body_parts.append(f"## Expected Behavior\n{expected_behavior}\n")

    if actual_behavior:
        body_parts.append(f"## Actual Behavior\n{actual_behavior}\n")

    body = '\n'.join(body_parts)

    return create_issue(title, body, labels=['type:bug'])


def create_feature_request(
    title: str,
    user_story: str,
    acceptance_criteria: List[str],
    priority: Optional[str] = None
) -> Dict:
    """Create a feature request issue"""
    body_parts = [
        f"## User Story\n{user_story}\n",
        "## Acceptance Criteria"
    ]

    for criteria in acceptance_criteria:
        body_parts.append(f"- [ ] {criteria}")

    body = '\n'.join(body_parts)

    labels = ['type:feature']
    if priority:
        labels.append(f"priority:{priority}")

    return create_issue(title, body, labels=labels)


def create_experiment_issue(
    title: str,
    hypothesis: str,
    methodology: str,
    expected_results: str,
    milestone: Optional[str] = None
) -> Dict:
    """Create a research experiment issue"""
    body = f"""## Hypothesis
{hypothesis}

## Methodology
{methodology}

## Expected Results
{expected_results}

## Experiment Checklist
- [ ] Design experiment
- [ ] Implement in `experiments/` folder
- [ ] Run experiment
- [ ] Analyze results in `results/` folder
- [ ] Document findings
- [ ] Update paper (if applicable)
"""

    return create_issue(
        title,
        body,
        labels=['type:experiment', 'research:experiment'],
        milestone=milestone
    )


def create_literature_review_issue(
    topic: str,
    research_questions: List[str],
    milestone: Optional[str] = None
) -> Dict:
    """Create a literature review issue"""
    body_parts = [
        f"## Topic\n{topic}\n",
        "## Research Questions"
    ]

    for i, question in enumerate(research_questions, 1):
        body_parts.append(f"{i}. {question}")

    body_parts.extend([
        "",
        "## Review Tasks",
        "- [ ] Search academic databases (ArXiv, Google Scholar)",
        "- [ ] Search industry blogs and documentation",
        "- [ ] Search personal Zotero library",
        "- [ ] Synthesize findings",
        "- [ ] Identify research gaps",
        "- [ ] Create literature review document in `docs/research/literature-reviews/`"
    ])

    body = '\n'.join(body_parts)

    return create_issue(
        f"Literature Review: {topic}",
        body,
        labels=['research:literature'],
        milestone=milestone
    )


def create_paper_writing_issue(
    section: str,
    requirements: str,
    milestone: Optional[str] = None
) -> Dict:
    """Create a paper writing issue"""
    body = f"""## Section
{section}

## Requirements
{requirements}

## Writing Tasks
- [ ] Draft section content
- [ ] Include figures/tables (if applicable)
- [ ] Add citations
- [ ] Review for clarity and coherence
- [ ] Get feedback
- [ ] Revise and finalize
"""

    return create_issue(
        f"Paper: Write {section} section",
        body,
        labels=['research:paper'],
        milestone=milestone
    )


def create_analysis_issue(
    title: str,
    data_source: str,
    analysis_goals: List[str],
    deliverables: List[str]
) -> Dict:
    """Create an analysis issue"""
    body_parts = [
        f"## Data Source\n{data_source}\n",
        "## Analysis Goals"
    ]

    for i, goal in enumerate(analysis_goals, 1):
        body_parts.append(f"{i}. {goal}")

    body_parts.extend(["", "## Deliverables"])

    for deliverable in deliverables:
        body_parts.append(f"- [ ] {deliverable}")

    body_parts.extend([
        "",
        "## Output Location",
        "Results should be saved in `results/analysis/`"
    ])

    body = '\n'.join(body_parts)

    return create_issue(title, body, labels=['type:analysis', 'research:analysis'])


def create_issues(issues: List[Dict]) -> List[Dict]:
    """Create multiple issues from a list"""
    print(f"[GitHub] Creating {len(issues)} issues...")

    created = []
    for issue_data in issues:
        issue = create_issue(
            issue_data['title'],
            issue_data['body'],
            labels=issue_data.get('labels'),
            milestone=issue_data.get('milestone')
        )
        created.append(issue)

        # Small delay to avoid rate limiting
        time.sleep(0.5)

    print(f"[GitHub] Created {len(created)} issues")

    return created


def create_epic(
    epic_title: str,
    epic_description: str,
    stories: List[Dict[str, str]],
    milestone: Optional[str] = None
) -> Dict[str, any]:
    """Create epic with child stories"""
    # Create epic first
    epic = create_issue(epic_title, epic_description, labels=['type:epic'], milestone=milestone)

    print(f"[GitHub] Created epic #{epic['number']}, now creating {len(stories)} stories...")

    # Create stories referencing the epic
    created_stories = []
    for story in stories:
        story_body = f"{story['body']}\n\n---\nPart of epic #{epic['number']}"
        created_story = create_issue(
            story['title'],
            story_body,
            labels=['type:story'],
            milestone=milestone
        )
        created_stories.append(created_story)

        # Small delay
        time.sleep(0.5)

    print(f"[GitHub] Epic #{epic['number']} created with {len(created_stories)} stories")

    return {
        'epic': epic,
        'stories': created_stories
    }
