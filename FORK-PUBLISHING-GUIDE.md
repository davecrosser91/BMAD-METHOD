# Publishing Your BMAD Fork with AI Research Pack

This guide shows how to publish your own fork of BMAD-METHOD with the AI Research expansion pack included.

## 📋 Pre-Publishing Checklist

### 0. Install Dependencies (IMPORTANT - Do This First!)

```bash
# Make sure you're in the BMAD-METHOD directory
cd /path/to/BMAD-METHOD

# Install all npm dependencies
npm install

# Verify installation works
npm run validate
# Should show: "All configurations are valid!"
```

**⚠️ Without this step, you'll get "Cannot find module 'commander'" errors!**

### 1. Update package.json

Change these fields in `package.json`:

```json
{
  "name": "@davidkreuzer/bmad-method-ai-research",
  "version": "1.0.0",
  "description": "BMAD Method with AI Research expansion pack - Academic paper writing, experiment design, and scientific publication",
  "keywords": [
    "bmad",
    "bmad-method",
    "ai-research",
    "ml-research",
    "academic-writing",
    "research-agents",
    "archon-mcp",
    "agile",
    "ai",
    "methodology"
  ],
  "repository": {
    "type": "git",
    "url": "git+https://github.com/davidkreuzer/bmad-method-ai-research.git"
  },
  "author": "David Kreuzer (based on BMAD by Brian Madison)",
  "bin": {
    "bmad-research": "tools/bmad-npx-wrapper.js",
    "bmad-method-ai": "tools/bmad-npx-wrapper.js"
  }
}
```

### 2. Create GitHub Repository

```bash
# Create new GitHub repo: bmad-method-ai-research

# Set up remote
git remote rename origin upstream  # Keep original BMAD as upstream
git remote add origin https://github.com/davidkreuzer/bmad-method-ai-research.git

# Push to your fork
git push -u origin main
```

### 3. Update Main README

Add a prominent banner at the top of the main README:

````markdown
# BMAD Method - AI Research Edition 🔬

> **This is a fork of [BMAD-METHOD](https://github.com/bmadcode/BMAD-METHOD)
> with the AI Research expansion pack pre-installed.**
>
> 🎯 **Perfect for researchers** conducting AI/ML research, writing academic papers,
> and managing reproducible experiments.

## What's Included

- ✅ All core BMAD functionality
- ✅ **AI Research Expansion Pack** (7 specialized research agents)
- ✅ **Archon MCP Integration** (automated literature search)
- ✅ Research workflows and templates
- ✅ Academic paper writing support

## Quick Start

```bash
# Install in your research project
npx @davidkreuzer/bmad-method-ai-research install

# Start researching!
@research-lead
*brainstorm "your research topic"
```
````

## Credits

Based on [BMAD-METHOD](https://github.com/bmadcode/BMAD-METHOD) by Brian (BMad) Madison.
AI Research expansion pack by David Kreuzer.

```

### 4. Create LICENSE Attribution

Update LICENSE to include both licenses:

```

MIT License

Original BMAD-METHOD:
Copyright (c) 2024 Brian (BMad) Madison

AI Research Expansion Pack:
Copyright (c) 2024 David Kreuzer

Permission is hereby granted, free of charge...
[rest of MIT license]

````

### 5. Test Locally

```bash
# Test installation locally
cd /path/to/test-project
node /path/to/BMAD-METHOD/tools/installer/bin/bmad.js install

# Verify AI Research pack appears in menu
# Test agent activation
````

## 🚀 Publishing to NPM

### One-Time Setup

```bash
# Create NPM account (if you don't have one)
# Visit: https://www.npmjs.com/signup

# Login to npm
npm login
```

### Publish Your Package

```bash
# Make sure you're in the BMAD-METHOD directory
cd /path/to/BMAD-METHOD

# Build and validate
npm run validate
npm run format:check

# Publish to npm
npm publish --access public

# If using scoped package (@davidkreuzer/...)
npm publish --access public
```

### Update Versions

```bash
# For bug fixes
npm version patch
npm publish

# For new features
npm version minor
npm publish

# For breaking changes
npm version major
npm publish
```

## 📦 Users Install Your Fork

Once published, users can install it:

```bash
# Install globally
npm install -g @davidkreuzer/bmad-method-ai-research

# Or use directly with npx
npx @davidkreuzer/bmad-method-ai-research install

# The AI Research pack will be automatically available!
```

## 🔄 Keeping Up with Upstream BMAD

To sync with the original BMAD repo:

```bash
# Add upstream if not already added
git remote add upstream https://github.com/bmadcode/BMAD-METHOD.git

# Fetch upstream changes
git fetch upstream

# Merge upstream changes (review carefully!)
git merge upstream/main

# Resolve conflicts if any
# Your AI Research pack should remain in expansion-packs/

# Push updates
git push origin main

# Publish new version
npm version patch
npm publish
```

## 📣 Marketing Your Fork

### NPM Package Page

Make sure your README highlights:

- 🎯 Target audience: AI/ML researchers
- ✨ Key features: 7 research agents, Archon MCP, workflows
- 🚀 Quick start: Simple installation command
- 📚 Documentation: Links to guides

### GitHub Repository

- Create clear README with quick start
- Add topics/tags: `bmad`, `ai-research`, `ml-research`, `academic-writing`
- Create releases with changelog
- Add examples and demos

### Community

- Share on Twitter/LinkedIn with #BMAD #AIResearch
- Write blog post about your research workflow
- Create video walkthrough
- Submit to BMAD community showcase

## 🛡️ Legal Considerations

### Attribution

- ✅ Keep original BMAD license and credits
- ✅ Clearly state it's a fork in README
- ✅ Add your own copyright for AI Research pack
- ✅ Credit Archon MCP integration

### Package Naming

- ✅ Use scoped package: `@yourname/package-name`
- ✅ Don't use "official" or mislead users
- ✅ Clear description: "Fork of BMAD with AI Research"

## 🎯 Recommended Package Names

Choose one:

- `@davidkreuzer/bmad-method-ai-research` (descriptive)
- `@davidkreuzer/bmad-research` (concise)
- `@davidkreuzer/bmad-academic` (clear audience)

## 📊 Success Metrics

Track:

- NPM downloads
- GitHub stars
- Issues/discussions
- Community feedback
- Research papers published using it!

## 🤝 Contributing Back

If you make improvements to core BMAD:

- Consider submitting PR to upstream BMAD repo
- Share AI Research pack enhancements
- Help other researchers

## 🆘 Support

- GitHub Issues: For bugs and features
- Discussions: For questions and community
- Discord: Join BMAD community
- Email: For private inquiries

---

**Ready to publish?**

1. ✅ Update package.json
2. ✅ Create GitHub repo
3. ✅ Update README and LICENSE
4. ✅ Test locally
5. ✅ Publish to npm
6. ✅ Share with research community!

Good luck! 🚀🔬
