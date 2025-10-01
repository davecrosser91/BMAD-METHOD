## <!-- Powered by BMAD™ Core -->

docOutputLocation: docs/research-brainstorming-session-results.md
template: '{root}/templates/research-brainstorming-output-tmpl.yaml'

---

# Facilitate Research Brainstorming Session Task

Facilitate interactive research brainstorming sessions for discovering research questions, identifying novelty, and exploring scientific directions. This is specialized for AI/ML research ideation.

## Process

### Step 1: Research Context Setup

Ask 5 context questions (don't preview what happens next):

1. What research area or problem are you interested in? (e.g., computer vision, NLP, RL)
2. Are you exploring broadly or do you have a rough direction?
3. Have you done any preliminary literature review?
4. What's your goal: discover research questions, identify novelty, refine existing ideas, or all of the above?
5. Do you want a structured document output to reference later? (Default Yes)

### Step 2: Determine Brainstorming Phase

Based on answers, identify where they are in research ideation:

**Phase A: Discovery (No clear direction yet)**
- Broad exploration
- Identifying interests
- Problem discovery
- Use curiosity-driven techniques

**Phase B: Question Formation (Rough direction, need specificity)**
- Gap analysis
- Hypothesis generation
- Research question formulation
- Use structured research techniques

**Phase C: Iteration After Literature (Questions + literature insights)**
- Refining based on gaps found
- Positioning against related work
- Sharpening hypotheses
- Use iteration-focused techniques

### Step 3: Present Approach Options

After identifying phase, present 4 approach options (numbered):

1. User selects specific brainstorming techniques from list
2. Research Lead recommends techniques based on research phase
3. Progressive technique flow (discovery → formulation → refinement)
4. Iterative loop: brainstorm → mini literature check → refine → repeat

**Highlight Option 4** as particularly powerful for research ideation.

### Step 4: Execute Techniques Interactively

**KEY PRINCIPLES FOR RESEARCH BRAINSTORMING:**

- **SCIENTIFIC FACILITATOR**: Guide researcher to generate their own ideas and questions
- **QUESTION-FOCUSED**: Research is about asking the right questions
- **LITERATURE-AWARE**: Reference known work, identify gaps
- **HYPOTHESIS-DRIVEN**: Move from vague to testable
- **IMPACT-CONSCIOUS**: Consider whether answers would matter
- **CAPTURE EVERYTHING**: Document all ideas, especially wild ones

**Technique Selection:**
If user selects Option 1, present numbered list of techniques from research-brainstorming-techniques data file.

**Technique Execution:**

1. Apply selected technique according to data file description
2. Keep engaging with technique until user indicates they want to:
   - Choose a different technique
   - Apply current ideas to a new technique
   - Move to literature review to validate ideas
   - Move to convergent phase
   - End session

**Special Mode: Iterative Brainstorm-Literature Loop (Option 4)**

This is the MOST POWERFUL mode for research:

1. **Initial Brainstorm** (15-30 min)
   - Use discovery techniques
   - Generate research questions
   - Identify interesting directions
   - Capture 10-20 potential research questions

2. **Quick Literature Pulse Check** (by user, not agent)
   - User does quick search on top ideas
   - Looks for: Is this done? Are there gaps?
   - Takes notes on what exists
   - **AGENT'S ROLE**: Guide what to search for, provide search keywords

3. **Refined Brainstorm** (15-30 min)
   - Incorporate literature findings
   - Refine questions based on gaps
   - Identify novelty opportunities
   - Sharpen hypotheses

4. **Deeper Literature Check** (by user)
   - More thorough search on refined ideas
   - Read key papers
   - Identify exact gaps
   - **AGENT'S ROLE**: Help analyze gaps, suggest how to position research

5. **Final Refinement** (15-30 min)
   - Specific, testable research questions
   - Clear novelty statement
   - Feasibility assessment
   - Ready for research proposal

**CRITICAL**: Agent facilitates but doesn't do the literature review. Agent helps INTERPRET findings and REFINE questions based on what user discovers.

### Step 5: Research-Specific Session Flow

**For Discovery Phase:**
1. **Broad Exploration** (20-30 min) - What's interesting? What's confusing?
2. **Problem Identification** (15-20 min) - What needs solving?
3. **Question Generation** (20-30 min) - Turn problems into questions
4. **Interest Filtering** (10-15 min) - What excites you most?

**For Question Formation Phase:**
1. **Gap Analysis** (15-20 min) - What's missing in literature?
2. **Hypothesis Generation** (20-30 min) - Testable claims
3. **Novelty Brainstorm** (15-20 min) - What's new about your approach?
4. **Feasibility Check** (10-15 min) - Can we actually do this?

**For Iteration Phase:**
1. **Literature Insights Review** (10-15 min) - What did you find?
2. **Gap Prioritization** (15-20 min) - Which gaps matter?
3. **Positioning Brainstorm** (15-20 min) - How are we different?
4. **Contribution Sharpening** (15-20 min) - Exact claims we'll make

### Step 6: Document Output (if requested)

Generate structured document with these sections:

**Executive Summary**
- Research area and focus
- Brainstorming phase (discovery/formation/iteration)
- Techniques used and duration
- Total research questions generated
- Key insights and directions identified

**Brainstorming Process** (for each technique used)
- Technique name and purpose
- Research questions generated (user's own words)
- Insights discovered
- Connections to literature (if applicable)
- Wild ideas worth noting

**Research Question Bank**

Organize questions by maturity:

- **Well-Formed Questions** - Specific, testable, feasible
- **Interesting Questions** - Good direction, needs refinement
- **Wild Questions** - Ambitious, requires more thought
- **Questions for Literature Review** - Need to check if answered

For each well-formed question include:
- The question
- Why it matters (impact)
- What's novel (if known)
- How to test it (rough idea)
- Resources needed

**Literature Gaps Identified** (if iteration mode)
- What's been done
- What's missing
- Opportunities for contribution
- How your ideas address gaps

**Novelty Assessment**
- What makes your ideas different
- Potential contributions
- Unique angles or perspectives
- Areas where literature is thin

**Feasibility Analysis**
- **Ready to Pursue** - Can start soon
- **Requires Resources** - Needs data/compute/expertise
- **Long-term Projects** - Multi-year efforts
- **Moonshots** - High risk, high reward

**Next Steps Recommendation**

For Top 3 Research Directions:
- Specific research question
- Why this direction is promising
- Immediate next steps:
  * Literature to read (specific papers or areas)
  * Preliminary experiments to try
  * Collaborators to consult
  * Resources to acquire
- Timeline estimate (weeks/months)

**Literature Review Plan**

If user hasn't done thorough review yet:
- Search keywords to use
- Key venues to check (recent NeurIPS, ICML, etc.)
- Specific papers to read (if known)
- What to look for in literature
- How to identify gaps

**Reflection & Iteration**
- What resonated in this session
- What needs more exploration
- Questions that emerged for deeper investigation
- When to do next brainstorming session (after lit review?)

## Key Principles for Research Brainstorming

### Facilitation Principles
- **GUIDE, DON'T GENERATE**: Help them find their questions
- **QUESTION THE QUESTIONS**: "Why does this matter?" "How would we test this?"
- **PUSH FOR SPECIFICITY**: Vague → Concrete → Testable
- **CONNECT TO LITERATURE**: "This relates to X paper..." "This fills gap in Y"
- **BALANCE WILD AND PRACTICAL**: Encourage moonshots AND feasible projects
- **CAPTURE THE JOURNEY**: Document how ideas evolved

### Research-Specific Facilitation
- **Hypothesis Thinking**: Turn ideas into testable claims
- **Impact Assessment**: Would this result matter to the field?
- **Novelty Checking**: Is this actually new?
- **Feasibility Reality**: Can we actually do this experiment?
- **Resource Awareness**: What would this require?

### Iterative Loop Management
- **Brainstorm → Literature → Refine**: This is the natural research cycle
- **Don't Over-Refine Before Literature**: Some ideas need reality check
- **Literature Informs, Doesn't Dictate**: Gaps guide but don't constrain creativity
- **Multiple Iterations Normal**: Research questions often need 3-5 refinement cycles

## Advanced Research Facilitation Strategies

### Dealing with "Everything's Been Done"
- Look for combinations not tried
- Look for settings not tested
- Look for explanations not provided
- Look for improvements in efficiency/scale
- Look for applications to new domains

### From Vague to Testable
- "Improve X" → "Improve X by Y% on benchmark Z"
- "Understand Y" → "Test whether Y is caused by Z via ablation"
- "New method" → "Method using A and B to achieve C"

### Reality Checks
- **Excitement Check**: "Does this genuinely interest you?"
- **Impact Check**: "Would people care about this result?"
- **Feasibility Check**: "Can we actually test this?"
- **Novelty Check**: "What makes this different from existing work?"
- **Resource Check**: "What would this require?"

### Energy Management
- Research brainstorming is mentally intensive
- Take breaks between techniques
- Celebrate good questions
- Don't judge wild ideas immediately
- Mix divergent and convergent thinking

### Transition Management
- **To Literature Review**: "Let's validate these ideas against existing work"
- **To Deeper Brainstorm**: "Let's explore this direction more"
- **To Proposal Writing**: "Ready to formalize this into a research proposal?"
- **To Next Session**: "After lit review, let's refine based on what you find"

## Special Notes for Research Brainstorming

### This is NOT Just Brainstorming
- Scientific rigor matters throughout
- Questions must be testable
- Novelty must be assessed
- Feasibility must be considered
- Impact must be evaluated

### Integration with Literature Review
- Brainstorm generates questions
- Literature reveals gaps
- Gaps inform refinement
- Refinement leads to proposals
- **This is an iterative loop, not linear**

### Output Becomes Foundation
- Research questions → Research proposal
- Gap analysis → Related work section
- Novelty assessment → Contribution claims
- Feasibility analysis → Experimental plan
- Everything feeds forward

### Encourage Documentation
- Ideas forgotten are ideas lost
- Document wild ideas - they often become tame
- Track evolution of questions
- Note which literature sparked which ideas
- Keep for future grant proposals/papers

## Conclusion

Research brainstorming is **ideation with scientific rigor**. It's creative but grounded, wild but testable, ambitious but feasible. The goal is not just ideas, but **research questions that advance the field**.

The iterative loop between brainstorming and literature review is where great research is born.
