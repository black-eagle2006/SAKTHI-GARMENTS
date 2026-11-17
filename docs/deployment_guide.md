# SAKTHI GARMENTS — Production Deployment & DevOps Manual

## 1. Production Architecture Overview

The production architecture deploys SAKTHI GARMENTS into three coordinated tiers:
1. **Frontend Edge Tier**: High-performance Nginx Alpine container serving optimized static JavaScript/CSS bundles with Gzip compression and long-term caching headers, while proxying API calls to the backend.
2. **Application Core Tier**: Containerized Spring Boot 3.3.4 runtime executing on Eclipse Temurin 21 JRE, running with non-root security privileges.
3. **Database Tier**: MySQL 8.0 Enterprise instance with UTF-8mb4 collation, indexed search partitions, and persistent volume storage.

---

## 2. Docker Compose Deployment (Recommended)

### Step 1: Clone Repository & Prepare Environment
```bash
git clone <repository_url> "sakthi-garments"
cd sakthi-garments

# Create production environment file
cp .env.example .env
```

### Step 2: Configure Production Secrets in `.env`
Ensure strong production credentials:
```ini
# Database Secrets
MYSQL_HOST=mysql
MYSQL_PORT=3306
MYSQL_DATABASE=sakthi_garments
MYSQL_USER=sakthi_prod_user
MYSQL_PASSWORD=SuperComplexPassword_982!

# Security Secrets
JWT_SECRET=super_secret_production_key_minimum_256_bits_length_tiruppur_sakthi_2026
GEMINI_API_KEY=AIzaSyActualProductionKey
RAZORPAY_KEY_ID=rzp_live_YourProductionLiveKey
RAZORPAY_KEY_SECRET=YourProductionRazorpaySecret
```

### Step 3: Launch Containers
```bash
# Build production images and start in detached daemon mode
docker-compose up --build -d
```

### Step 4: Monitor Container Health
```bash
docker-compose ps
docker-compose logs -f backend
```

---

## 3. Standalone Linux Virtual Machine Deployment (Systemd + Nginx)

For deployment on an AWS EC2, DigitalOcean Droplet, or bare-metal Ubuntu 22.04 / 24.04 LTS instance:

### Step 1: Install OpenJDK 21 and Nginx
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y openjdk-21-jre-headless nginx git
```

### Step 2: Install and Configure Backend Service
1. Copy the packaged JAR file to `/opt/sakthigarments/sakthi-garments-backend-1.0.0.jar`.
2. Create dedicated system user:
   ```bash
   sudo useradd -r -s /bin/false sakthi
   sudo chown -R sakthi:sakthi /opt/sakthigarments
   ```
3. Create Systemd service definition `/etc/systemd/system/sakthigarments.service`:
   ```ini
   [Unit]
   Description=SAKTHI GARMENTS Backend Application
   After=network.target mysql.service

   [Service]
   User=sakthi
   WorkingDirectory=/opt/sakthigarments
   ExecStart=/usr/bin/java -Xms512m -Xmx2048m -Dspring.profiles.active=mysql -jar /opt/sakthigarments/sakthi-garments-backend-1.0.0.jar
   SuccessExitStatus=143
   Restart=always
   RestartSec=10

   [Install]
   WantedBy=multi-user.target
   ```
4. Enable and start service:
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable sakthigarments
   sudo systemctl start sakthigarments
   ```

### Step 3: Configure SSL with Let's Encrypt (Certbot)
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d sakthigarments.in -d www.sakthigarments.in
```

---

## 4. Production Healthchecks & Monitoring

The backend exposes Spring Boot Actuator endpoints for uptime and load metrics:

| Endpoint | Purpose | Access Control |
| :--- | :--- | :--- |
| `GET /actuator/health` | Container liveness / readiness probe | Public |
| `GET /actuator/info` | Application metadata and version | Public |
| `GET /actuator/metrics` | JVM heap, garbage collection, HTTP request count | Restricted to Admin |

---

## 5. Automated Database Backups

Schedule automated daily MySQL backups via cron job:

```bash
# Add to /etc/cron.daily/sakthi_db_backup
#!/bin/bash
BACKUP_DIR="/var/backups/sakthi_mysql"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
mkdir -p "$BACKUP_DIR"

mysqldump -u root -p"SuperComplexPassword_982!" sakthi_garments | gzip > "$BACKUP_DIR/sakthi_backup_$TIMESTAMP.sql.gz"
find "$BACKUP_DIR" -type f -mtime +30 -delete
```
