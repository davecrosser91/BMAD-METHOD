# AI Research Knowledge Base

## Overview

This knowledge base provides guidance for conducting rigorous AI/ML research using the BMAD research expansion pack. It covers best practices, common pitfalls, and research-specific workflows that differ from software development.

## Research vs. Software Development

### Key Differences

| Aspect | Software Development | AI Research |
|--------|---------------------|-------------|
| **Goal** | Working product | Novel contribution to knowledge |
| **Success Criteria** | Features work, users satisfied | Advance state-of-the-art, publishable |
| **Deliverable** | Deployed software | Published paper + open-sourced code |
| **Iteration** | Minimize failures | Expect failures, learn from them |
| **Validation** | User testing, QA | Peer review, reproducibility |
| **Timeline** | Predictable sprints | Variable, experiment-dependent |
| **Context** | Business requirements | Scientific literature |

### What This Means for BMAD Workflow

**Planning Phase:**
- PRD → Research Proposal (problem, hypotheses, approach)
- Architecture → Experimental Architecture (detailed methodology)
- Stories → Experiment Specifications (individual experiments)

**Development Phase:**
- Dev implements experiments, not features
- QA checks reproducibility, not user requirements
- Iteration expected - experiments guide next steps

**Delivery:**
- Not software release, but paper submission
- Code released open-source upon publication
- Success = acceptance at top-tier venue

## The Research Lifecycle

### Phase 1: Ideation (1-2 weeks)
- Identify interesting problem or question
- Initial literature search
- Brainstorm potential approaches
- Validate with advisors/colleagues

**BMAD Agents:** research-lead, analyst

### Phase 2: Deep Dive (2-4 weeks)
- Comprehensive literature review
- Identify specific research gap
- Formulate testable hypotheses
- Design high-level approach

**BMAD Agents:** research-lead
**Outputs:** research-proposal.md, literature-review.md

### Phase 3: Experimental Design (1-2 weeks)
- Detail technical approach
- Select datasets and evaluation metrics
- Design baseline comparisons
- Plan ablation studies
- Specify reproducibility requirements

**BMAD Agents:** research-scientist, data-analyst
**Outputs:** experimental-architecture.md, experiment-spec files

### Phase 4: Implementation (2-4 weeks)
- Set up research codebase
- Implement baselines accurately
- Implement proposed method
- Write clean, modular code
- Set up experiment tracking

**BMAD Agents:** ml-engineer, reproducibility-engineer
**Outputs:** Working code, environment setup, documentation

### Phase 5: Experimentation (2-6+ weeks)
- Run baseline experiments
- Run proposed method experiments
- Conduct ablation studies
- Iterate based on results
- May require approach redesign

**BMAD Agents:** ml-engineer, data-analyst, research-scientist
**Outputs:** Experimental results, trained models, logs

### Phase 6: Analysis (1-2 weeks)
- Compute all metrics
- Statistical significance testing
- Create figures and tables
- Interpret findings
- Identify key insights

**BMAD Agents:** data-analyst, research-scientist
**Outputs:** Result tables, figures, interpretation

### Phase 7: Writing (2-4 weeks)
- Create paper outline
- Draft all sections
- Integrate results
- Iterate on narrative
- Polish writing

**BMAD Agents:** research-writer, research-lead
**Outputs:** Complete paper draft

### Phase 8: Submission (1 week)
- Format for target venue
- Prepare supplementary materials
- Prepare code release
- Submit

**BMAD Agents:** research-writer, reproducibility-engineer
**Outputs:** Submitted paper

### Phase 9: Revision (1-4 weeks, if needed)
- Address reviewer feedback
- Run additional experiments if requested
- Revise paper
- Resubmit

**BMAD Agents:** All agents potentially
**Outputs:** Revised submission

### Phase 10: Publication
- Camera-ready version
- Release code publicly
- Present at conference (if applicable)
- Share on social media

**Total Timeline:** 3-6 months typical for conference paper

## Best Practices

### Literature Review
- Start broad, narrow down
- Use citation trails (papers cite other important papers)
- Look for survey papers for comprehensive overviews
- Organize by themes, not chronologically
- Identify specific gaps, not just "more research needed"
- Track key papers in detail

### Hypothesis Formation
- Be specific and testable
- Connect to research gap
- Predict quantitative outcomes when possible
- Example: "Method X will improve accuracy by 5-10% on dataset Y because Z"

### Experimental Design
- **One variable at a time**: Isolate contributions
- **Fair comparisons**: Same data, compute, eval protocol
- **Strong baselines**: Compare against best existing methods
- **Multiple runs**: 3-5 seeds minimum for statistical validity
- **Ablation studies**: Validate each component's contribution
- **Negative controls**: Experiments that should fail

### Implementation
- **Code quality matters**: Others will read and use it
- **Modular design**: Easy to swap components for ablations
- **Version control**: Git everything (code, configs, not models)
- **Reproducibility by design**: Set seeds, log everything
- **Start simple**: Simplest version first, add complexity incrementally
- **Unit tests**: Test key components

### Experimentation
- **Fail fast**: Quick experiments to validate assumptions
- **Monitor actively**: Don't launch and forget
- **Document immediately**: Notes while fresh in memory
- **Save everything**: Checkpoints, logs, configs
- **Multiple seeds**: Variance matters
- **Compute wisely**: Dry runs before full experiments

### Analysis
- **Look beyond metrics**: Understand what model learned
- **Statistical rigor**: Report mean ± std, significance tests
- **Honest reporting**: Include negative results
- **Error analysis**: Why did it fail on certain examples?
- **Visualization**: Figures often reveal insights numbers don't

### Writing
- **Contribution clarity**: Reader should know contributions in first page
- **Tell a story**: Motivate → propose → validate → impact
- **Active voice**: "We propose" not "A method is proposed"
- **Be precise**: Technical accuracy crucial
- **Generous citations**: Give credit, position work fairly
- **Respect page limits**: Every word counts

## Common Pitfalls

### Research Design
- ❌ **Incremental work**: Too similar to existing methods
- ❌ **Weak baselines**: Only comparing against strawmen
- ❌ **Unclear contribution**: What specifically is novel?
- ❌ **Unfalsifiable claims**: Can't be disproven

### Experimental Execution
- ❌ **Data leakage**: Test information in training
- ❌ **Unfair comparisons**: Different hyperparameter tuning effort
- ❌ **Cherry-picking**: Reporting only favorable results
- ❌ **Single runs**: Not showing variance
- ❌ **Overfitting to test set**: Tuning on test performance

### Reproducibility
- ❌ **Missing seeds**: Can't reproduce exact results
- ❌ **Unpinned dependencies**: "Works on my machine"
- ❌ **Undocumented steps**: Manual preprocessing not documented
- ❌ **Private data**: Using data others can't access
- ❌ **Missing details**: Insufficient information to reproduce

### Writing
- ❌ **Overclaiming**: Exaggerating results or significance
- ❌ **Missing related work**: Not citing relevant papers
- ❌ **Unclear writing**: Unnecessarily complex language
- ❌ **No limitations**: Every method has limitations
- ❌ **Unreadable figures**: Too small, unclear labels

## Research Ethics

### Honest Reporting
- Report all experiments, not just successful ones
- Acknowledge limitations and failure modes
- Don't cherry-pick favorable results
- Be transparent about what worked and what didn't

### Fair Comparisons
- Give baselines same hyperparameter tuning effort
- Use same evaluation protocols
- Cite and implement baselines accurately
- Don't create strawman baselines to beat

### Reproducibility
- Release code and data when possible
- Document everything needed to reproduce
- Make reproducibility a priority, not afterthought
- Help others build on your work

### Attribution
- Cite related work fairly and generously
- Acknowledge prior art honestly
- Give credit to collaborators
- Don't claim others' contributions as your own

### Broader Impacts
- Consider potential misuse of technology
- Acknowledge societal implications
- Be honest about limitations and risks
- Many venues now require broader impact statements

## Statistical Best Practices

### Multiple Runs
- Run with at least 3-5 different random seeds
- Report mean and standard deviation
- Include variance in all comparisons
- Single runs hide true performance

### Significance Testing
- Use appropriate statistical tests (paired t-test common)
- Report p-values for main comparisons
- Bonferroni correction for multiple comparisons
- Effect sizes matter, not just significance

### Confidence Intervals
- Report 95% confidence intervals when possible
- Helps assess practical significance
- Shows overlap between methods
- More informative than just p-values

### Fair Evaluation
- Same train/val/test splits for all methods
- Hyperparameter tuning on validation set only
- Never tune on test set
- Report metrics on multiple datasets when possible

## Publication Strategy

### Choosing Venues
**Top-tier ML conferences (accept ~20-25%):**
- NeurIPS (Neural Information Processing Systems)
- ICML (International Conference on Machine Learning)
- ICLR (International Conference on Learning Representations)

**Top-tier vision conferences:**
- CVPR (Computer Vision and Pattern Recognition)
- ICCV (International Conference on Computer Vision)
- ECCV (European Conference on Computer Vision)

**Top-tier NLP conferences:**
- ACL (Association for Computational Linguistics)
- EMNLP (Empirical Methods in NLP)
- NAACL (North American Chapter of ACL)

**Specialized venues:**
- AAAI, IJCAI (general AI)
- KDD, WSDM (data mining)
- CoRL, ICRA, RSS (robotics)
- And many others

**Strategy:**
- Target top venue first
- If rejected, incorporate feedback and try next venue
- Build reputation with solid, reproducible work
- Workshop papers good for preliminary ideas

### Timing
- Conferences have 1-2 deadlines per year
- Plan backward from deadline
- Allow time for internal review before submission
- Factor in rebuttal/revision periods

### Reviewer Perspective
Write for reviewers who will:
- Read many papers quickly
- Look for novelty and rigor
- Check related work thoroughness
- Scrutinize experimental design
- Value reproducibility
- Appreciate honest limitations

**Make their job easy:**
- Clear contributions in introduction
- Strong baselines and fair comparisons
- Comprehensive ablations
- Statistical significance
- Readable figures
- Complete related work

## Tools and Resources

### Paper Discovery
- Google Scholar
- Semantic Scholar
- arXiv.org
- Papers With Code
- Connected Papers (visualization)

### Experiment Tracking
- Weights & Biases (wandb)
- TensorBoard
- MLflow
- Neptune.ai

### Code and Data Sharing
- GitHub (code repositories)
- Hugging Face (models and datasets)
- Papers With Code (linking papers and code)
- Zenodo (archival, DOIs)

### Writing Tools
- Overleaf (collaborative LaTeX)
- Grammarly (grammar checking)
- DeepL (translation if needed)

### Version Control
- Git for code
- DVC for data versioning (if needed)
- Git LFS for large files

## Working with the BMAD Research Pack

### When to Use Web UI
- Literature review and synthesis
- Research proposal creation
- Paper writing and revision
- Brainstorming and ideation

**Advantages:**
- Larger context windows
- Cost-effective for large documents
- Better for iterative writing

### When to Use IDE
- Experiment design and specification
- Code implementation
- Running experiments
- Results analysis
- Integrated workflow (code + writing)

**Advantages:**
- Direct file operations
- Can run code
- Immediate access to results
- Version control integration

### Agent Specializations

**Research Lead (PI):**
- Literature reviews
- Research direction
- Validation and oversight
- Grant writing considerations

**Research Scientist:**
- Experiment design
- Methodology development
- Result interpretation
- Theoretical analysis

**ML Engineer:**
- Experiment implementation
- Baseline coding
- Training pipelines
- Debugging and optimization

**Data Analyst:**
- Dataset preparation
- Statistical analysis
- Visualization
- Results tables

**Research Writer:**
- Paper drafting
- Narrative development
- Revision and polish
- Submission formatting

**Reproducibility Engineer:**
- Environment setup
- Seed control
- Documentation
- Code release prep

### Workflow Tips
- Use experiment specs as "stories"
- Each experiment is one iteration cycle
- Document everything in real-time
- Commit code frequently
- Update experiment specs with results
- Keep master experiment log
- Archive failed experiments (learn from them)

## Mindset for Research

### Embrace Uncertainty
- Experiments often fail
- Failure teaches what doesn't work
- Adjust hypotheses based on results
- Pivoting approach is normal

### Incremental Progress
- Small validated steps better than big leaps
- Build on what works
- Test assumptions early
- Validate before scaling up

### Reproducibility First
- Make reproducibility a priority from day one
- Future you will thank present you
- Others building on your work will thank you
- Reviewers will appreciate it

### Honest Science
- Report what you find, not what you hoped
- Negative results have value
- Limitations acknowledged = credibility
- Overclaiming hurts field

### Learn Continuously
- Read papers regularly
- Attend talks and conferences
- Discuss with peers
- Stay current with field

## Success Metrics

Unlike software development, research success isn't about features shipped:

**Publication Metrics:**
- Paper acceptance at target venue
- Citations by other researchers
- Code releases used by others
- Impact on research direction

**Scientific Metrics:**
- Novel contributions validated
- State-of-the-art improved
- New insights gained
- Problems solved or opened

**Career Metrics:**
- Reputation in research community
- Collaborations formed
- Future research enabled
- Field advancement

## Remember

Research is:
- **Iterative**: Expect to pivot and refine
- **Collaborative**: Build on and cite others' work
- **Rigorous**: Methodology matters as much as results
- **Open**: Share code and insights with community
- **Impactful**: Advance knowledge for everyone

The BMAD research pack provides structure, but great research requires:
- Creativity in problem formulation
- Rigor in experimental design
- Honesty in reporting
- Persistence through setbacks
- Openness to learning

**Good luck with your research! 🔬📊📝**
