# SAKTHI GARMENTS — Local Developer Setup Guide

This guide provides instructions to run the SAKTHI GARMENTS application locally in Visual Studio Code or your preferred IDE on Windows, macOS, or Linux.

---

## 1. Environment Prerequisites

Ensure the following tools are installed on your workstation:

| Component | Minimum Version | Verified Working | Notes |
| :--- | :--- | :--- | :--- |
| **Java JDK** | 21 LTS | OpenJDK 21 or Oracle JDK 25 | Set `JAVA_HOME` environment variable |
| **Apache Maven** | 3.8+ | 3.9.6 | System Maven or standalone portable binary |
| **Node.js** | 18.0+ | Node v20 / v24 | Includes `npm` 10+ |
| **Git** | 2.30+ | 2.40+ | For version control |

---

## 2. Fast Track: Zero-Config In-Memory Mode (Recommended)

In this mode, the backend boots up with an **in-memory H2 database**, pre-loaded with initial Flyway seed migrations (SAKTHI GARMENTS flagship mill, ₹69 sample pack, products, and test accounts). **No external database server is required.**

### Terminal 1: Backend Service
```powershell
# Navigate to the backend directory
cd "d:\SG MASTER\backend"

# Run Spring Boot with the dev profile (H2 in-memory)
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

*When ready, the terminal displays:*  
`Tomcat started on port 8080 (http) with context path '/'`  
`Started SakthiGarmentsApplication in 3.2 seconds`

### Terminal 2: Frontend Service
```powershell
# Navigate to the frontend directory
cd "d:\SG MASTER\frontend"

# Start the Vite development server
npm run dev
```

*When ready, the terminal displays:*  
`VITE v5.4.19  ready in 480 ms`  
`➜  Local:   http://localhost:5173/`

Open your browser and visit **`http://localhost:5173`**.

---

## 3. Production Profile with MySQL 8.0

If you prefer to connect to an actual MySQL database instance:

### Step 1: Ensure MySQL is Running
Create a database named `sakthi_garments`:
```sql
CREATE DATABASE IF NOT EXISTS sakthi_garments CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Step 2: Configure Environment Variables
Set your credentials in `backend/.env` or export them:
```powershell
$env:SPRING_PROFILES_ACTIVE="mysql"
$env:MYSQL_HOST="localhost"
$env:MYSQL_PORT="3306"
$env:MYSQL_DATABASE="sakthi_garments"
$env:MYSQL_USER="root"
$env:MYSQL_PASSWORD="your_mysql_password"
```

### Step 3: Start Backend
```powershell
cd "d:\SG MASTER\backend"
mvn spring-boot:run -Dspring-boot.run.profiles=mysql
```
Flyway will automatically execute `V1__init_schema.sql` and `V2__seed_initial_data.sql` upon initial startup.

---

## 4. Production Packaging & Verification

To verify that both frontend and backend package cleanly without warnings or errors:

### Frontend Production Build
```powershell
cd "d:\SG MASTER\frontend"
npm run build
```
*Expected Result*: Output bundled into `frontend/dist/` in ~10 seconds with 0 errors.

### Backend Production Build & Automated Tests
```powershell
cd "d:\SG MASTER\backend"
mvn clean package
```
*Expected Result*:
```
[INFO] Tests run: 8, Failures: 0, Errors: 0, Skipped: 0
[INFO] Building jar: d:\SG MASTER\backend\target\sakthi-garments-backend-1.0.0.jar
[INFO] BUILD SUCCESS
```

---

## 5. Developer Tools & Interactive Consoles

### 5.1 Swagger 3 / OpenAPI UI
Inspect and test all 12 controllers and endpoints directly from your browser:
- **URL**: `http://localhost:8080/swagger-ui.html`
- **OpenAPI JSON Spec**: `http://localhost:8080/v3/api-docs`

### 5.2 H2 Database Web Console (Dev Profile Only)
Direct SQL query console to inspect database rows in real-time:
- **URL**: `http://localhost:8080/h2-console`
- **JDBC Driver Class**: `org.h2.Driver`
- **JDBC URL**: `jdbc:h2:mem:sakthi_dev_db`
- **User Name**: `sa`
- **Password**: *(leave blank)*

---

## 6. Troubleshooting & Gotchas

### Issue 1: Port Already in Use (8080 or 5173)
- If port `8080` is in use by another application:
  ```powershell
  # Windows PowerShell
  Get-Process -Id (Get-NetTCPConnection -LocalPort 8080).OwningProcess | Stop-Process -Force
  ```
- Alternatively, override the port in `backend/src/main/resources/application.yml`:
  ```yaml
  server:
    port: 8081
  ```

### Issue 2: Java 25 Bytecode Compatibility
- **Background**: Oracle JDK 25 LTS introduces strict dynamic agent loading rules and class file version 69.
- **Solution in SAKTHI GARMENTS**: The backend uses pure standard Java POJOs (explicit constructors, getters, setters, and builders) rather than Lombok, and `maven-surefire-plugin` is pre-configured with `-Dnet.bytebuddy.experimental=true -XX:+EnableDynamicAgentLoading`. Builds remain 100% compliant across JDK 21 through JDK 25+.

### Issue 3: WebGL Hardware Acceleration
- If 3D canvas rendering appears black or sluggish:
  - Check `chrome://gpu` or `edge://gpu` to confirm WebGL 2.0 is hardware accelerated.
  - SAKTHI GARMENTS provides fallback 2D previews in case WebGL is unavailable on low-end virtual machines.
