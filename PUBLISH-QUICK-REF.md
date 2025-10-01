# Quick Reference: Publishing Your Fork

## 🚀 Publishing Steps (5 minutes)

### 0. Install Dependencies (FIRST!)

```bash
cd /path/to/BMAD-METHOD
npm install
npm run validate  # Verify: "All configurations are valid!"
```

### 1. Update Package Info

```bash
# Copy template to actual package.json
cp package.json.fork-template package.json

# Edit these fields if needed:
# - name: @yourname/package-name
# - author: Your Name
# - repository.url: Your GitHub URL
```

### 2. Update README

```bash
# Add banner from README-FORK-BANNER.md to top of main README.md
# Keep all original BMAD content below the banner
```

### 3. Update License

```bash
# Edit LICENSE file to include both copyrights:
# - Original BMAD: Copyright (c) 2024 Brian Madison
# - AI Research Pack: Copyright (c) 2024 Your Name
```

### 4. Set Up GitHub

```bash
# Create new repo on GitHub: your-repo-name

# Update git remotes
git remote rename origin upstream
git remote add origin https://github.com/yourname/your-repo-name.git

# Push
git push -u origin main
```

### 5. Publish to NPM

```bash
# Login to npm
npm login

# Test build
npm run validate

# Publish
npm publish --access public
```

## ✅ Pre-Publish Checklist

- [ ] Updated package.json name and author
- [ ] Updated repository URL in package.json
- [ ] Added banner to README.md
- [ ] Updated LICENSE with both copyrights
- [ ] Created GitHub repository
- [ ] Pushed code to GitHub
- [ ] Logged into npm
- [ ] Validated build (`npm run validate`)
- [ ] Ready to publish!

## 📦 Suggested Package Names

Choose one style:

**Descriptive:**

- `@yourname/bmad-method-ai-research`
- `@yourname/bmad-with-research-pack`

**Concise:**

- `@yourname/bmad-research`
- `@yourname/bmad-academic`

**Branded:**

- `@yourname/bmad-science`
- `@yourname/bmad-ml`

## 🎯 After Publishing

### Share Your Package

```bash
# Test installation
npx @yourname/your-package install

# Tweet about it
"Just published my BMAD fork with AI Research agents!
🔬 7 specialized agents for academic ML research
📚 Archon MCP literature search
📄 NeurIPS/ICML paper templates
npm: @yourname/your-package
#BMAD #AIResearch #MLOps"

# Share on LinkedIn, Reddit (r/MachineLearning), etc.
```

### Monitor

- NPM downloads: https://www.npmjs.com/package/@yourname/your-package
- GitHub stars: Watch your repo
- Issues/feedback: Respond to community

### Update Later

```bash
# Bug fix
npm version patch
npm publish

# New feature
npm version minor
npm publish

# Breaking change
npm version major
npm publish
```

## 🔄 Syncing with Upstream BMAD

```bash
# Fetch upstream changes
git fetch upstream

# Review what changed
git log upstream/main

# Merge (carefully!)
git merge upstream/main

# Fix conflicts if any
# Test: npm run validate

# Publish update
npm version patch
npm publish
```

## 🆘 Troubleshooting

### Package name taken?

- Try adding scope: `@yourname/package-name`
- Add suffix: `bmad-research-enhanced`

### Publish failed?

- Check npm login: `npm whoami`
- Verify access: Use scoped package with `--access public`
- Check package.json syntax

### Build errors?

- Run: `npm run lint:fix`
- Run: `npm run format`
- Fix any validation errors

## 📊 Success Metrics

Track these:

- ✅ NPM weekly downloads
- ✅ GitHub stars
- ✅ Community issues/discussions
- ✅ Papers published using your fork!

## 💡 Marketing Tips

1. **Clear Value Prop**: "BMAD for AI researchers"
2. **Show Screenshots**: Agent interactions, paper workflow
3. **Demo Video**: 5-min walkthrough on YouTube
4. **Blog Post**: Your research workflow
5. **Community**: Share in AI research groups

---

**Ready to publish?** Follow the 5 steps above! 🚀
