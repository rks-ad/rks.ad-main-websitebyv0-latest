# RKS.Ad - Premium Advocate Portfolio
## Deployment Guide for Dokploy

### Project Overview
- **Domain**: rks.ad
- **Name**: Ravi Kumar Sharma, Advocate
- **Features**: 
  - Animated gradient & particle background with click interactions
  - Interactive letter hovers (R→Ravi, K→Kumar, S→Sharma, Ad→Advocate)
  - Real-time visitor counter synced across devices via Supabase
  - Premium action buttons (Email, Cases, Consult)
  - 25 random counter increments per page refresh

### Prerequisites
1. **VPS Setup**
   - Ubuntu 20.04+ or similar Linux distribution
   - Docker & Docker Compose installed
   - Nginx or similar reverse proxy (optional but recommended)

2. **Supabase Account**
   - Create a Supabase project
   - Note your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. **Domain Configuration**
   - Point your DNS records to your VPS IP address

### Installation on Dokploy

#### 1. Prepare Your VPS
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker & Docker Compose
sudo apt install -y docker.io docker-compose

# Add your user to docker group
sudo usermod -aG docker $USER
```

#### 2. Clone or Upload Project
```bash
# If using git
git clone <your-repo-url> /home/rks/rks-advocate
cd /home/rks/rks-advocate

# Or upload the files directly to your VPS
```

#### 3. Configure Environment Variables
```bash
# Copy example env file
cp .env.example .env

# Edit with your Supabase credentials
nano .env
# Update:
# NEXT_PUBLIC_SUPABASE_URL=your_url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

#### 4. Deploy with Dokploy

**Option A: Using Dokploy CLI**
```bash
# Install Dokploy CLI (if not already installed)
curl https://raw.githubusercontent.com/dokploy/dokploy/main/install.sh | bash

# Deploy from project directory
dokploy deploy --name rks-advocate --dockerfile ./Dockerfile
```

**Option B: Using Docker Compose (Standalone)**
```bash
# Build the Docker image
docker-compose build

# Start the application
docker-compose up -d

# Check logs
docker-compose logs -f app
```

**Option C: Manual Docker Deployment**
```bash
# Build the image
docker build -t rks-advocate:latest .

# Run the container
docker run -d \
  --name rks-advocate \
  -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY \
  --restart unless-stopped \
  rks-advocate:latest
```

#### 5. Setup Nginx Reverse Proxy (Recommended)
```bash
# Create Nginx config
sudo nano /etc/nginx/sites-available/rks.ad

# Add this configuration:
server {
    listen 80;
    server_name rks.ad www.rks.ad;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# Enable the site
sudo ln -s /etc/nginx/sites-available/rks.ad /etc/nginx/sites-enabled/

# Test Nginx config
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

#### 6. Setup SSL with Let's Encrypt
```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Generate certificate
sudo certbot --nginx -d rks.ad -d www.rks.ad

# Auto-renewal should be configured automatically
sudo systemctl start certbot.timer
sudo systemctl enable certbot.timer
```

### Database Schema

The application automatically creates the required table on first use:

```sql
CREATE TABLE IF NOT EXISTS public.visitor_hits (
  id BIGSERIAL PRIMARY KEY,
  total_hits BIGINT NOT NULL DEFAULT 0,
  increment_value INT NOT NULL,
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

**Supabase Configuration:**
- Enable Row Level Security (RLS)
- Public read/write access allowed (no authentication required for counter)
- Real-time updates enabled for live counter sync

### Monitoring & Maintenance

#### Check Application Status
```bash
# If using Docker Compose
docker-compose ps

# If using direct Docker
docker ps | grep rks-advocate

# View logs
docker logs -f rks-advocate
# or
docker-compose logs -f app
```

#### Update Application
```bash
# Pull latest code
git pull origin main

# Rebuild Docker image
docker-compose build --no-cache

# Restart services
docker-compose down
docker-compose up -d
```

#### Backup Visitor Data
```bash
# Export from Supabase console or use their CLI:
# The visitor_hits table is the only data to backup
```

### Troubleshooting

#### Port Already in Use
```bash
# If port 3000 is already in use
docker-compose down
# or
sudo lsof -i :3000
sudo kill -9 <PID>
```

#### Supabase Connection Issues
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct
- Check Supabase project is running
- Ensure RLS policies are configured correctly
- Test connectivity: `curl https://your_supabase_url/`

#### SSL Certificate Issues
```bash
# Renew certificate manually
sudo certbot renew --force-renewal

# Check certificate status
sudo certbot certificates
```

### Performance Optimization

1. **Enable Caching**
   - Configure Nginx cache headers
   - Use CloudFlare or similar CDN

2. **Database Optimization**
   - Index the `id` column in visitor_hits table
   - Use Supabase auto-vacuuming

3. **Image Optimization**
   - Canvas animations are GPU-accelerated
   - No external images loaded

### Security Best Practices

1. **Environment Variables**
   - Never commit `.env` file to repository
   - Use `.env.example` for template
   - Rotate Supabase keys periodically

2. **Firewall**
   ```bash
   # UFW firewall setup
   sudo ufw enable
   sudo ufw allow 22/tcp
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   ```

3. **Access Control**
   - Use SSH keys only (disable password login)
   - Implement VPC if available on your VPS provider

### Contact & Support

- **Email**: iam@rks.ad
- **Cases**: https://ecourtsindia.com/advocate/ravi-kumar-sharma
- **Consult**: https://cal.id/lawup
- **Domain**: rks.ad

### Version Information
- **Node.js**: 20 LTS
- **Next.js**: 16
- **Supabase**: Latest
- **Docker**: Official Node.js 20 Alpine image
