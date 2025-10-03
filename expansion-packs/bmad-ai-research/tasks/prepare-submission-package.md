## <!-- Powered by BMAD™ Core -->

# Prepare Submission Package

**Task**: Create complete submission package with all required files

**When to Use**: Final step before uploading to conference/journal submission system

**Agent**: Research Writer (Dr. Gatsby Sarihuela) + Reproducibility Engineer (Sam Rodriguez)

**Prerequisites**:

- Paper reformatted for venue
- All figures finalized
- Supplementary materials prepared
- Compilation successful

**Output**: Zip file ready for submission upload

---

## Overview

Most venues require:

1. **Main paper PDF** - Camera-ready or submission version
2. **Source files** - LaTeX .tex files, figures, bibliography
3. **Supplementary materials** - Code, data, extra results, appendix
4. **Additional documents** - Copyright forms, ethics statements, checklists

This task packages everything correctly.

---

## Process

### Step 1: Verify Paper Compilation

```bash
cd research-paper/

# Clean build
rm -f *.aux *.bbl *.blg *.log *.out *.toc

# Full compilation
pdflatex main.tex
bibtex main
pdflatex main.tex
pdflatex main.tex

# Check for errors
if [ $? -eq 0 ]; then
    echo "✅ Compilation successful"
else
    echo "❌ Compilation failed - fix errors first"
    exit 1
fi
```

**Verify:**

- No compilation errors or warnings
- All references resolved (no [?] marks)
- Page count within limit
- Figures display correctly

---

### Step 2: Prepare Supplementary Materials

#### Code Release

````bash
# Create clean code package
cd codebase/

# Remove unnecessary files
rm -rf __pycache__/ *.pyc .pytest_cache/ .ipynb_checkpoints/
rm -rf wandb/ results/checkpoints/*.pth  # Keep structure, remove large files

# Create README for code
cat > README.md << 'EOF'
# Code for Paper: [Your Title]

## Requirements

```bash
pip install -r requirements.txt
````

## Usage

### Training

```bash
python train.py --config configs/default.yaml
```

### Evaluation

```bash
python evaluate.py --checkpoint checkpoints/best_model.pth
```

## Structure

- `src/` - Source code
- `configs/` - Configuration files
- `scripts/` - Training and evaluation scripts
- `data/` - Data loading utilities (data not included, see below)

## Dataset

We use ImageNet dataset. Download from: [URL]

## Citation

If you use this code, please cite:

```
@inproceedings{yourname2025,
  title={Your Paper Title},
  author={Your Name},
  booktitle={Conference Name},
  year={2025}
}
```

EOF

# Generate requirements

pip freeze > requirements.txt

# Or create minimal requirements

cat > requirements.txt << 'EOF'
torch>=2.0.0
numpy>=1.24.0
pandas>=2.0.0
matplotlib>=3.7.0
wandb>=0.15.0
EOF

````

#### Organize Supplementary Folder

```bash
mkdir -p research-paper/supplementary

# Structure
research-paper/supplementary/
├── README.txt                    # Overview of supplementary contents
├── appendix.pdf                  # Extended appendix (if separate)
├── code/                         # Code release
│   ├── README.md
│   ├── requirements.txt
│   ├── src/
│   ├── configs/
│   └── scripts/
├── data/                         # Dataset info
│   └── dataset_description.md
└── extra_results/               # Additional experiments
    ├── ablation_study.pdf
    └── hyperparameter_sweep.pdf
````

**Create Supplementary README:**

```bash
cat > research-paper/supplementary/README.txt << 'EOF'
Supplementary Materials for: [Paper Title]

Contents:
---------

1. appendix.pdf
   Extended appendix with additional experimental results,
   proofs, and detailed methodology.

2. code/
   Complete code implementation for reproducing all experiments.
   See code/README.md for setup and usage instructions.

3. data/
   Dataset information and preprocessing scripts.
   Links to download public datasets used.

4. extra_results/
   Additional experimental results not included in main paper:
   - ablation_study.pdf: Full ablation results
   - hyperparameter_sweep.pdf: Comprehensive sweep analysis

File Sizes:
-----------
appendix.pdf: 2.3 MB
code.zip: 1.5 MB
Total: ~5 MB

Requirements:
------------
- Python 3.9+
- PyTorch 2.0+
- See code/requirements.txt for full list

Contact:
--------
For questions: your.email@university.edu
Code repository: [Will be released upon acceptance]
EOF
```

---

### Step 3: Check File Naming Conventions

Different venues have different requirements:

**NeurIPS Example:**

- Main paper: `Paper1234.pdf` (assigned ID)
- Supplementary: `Paper1234-supp.zip`

**IEEE Example:**

- Main paper: `PaperID.pdf`
- Source: `PaperID_source.zip`

**Check venue guidelines** for exact naming requirements.

---

### Step 4: Create Source Package

```bash
cd research-paper/

# Create source file package
mkdir -p temp_source/

# Copy necessary files
cp main.tex temp_source/
cp -r sections/ temp_source/
cp -r figures/ temp_source/
cp references.bib temp_source/
cp *.sty temp_source/  # Style files
cp *.cls temp_source/  # Class files (if custom)

# Include compilation script
cat > temp_source/compile.sh << 'EOF'
#!/bin/bash
# Compilation script

pdflatex main.tex
bibtex main
pdflatex main.tex
pdflatex main.tex

echo "Compilation complete: main.pdf"
EOF

chmod +x temp_source/compile.sh

# Create README for source
cat > temp_source/README.txt << 'EOF'
LaTeX Source Files
==================

To compile:
1. Run ./compile.sh
   OR
2. Run manually:
   pdflatex main.tex
   bibtex main
   pdflatex main.tex
   pdflatex main.tex

Requirements:
- LaTeX distribution (TeX Live 2023+ or MiKTeX)
- Required packages: natbib, graphicx, amsmath, algorithm2e

Structure:
- main.tex: Main document
- sections/: Individual section files
- figures/: All figures (PDF format)
- references.bib: Bibliography
- neurips_2025.sty: Conference style file
EOF

# Zip source files
cd temp_source/
zip -r ../source.zip *
cd ..
rm -rf temp_source/

echo "✅ Source package created: source.zip"
```

---

### Step 5: Create Supplementary Package

```bash
cd research-paper/supplementary/

# Compress code folder
cd code/
zip -r ../code.zip * -x "*.pyc" -x "__pycache__/*" -x ".git/*"
cd ..

# Create supplementary zip
zip -r ../supplementary.zip \
    README.txt \
    appendix.pdf \
    code.zip \
    data/ \
    extra_results/

cd ..

echo "✅ Supplementary package created: supplementary.zip"
```

---

### Step 6: Verify PDF Metadata (Anonymization)

For anonymous submissions, check PDF metadata doesn't leak author info:

```bash
# Check PDF metadata
pdfinfo submission.pdf

# If author info present, strip metadata
exiftool -all= submission.pdf
# Or
pdftk submission.pdf output submission_anon.pdf

# Verify
pdfinfo submission_anon.pdf
```

---

### Step 7: Create Final Submission Package

```bash
cd research-paper/

# Create submission folder
mkdir -p ../submissions/neurips-2025-$(date +%Y%m%d)/

# Copy all necessary files
cp submission-neurips-2025.pdf ../submissions/neurips-2025-$(date +%Y%m%d)/Paper1234.pdf
cp source.zip ../submissions/neurips-2025-$(date +%Y%m%d)/Paper1234-source.zip
cp supplementary.zip ../submissions/neurips-2025-$(date +%Y%m%d)/Paper1234-supp.zip

# Add submission checklist
cp ../docs/submission/neurips-2025-checklist.md ../submissions/neurips-2025-$(date +%Y%m%d)/

echo "✅ Submission package ready: submissions/neurips-2025-$(date +%Y%m%d)/"
```

**Final Structure:**

```
submissions/neurips-2025-20250315/
├── Paper1234.pdf                # Main paper
├── Paper1234-source.zip         # LaTeX source
├── Paper1234-supp.zip           # Supplementary materials
└── neurips-2025-checklist.md   # Submission checklist
```

---

### Step 8: Run Final Checks

Use submission checklist (from template):

```bash
# Display checklist
cat ../docs/submission/neurips-2025-checklist.md

# Example checks:
echo "Verification:"
echo "1. Main PDF size: $(du -h Paper1234.pdf | cut -f1)"
echo "2. Source ZIP size: $(du -h Paper1234-source.zip | cut -f1)"
echo "3. Supp ZIP size: $(du -h Paper1234-supp.zip | cut -f1)"

# Check page count
echo "4. Page count: $(pdfinfo Paper1234.pdf | grep Pages | awk '{print $2}') pages"

# Test source compilation
echo "5. Testing source compilation..."
mkdir test_compile/
cd test_compile/
unzip ../Paper1234-source.zip
bash compile.sh
if [ -f main.pdf ]; then
    echo "   ✅ Source compiles successfully"
else
    echo "   ❌ Source compilation failed"
fi
cd ..
rm -rf test_compile/
```

---

### Step 9: Handle Venue-Specific Requirements

#### NeurIPS Checklist

NeurIPS requires a checklist in the paper itself:

```latex
% Add before \end{document}
\section*{Checklist}

\begin{enumerate}
\item For all authors...
    \begin{enumerate}
        \item Do the main claims made in the abstract and introduction accurately reflect the paper's contributions and scope?
        \answer{Yes}
    \end{enumerate}

\item Did you describe the limitations of your work?
    \answer{Yes, see Section~\ref{sec:limitations}}

\item Did you discuss any potential negative societal impacts of your work?
    \answer{Yes, see Section~\ref{sec:discussion}}

% ... (full checklist from NeurIPS template)
\end{enumerate}
```

#### IEEE Copyright Form

IEEE requires copyright transfer:

1. Download copyright form from IEEE submission system
2. Fill out author information
3. Sign electronically or scan signed copy
4. Upload as separate file: `Paper1234-copyright.pdf`

#### ACM Computing Classification

ACM requires CCS concepts:

```latex
\begin{CCSXML}
<ccs2012>
<concept>
<concept_id>10010147.10010257</concept_id>
<concept_desc>Computing methodologies~Machine learning</concept_desc>
<concept_significance>500</concept_significance>
</concept>
</ccs2012>
\end{CCSXML}

\ccsdesc[500]{Computing methodologies~Machine learning}
```

---

### Step 10: Pre-Upload Verification

Before uploading to submission system:

**Technical Checks:**

- [ ] PDF opens correctly in Adobe Reader
- [ ] All fonts embedded: `pdffonts Paper1234.pdf`
- [ ] File sizes within limits (typically 10MB main, 100MB supp)
- [ ] No compilation warnings
- [ ] Page count correct

**Content Checks:**

- [ ] Title matches submission form
- [ ] Abstract matches submission form
- [ ] Keywords match submission form
- [ ] Author list correct (or anonymized if required)
- [ ] References complete and formatted correctly
- [ ] All figures/tables have captions
- [ ] All equations numbered (if referenced)

**Supplementary Checks:**

- [ ] Code includes README with instructions
- [ ] Code runs (tested on clean environment)
- [ ] Dataset links provided (if public data)
- [ ] Appendix referenced from main paper
- [ ] All supplementary figures have captions

**Administrative:**

- [ ] Conflicts of interest declared
- [ ] Ethics statement included (if required)
- [ ] Funding sources acknowledged (if appropriate)
- [ ] Author contributions specified (if required)

---

### Step 11: Create Backup

```bash
# Create full backup of submission
cd submissions/
tar -czf neurips-2025-20250315-BACKUP.tar.gz neurips-2025-20250315/

# Store backup safely
mv neurips-2025-20250315-BACKUP.tar.gz ~/Backups/paper-submissions/

echo "✅ Backup created and stored"
```

---

### Step 12: Upload to Submission System

**General Upload Process:**

1. **Log into submission system** (e.g., CMT, OpenReview, EasyChair)
2. **Create new submission**
3. **Fill metadata:**
   - Title
   - Abstract
   - Keywords
   - Author information (or mark as anonymous)
   - Subject areas
4. **Upload main PDF**
5. **Upload supplementary materials** (if allowed)
6. **Declare conflicts of interest**
7. **Accept policies** (code of conduct, ethics, etc.)
8. **Submit**

**Double-Check Before Final Submit:**

- Preview uploaded PDF looks correct
- Metadata matches paper
- Supplementary files uploaded
- All required fields completed
- Confirmation email received

---

## Common File Size Limits

| Venue   | Main Paper | Supplementary |
| ------- | ---------- | ------------- |
| NeurIPS | 10 MB      | 100 MB        |
| ICML    | 10 MB      | 100 MB        |
| ICLR    | 10 MB      | 100 MB        |
| CVPR    | 10 MB      | 100 MB        |
| IEEE    | 30 MB      | - (varies)    |
| ACM     | 50 MB      | 200 MB        |

If over limit:

- Compress figures: `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/prepress -dNOPAUSE -dQUIET -dBATCH -sOutputFile=output.pdf input.pdf`
- Reduce figure resolution (if still readable)
- Move large supplementary items to external hosting

---

## Automation Script

Create reusable packaging script:

```bash
#!/bin/bash
# prepare_submission.sh

VENUE=$1  # e.g., "neurips-2025"
PAPER_ID=$2  # e.g., "1234"

echo "Preparing submission for $VENUE (Paper ID: $PAPER_ID)"

# Compile paper
cd research-paper/
pdflatex main.tex && bibtex main && pdflatex main.tex && pdflatex main.tex

# Create submission directory
SUBDIR="../submissions/${VENUE}-$(date +%Y%m%d)"
mkdir -p $SUBDIR

# Package files
cp main.pdf $SUBDIR/Paper${PAPER_ID}.pdf
zip -r $SUBDIR/Paper${PAPER_ID}-source.zip main.tex sections/ figures/ references.bib *.sty
cd supplementary/
zip -r $SUBDIR/Paper${PAPER_ID}-supp.zip *
cd ..

# Verify
echo "✅ Submission package ready: $SUBDIR"
ls -lh $SUBDIR/
```

Usage:

```bash
bash prepare_submission.sh neurips-2025 1234
```

---

## Tips

1. **Start Early**: Don't wait until deadline day
2. **Test Everything**: Verify code runs, PDFs open, zips extract
3. **Keep Records**: Save submission confirmation emails
4. **Version Control**: Tag git repo with submission version
5. **Backup**: Multiple copies in different locations

---

## Troubleshooting

**Issue**: PDF too large

- Compress images before including
- Use `pdffonts` to check font embedding
- Use `gs` to compress PDF

**Issue**: Source doesn't compile

- Test in clean directory
- Include all necessary style files
- Document any special compilation requirements

**Issue**: Supplementary upload fails

- Check file size limits
- Verify zip file not corrupted
- Try splitting into smaller archives

---

## Related

- [reformat-paper-venue.md](reformat-paper-venue.md) - Venue-specific formatting
- [paper-submission-prep.yaml](../workflows/paper-submission-prep.yaml) - Full workflow
- [submission-checklist-tmpl.yaml](../templates/submission-checklist-tmpl.yaml) - Checklist template
