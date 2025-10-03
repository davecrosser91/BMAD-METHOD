## <!-- Powered by BMAD™ Core -->

# Reformat Paper for Specific Venue

**Task**: Reformat completed research paper for journal/conference submission

**When to Use**: When ready to submit paper to specific venue (NeurIPS, ICML, JMLR, etc.)

**Agent**: Research Writer (Dr. Gatsby Sarihuela)

**Prerequisites**:

- Completed paper in research-paper/ folder
- Target venue identified
- Submission deadline known

**Output**: Reformatted paper ready for submission to target venue

---

## Overview

Different venues have different formatting requirements:

- LaTeX templates (document class, style files)
- Page limits
- Citation styles
- Figure/table formatting
- Anonymization requirements
- Supplementary material policies

This task handles all reformatting systematically.

---

## Process

### Step 1: Identify Target Venue

Common ML/AI venues:

**Top-Tier Conferences:**

- **NeurIPS** (Neural Information Processing Systems) - December deadline
- **ICML** (International Conference on Machine Learning) - January deadline
- **ICLR** (International Conference on Learning Representations) - October deadline
- **CVPR** (Computer Vision and Pattern Recognition) - November deadline
- **AAAI** (Association for the Advancement of Artificial Intelligence) - August deadline

**Journals:**

- **JMLR** (Journal of Machine Learning Research) - Rolling
- **TMLR** (Transactions on Machine Learning Research) - Rolling
- **IEEE TPAMI** (Transactions on Pattern Analysis and Machine Intelligence) - Rolling

---

### Step 2: Fetch Venue Requirements

Download or reference submission guidelines:

```bash
# NeurIPS example
curl -O https://neurips.cc/Conferences/2025/PaperInformation/StyleFiles

# Or search knowledge base
# Use @research-assistant-kb to search for "NeurIPS 2025 submission guidelines"
```

**Key Information to Extract:**

- LaTeX template files (.sty, .cls)
- Page limit (e.g., 8 pages + unlimited appendix)
- Citation style (natbib, biblatex, numeric, author-year)
- Anonymization required? (double-blind review)
- Figure format (PDF, PNG, EPS)
- Supplementary material policy
- File naming conventions
- Submission deadlines

---

### Step 3: Create Submission Branch

```bash
cd research-paper/

# Create branch for this submission
git checkout -b submission/neurips-2025

# Work in this branch without affecting main
```

This allows:

- Maintaining original format in main branch
- Multiple submission formats simultaneously (different branches)
- Easy rollback if needed

---

### Step 4: Backup Current Version

```bash
# Create backup before major reformatting
cd research-paper/
tar -czf backups/pre-neurips-$(date +%Y%m%d).tar.gz main.tex sections/ figures/ references.bib

echo "✅ Backup created: backups/pre-neurips-$(date +%Y%m%d).tar.gz"
```

---

### Step 5: Switch LaTeX Template

#### Example: NeurIPS Format

**Original (generic article):**

```latex
\documentclass{article}
\usepackage{times}
\usepackage{graphicx}
\usepackage{natbib}
```

**NeurIPS 2025:**

```latex
\documentclass{article}

% NeurIPS style file
\usepackage[final]{neurips_2025}  % or [preprint] for arXiv

% Author info (will be removed for anonymization)
\usepackage{authblk}

\usepackage{graphicx}
\usepackage{natbib}
```

#### Example: IEEE Format

```latex
\documentclass[conference]{IEEEtran}
\IEEEoverridecommandlockouts
% IEEE packages
\usepackage{cite}
\usepackage{amsmath,amssymb,amsfonts}
\usepackage{algorithmic}
\usepackage{graphicx}
\usepackage{textcomp}
```

#### Example: ACM Format

```latex
\documentclass[sigconf]{acmart}
\setcopyright{acmcopyright}
\acmConference[CONFERENCE]{Conference Name}{Month YEAR}{Location}
```

**Steps:**

1. Download venue template files to research-paper/
2. Update \documentclass{} line
3. Add required \usepackage{} commands
4. Test compilation: `pdflatex main.tex`

---

### Step 6: Adjust Content for Page Limit

#### Check Current Page Count

```bash
cd research-paper/
pdflatex main.tex
bibtex main
pdflatex main.tex
pdflatex main.tex

# Check pages
echo "Page count: $(pdfinfo main.pdf | grep Pages | awk '{print $2}')"
```

#### If Over Page Limit

**Strategy:**

1. Move content to appendix
2. Condense verbose sections
3. Reduce figure sizes slightly

**Example: 8-page limit, currently 10 pages**

**Move to Appendix:**

```latex
% In main.tex, after main content
\appendix
\section{Additional Experimental Results}
\label{app:extra-results}

% Move detailed results here
\input{sections/appendix_extra_results}

\section{Proof of Theorem 1}
\label{app:proof}

\input{sections/appendix_proofs}
```

**In Sections:**

```latex
% Before (verbose):
We conducted extensive experiments on five datasets including ImageNet,
CIFAR-10, CIFAR-100, MNIST, and Fashion-MNIST, with detailed results
shown below for each dataset configuration.

% After (concise):
We evaluated on five datasets (ImageNet, CIFAR-10/100, MNIST, Fashion-MNIST).
Detailed per-dataset results are in Appendix~\ref{app:extra-results}.
```

**Reduce Figure Sizes:**

```latex
% Before:
\includegraphics[width=0.9\linewidth]{figures/results.pdf}

% After:
\includegraphics[width=0.7\linewidth]{figures/results.pdf}
```

#### If Under Page Limit

Can expand:

- Add more experimental details
- Expand related work
- Add ablation studies
- Include more visualizations

---

### Step 7: Reformat Figures

#### Adjust Figure Widths

**Single-column layout:**

```latex
\begin{figure}[t]
\centering
\includegraphics[width=\linewidth]{figures/architecture.pdf}
\caption{Model architecture.}
\label{fig:architecture}
\end{figure}
```

**Double-column layout (IEEE, ACM):**

```latex
% Full width figure (spans both columns)
\begin{figure*}[t]
\centering
\includegraphics[width=0.9\textwidth]{figures/results.pdf}
\caption{Comprehensive results comparison.}
\label{fig:results}
\end{figure*}

% Single column figure
\begin{figure}[t]
\centering
\includegraphics[width=\columnwidth]{figures/small_plot.pdf}
\caption{Per-layer analysis.}
\end{figure}
```

#### Adjust Figure Font Sizes

Figures should match paper font size (typically 9-10pt):

```python
# Regenerate figures with correct font size
import matplotlib.pyplot as plt

plt.rcParams.update({
    'font.size': 9,           # Match paper font
    'axes.labelsize': 9,
    'axes.titlesize': 10,
    'xtick.labelsize': 8,
    'ytick.labelsize': 8,
    'legend.fontsize': 8,
    'figure.titlesize': 10,
    'font.family': 'serif',   # Match paper font family
})

# Create figures...
```

Ask Data Analyst to regenerate figures if needed.

---

### Step 8: Update Citation Style

#### NeurIPS/ICML/ICLR (natbib)

```latex
\usepackage{natbib}

% In text:
\citet{smith2020} proposed...        % Smith et al. (2020) proposed...
\citep{smith2020}                    % (Smith et al., 2020)
Multiple works \citep{a,b,c}         % (Author1, 2019; Author2, 2020; ...)

% Bibliography:
\bibliographystyle{plainnat}  % or abbrvnat
\bibliography{references}
```

#### IEEE (numeric)

```latex
\usepackage{cite}

% In text:
Smith et al.~\cite{smith2020} proposed...
This is known~\cite{a,b,c}.

% Bibliography:
\bibliographystyle{IEEEtran}
\bibliography{references}
```

#### ACM

```latex
% ACM style built into acmart class
\bibliographystyle{ACM-Reference-Format}
\bibliography{references}
```

---

### Step 9: Anonymize for Double-Blind Review

Many conferences require anonymization (NeurIPS, ICML, ICLR).

#### Backup Author Information

```bash
# Save original author block
cp sections/author_info.tex sections/author_info_BACKUP.tex
```

#### Remove Author Info

**Before:**

```latex
\author{
  Jane Doe\thanks{Equal contribution.} \\
  University of Example \\
  \texttt{jane@example.edu}
  \And
  John Smith$^*$ \\
  Tech Company \\
  \texttt{john@company.com}
}
```

**After (Anonymized):**

```latex
\author{Anonymous Authors}
% Author information withheld for double-blind review
```

#### Anonymize Self-Citations

**Before:**

```latex
Our previous work \citep{doe2023} showed that...
As we demonstrated in \citep{smith2024}...
```

**After:**

```latex
Prior work \citep{doe2023} showed that...
As demonstrated in \citep{smith2024}...
```

#### Remove Acknowledgments (Temporarily)

```latex
% \section*{Acknowledgments}
% We thank... [Reveals institution/funding]
% Comment out acknowledgments section during review
```

#### Anonymize Code/Data Links

**Before:**

```latex
Code available at: \url{https://github.com/janedoe/project}
```

**After:**

```latex
Code will be released upon acceptance.
% Or use anonymous repository:
% Code available at: \url{https://anonymous.4open.science/r/project-ABC123}
```

---

### Step 10: Compile and Verify

```bash
cd research-paper/

# Clean build
rm -f *.aux *.bbl *.blg *.log *.out

# Full compilation
pdflatex main.tex
bibtex main
pdflatex main.tex
pdflatex main.tex

# Rename for submission
cp main.pdf submission-neurips-2025.pdf
```

**Verification Checklist:**

- [ ] PDF compiles without errors or warnings
- [ ] Page count meets limit (check with `pdfinfo`)
- [ ] All figures display correctly
- [ ] All citations resolve (no [?] in PDF)
- [ ] Correct citation style
- [ ] Anonymized (if required) - no author names, affiliations
- [ ] Figures readable at correct sizes
- [ ] Tables fit within page width
- [ ] Equations formatted correctly
- [ ] Run spell check

---

### Step 11: Handle Special Cases

#### Creating Appendix

If venue allows unlimited appendix:

```latex
% After main content, before bibliography
\appendix

\section{Additional Experimental Details}
\label{app:experiments}
% Details moved from main paper

\section{Proofs}
\label{app:proofs}
% Mathematical proofs

\section{Extra Results}
\label{app:results}
% Additional figures/tables
```

#### Two-Column vs Single-Column

Some venues switch between formats:

- Conference version: 2-column (space-efficient)
- Journal version: 1-column (more readable)

**Switch from 2-col to 1-col:**

```latex
% Before:
\documentclass[conference]{IEEEtran}

% After:
\documentclass[journal]{IEEEtran}
```

#### Color vs Grayscale

Some journals print in grayscale:

- Use distinct line styles (solid, dashed, dotted)
- Use patterns/hatching in bar charts
- Ensure grayscale-readable color schemes

---

## Common Venue Templates

### NeurIPS

```latex
\documentclass{article}
\usepackage[final]{neurips_2025}  % or [preprint]

\title{Your Title Here}
\author{Anonymous Authors} % For submission

\begin{document}
\maketitle
\begin{abstract}...\end{abstract}
% Content
\bibliographystyle{plainnat}
\bibliography{references}
\end{document}
```

**Specs:**

- Page limit: 8 pages (main) + unlimited appendix
- Font: 10pt
- Citations: natbib (author-year)
- Anonymization: Required (double-blind)

### ICML

```latex
\documentclass{article}
\usepackage[accepted]{icml2025}  % or [preprint]

\icmltitlerunning{Short Title}
\begin{document}
\twocolumn[
\icmltitle{Your Full Title Here}
\icmlauthor{aeAuthor One}{inst}
\icmladdress{inst}{Institution, City, Country}
\vskip 0.3in
]
% Content
\bibliography{references}
\bibliographystyle{icml2025}
\end{document}
```

### IEEE

```latex
\documentclass[conference]{IEEEtran}
\begin{document}
\title{Your Title}
\author{\IEEEauthorblockN{Author Name}
\IEEEauthorblockA{Institution\\
Email}}
\maketitle
% 2-column content
\bibliographystyle{IEEEtran}
\bibliography{references}
\end{document}
```

---

## Tips

1. **Test Early**: Compile with new template immediately to catch issues
2. **Keep Branches**: Use git branches for different venue formats
3. **Automate**: Create script for common reformatting tasks
4. **Track Changes**: Use \textcolor{} or latexdiff for revision tracking
5. **Backup Often**: Save backups before major changes

---

## Troubleshooting

**Issue**: Template compilation errors

- Check all required .sty files present
- Update LaTeX packages: `tlmgr update --all`
- Check template documentation for dependencies

**Issue**: Over page limit after reformatting

- Different templates have different spacing
- Re-evaluate what goes to appendix
- Reduce figure sizes
- Use more compact writing

**Issue**: Citation style conflicts

- Ensure only one bibliography package loaded
- Check package order (some must load first/last)
- Clear .aux and .bbl files, recompile

---

## Related

- [prepare-submission-package.md](prepare-submission-package.md) - Create final submission files
- [paper-submission-prep.yaml](../workflows/paper-submission-prep.yaml) - Full submission workflow
- [submission-checklist-tmpl.yaml](../templates/submission-checklist-tmpl.yaml) - Checklist template
