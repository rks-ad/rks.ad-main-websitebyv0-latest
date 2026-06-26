# GitHub Setup & Deployment Guide

## Prerequisites
- GitHub account
- Git installed on your local machine
- VPS with Docker & Docker Compose installed
- Supabase project with credentials

## Step 1: Initialize Git Repository

```bash
# Navigate to your project directory
cd /path/to/rks-advocate

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: RKS.Ad premium advocate portfolio"
```

## Step 2: Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create a new repository named `rks-advocate`
3. **Do NOT initialize with README** (since we already have one)
4. Leave other options default
5. Click "Create repository"

## Step 3: Connect Local to GitHub

```bash
# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/rks-advocate.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 4: Configure GitHub Secrets (Optional - for CI/CD)

If you plan to use GitHub Actions for automated deployments:

1. Go to your repository → Settings → Secrets and variables → Actions
2. Add the following secrets:
   - `SUPABASE_URL`: Your Supabase project URL
   - `SUPABASE_ANON_KEY`: Your Supabase anonymous key
   - `REGISTRY_USERNAME`: Docker Hub username (if using Docker Hub)
   - `REGISTRY_PASSWORD`: Docker Hub password or token

## Step 5: Deploy from GitHub to Your VPS

### Option A: Manual Pull & Deploy

```bash
# SSH into your VPS
ssh user@your-vps-ip

# Navigate to application directory
cd /home/rks/rks-advocate

# Pull latest changes from GitHub
git pull origin main

# Rebuild and restart
docker-compose build --no-cache
docker-compose down
docker-compose up -d
```

### Option B: GitHub Actions Auto-Deploy (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to VPS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Deploy to VPS
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd /home/rks/rks-advocate
            git pull origin main
            docker-compose build --no-cache
            docker-compose down
            docker-compose up -d
```

Then add to repository secrets:
- `VPS_HOST`: Your VPS IP address
- `VPS_USER`: SSH username (e.g., root or ubuntu)
- `VPS_SSH_KEY`: Your private SSH key

## File Structure for GitHub

```
rks-advocate/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── animated-background.tsx
│   ├── hero-section.tsx
│   ├── action-section.tsx
│   └── visitor-counter.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   └── server.ts
│   └── websocket-server.ts
├── public/
├── .env.example
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── DEPLOYMENT.md
├── GITHUB_SETUP.md
├── next.config.mjs
├── package.json
├── pnpm-lock.yaml
├── README.md
└── tsconfig.json
```

## Important: Never Commit Secrets

**Never commit `.env` file to GitHub!** Always use `.env.example` as a template.

The `.gitignore` file already prevents this, but always verify:
```bash
# Check if .env is tracked
git ls-files | grep .env

# If accidentally committed, remove it
git rm --cached .env
git commit -m "Remove .env from version control"
```

## Updating Dependencies

If you need to update packages:

```bash
# Locally
pnpm update
pnpm install

# Commit lock file changes
git add pnpm-lock.yaml package.json
git commit -m "Update dependencies"
git push origin main

# On VPS, pull changes and rebuild
git pull origin main
docker-compose build --no-cache
docker-compose up -d
```

## Branching Strategy

For development work:

```bash
# Create feature branch
git checkout -b feature/animation-improvements

# Make changes and commit
git add .
git commit -m "Improve particle animations"

# Push to GitHub
git push origin feature/animation-improvements

# Create Pull Request on GitHub
# After review, merge to main
```

## Troubleshooting GitHub Deployment

### SSH Key Issues
```bash
# Generate new SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Add to SSH agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Add public key to GitHub: Settings → SSH and GPG keys → New SSH key
```

### Permission Denied
```bash
# Check SSH connection
ssh -T git@github.com

# Should respond: Hi username! You've successfully authenticated...
```

### Large Files
Keep your repository lightweight:
- Don't commit node_modules (use .gitignore)
- Don't commit .next/ build directory
- Don't commit logs or screenshots

## CI/CD Best Practices

1. **Always test locally before pushing**
   ```bash
   pnpm run build
   pnpm run lint
   ```

2. **Use meaningful commit messages**
   ```
   ✓ Add hero section animations
   ✗ fix stuff
   ```

3. **Keep commits atomic**
   - One feature = one commit (when possible)
   - Easier to revert if needed

4. **Review before merging**
   - Use pull requests for code review
   - Run tests in GitHub Actions

## Monitoring Deployments

After pushing to GitHub:

1. **Check GitHub Actions** (if using CI/CD)
   - Repository → Actions tab
   - View workflow run status

2. **Check VPS deployment** (after manual or auto-deploy)
   ```bash
   ssh user@vps-ip
   docker ps | grep rks-advocate
   docker logs -f rks-advocate
   ```

3. **Verify website**
   - Visit https://rks.ad
   - Check if latest changes are live

## Rollback Procedure

If something breaks after deployment:

```bash
# On VPS
git log --oneline  # View recent commits
git revert <commit-hash>  # Create new commit that reverts changes
git push origin main

# Or checkout previous version
git checkout <previous-commit-hash>
docker-compose build --no-cache
docker-compose up -d
```

## Resources

- [GitHub Documentation](https://docs.github.com/)
- [Git Basics](https://git-scm.com/doc)
- [GitHub Actions](https://github.com/features/actions)
- [SSH Key Setup](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

## Contact & Support

- **Domain**: rks.ad
- **Email**: iam@rks.ad
- **Cases**: https://ecourtsindia.com/advocate/ravi-kumar-sharma
- **Consult**: https://cal.id/lawup
