# Prepare Submission Task

## Purpose

Format and prepare research paper for submission to conference or journal.

## When to Use

- Paper draft is complete and reviewed
- Ready to submit to target venue
- Preparing resubmission after revisions

## Prerequisites

- Complete paper draft
- Target venue identified
- All figures and tables finalized
- Code ready for release (or release plan)

## Instructions

### Step 1: Verify Venue Requirements

Research and document venue requirements:

**Check venue website for:**

- Submission deadline
- Page limit (e.g., 8 pages + unlimited references)
- Formatting template (LaTeX, Word)
- Anonymization requirements (double-blind review?)
- Supplementary material limits
- Code/data submission requirements
- Ethical considerations / broader impact requirements

**Common venues and formats:**

- NeurIPS: 9 pages main + unlimited appendix, neurips_2024.sty
- ICML: 8 pages main + unlimited appendix, icml2024.sty
- ICLR: 9 pages main + unlimited appendix, iclr2025 template
- CVPR: 8 pages main, cvpr.sty
- ACL: 8 pages main, acl.sty

### Step 2: Download and Setup Template

Guide user to:

1. Download official template from venue website
2. Set up LaTeX project (Overleaf or local)
3. Copy paper content into template
4. Verify compilation without errors

### Step 3: Format Main Paper

#### Title and Abstract

- [ ] Title is concise and descriptive (under 12 words if possible)
- [ ] Abstract within word limit (usually 150-250 words)
- [ ] Abstract follows structure: context, gap, approach, results, impact

#### Author Information

For non-anonymous submission:

- [ ] All author names and affiliations correct
- [ ] Corresponding author marked
- [ ] Email addresses included
- [ ] Equal contribution noted (if applicable)

For anonymous submission:

- [ ] All author names removed
- [ ] Affiliations removed
- [ ] "Anonymous submission" or similar placeholder
- [ ] Self-citations anonymized (e.g., "In prior work [X], the authors showed...")
- [ ] No identifying information in acknowledgments
- [ ] Code/data references anonymized

#### Main Content

- [ ] All sections within page limit
- [ ] Figures display correctly
- [ ] Tables format properly
- [ ] Equations numbered correctly
- [ ] Citations render properly
- [ ] References follow venue style

### Step 4: Optimize for Page Limit

If over page limit, try these strategies **in order**:

**1. Low-hanging fruit:**

- Remove redundant phrases
- Tighten writing (every word counts)
- Remove less critical examples
- Condense verbose explanations

**2. Figure/table optimization:**

- Combine related figures into subplots
- Move less critical figures to appendix
- Make figures smaller (but still readable!)
- Use two-column tables if appropriate

**3. Section reorganization:**

- Move detailed related work to appendix
- Move implementation details to appendix
- Move additional experiments to appendix
- Consolidate redundant sections

**4. Content reduction (last resort):**

- Remove secondary baselines (keep in appendix)
- Remove secondary datasets
- Condense methodology explanation
- Shorter related work section

**Never remove:**

- Main results
- Key ablations
- Core methodology
- Critical figures/tables
- References

### Step 5: Format Supplementary Material

Prepare appendix/supplementary material:

**Include in appendix:**

- Additional experimental results
- Extended related work
- Detailed algorithm pseudocode
- Mathematical proofs
- Implementation details
- Additional ablations
- Failure case analysis
- Extended analysis

**Organize clearly:**

- Number appendix sections (Appendix A, B, C)
- Match main paper section structure where relevant
- Include table of contents if lengthy
- Make self-contained (can be read independently)

### Step 6: Format References

Ensure reference section is correct:

- [ ] All cited works in bibliography
- [ ] No uncited works in bibliography
- [ ] Consistent formatting (use BibTeX)
- [ ] Complete information (authors, title, venue, year, pages)
- [ ] Venue abbreviations standard (check dblp.org)
- [ ] URLs included for arXiv papers
- [ ] DOIs included where available

**Clean up common issues:**

- Inconsistent capitalization in titles
- Missing page numbers
- Conference vs journal formatting
- Preprint vs published version

### Step 7: Polish Figures and Tables

#### Figures

- [ ] High resolution (300 DPI minimum for submission)
- [ ] Readable font sizes (not too small)
- [ ] Clear axis labels with units
- [ ] Legend is clear and positioned well
- [ ] Colors are distinguishable (consider colorblind readers)
- [ ] Captions are descriptive and standalone
- [ ] Referenced in text before they appear

#### Tables

- [ ] Consistent formatting across all tables
- [ ] Clear column headers
- [ ] Units specified where applicable
- [ ] Best results in bold (convention)
- [ ] Statistical significance marked (e.g., asterisks)
- [ ] Captions are descriptive
- [ ] Referenced in text before they appear

### Step 8: Final Proofreading

Systematic proofreading process:

**Pass 1: Content**

- Do all sections flow logically?
- Are contributions clear?
- Are claims supported by evidence?
- Is methodology reproducible?
- Are limitations discussed honestly?

**Pass 2: Consistency**

- Notation consistent throughout?
- Terminology consistent?
- Figures/tables/equations numbered consistently?
- Citation style consistent?

**Pass 3: Language**

- Grammar and spelling errors?
- Unclear sentences?
- Passive voice overuse?
- Technical terms defined on first use?
- Acronyms defined on first use?

**Pass 4: Formatting**

- Page limit satisfied?
- Template requirements met?
- No overfull/underfull hboxes (LaTeX)?
- No orphaned section headers?
- Figures/tables placed appropriately?

### Step 9: Verify Reproducibility Statement

Many venues require reproducibility information:

**NeurIPS Reproducibility Checklist:**

- [ ] Code availability statement
- [ ] Data availability statement
- [ ] Compute resources documented
- [ ] Hyperparameters specified
- [ ] Random seeds reported
- [ ] Statistical significance reported

**Prepare statements:**

- "Code will be released upon acceptance at [URL]"
- "We use publicly available datasets: [list]"
- "Experiments run on [hardware] for approximately [time]"
- "We report mean ± std over 3 runs with seeds {42, 123, 456}"

### Step 10: Prepare Submission Materials

Gather all required files:

**Main submission:**

- [ ] PDF of main paper
- [ ] PDF of supplementary material (if applicable)
- [ ] Source files (LaTeX, figures) if required
- [ ] Reproducibility checklist (if required)

**Code/data (if required):**

- [ ] Anonymized code repository (for double-blind review)
- [ ] README with instructions
- [ ] Data access information

### Step 11: Final Checks Before Upload

Complete pre-submission checklist:

- [ ] Correct venue and year in template
- [ ] Anonymization correct (if required)
- [ ] PDF compiles without errors
- [ ] File size under venue limit (typically 10-50 MB)
- [ ] Supplementary material separate file
- [ ] All author information correct (if non-anonymous)
- [ ] Acknowledgments included (if non-anonymous)
- [ ] Funding information included (if required)
- [ ] Ethics statement included (if required)
- [ ] All co-authors reviewed and approved

### Step 12: Submit

Guide submission process:

1. Create account on submission system (OpenReview, CMT, etc.)
2. Start new submission
3. Enter metadata (title, abstract, authors, keywords)
4. Upload main paper PDF
5. Upload supplementary material PDF (if any)
6. Select subject area / primary area
7. Select keywords / topics
8. Answer venue-specific questions
9. Enter conflicts of interest (reviewers to exclude)
10. Review all information carefully
11. Submit!
12. Save confirmation email and submission ID

### Step 13: Post-Submission

After submitting:

- [ ] Save final submitted PDFs (main + supplementary)
- [ ] Archive LaTeX source and figures
- [ ] Note submission ID and deadline
- [ ] Add to calendar: notification date
- [ ] Upload to arXiv (if allowed before review - check venue policy)
- [ ] Prepare for potential revisions

## Common Pitfalls to Avoid

### Content

- Overclaiming results
- Missing related work
- Insufficient ablations
- Weak baselines
- No discussion of limitations
- Claims not supported by evidence

### Formatting

- Over page limit (automatic desk reject at some venues)
- Missing anonymization (automatic desk reject)
- Wrong template or year
- Unreadable figures
- Inconsistent notation
- Poor writing quality

### Process

- Missing deadline
- Submitting to wrong track
- Incomplete author information
- Missing required sections (ethics, reproducibility)
- Not following anonymization rules

## Venue-Specific Notes

### NeurIPS

- 9 pages + unlimited appendix
- Author response period (respond to reviews)
- Requires reproducibility checklist
- Ethics review process

### ICML

- 8 pages + unlimited appendix
- Double-blind review
- OpenReview public comments (during discussion)
- Video supplementary materials allowed

### ICLR

- OpenReview public review process
- 9 pages + unlimited appendix
- Public comments enabled
- Author-reviewer discussion period

### CVPR

- 8 pages main paper
- Supplementary material limits apply
- Rebuttal period
- Video results encouraged

## Related Checklists

- reproducibility-checklist-tmpl.yaml (ensure reproducibility)

## Output

- Camera-ready paper formatted for target venue
- All submission materials prepared
- Successful submission confirmation

## Notes

- Start formatting early - don't wait until deadline
- Read venue guidelines thoroughly - they vary
- Have co-authors review before submission
- Keep multiple backup copies
- Archive everything - you'll need it for revisions

**Submission is just the beginning - expect revisions!**
