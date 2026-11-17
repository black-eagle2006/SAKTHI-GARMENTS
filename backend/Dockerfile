# Stage 1: Build stage
FROM maven:3.9.6-eclipse-temurin-21-alpine AS builder
WORKDIR /app

# Copy pom.xml and download dependencies for faster layer caching
COPY pom.xml .
RUN mvn dependency:go-offline -B || true

# Copy source code and build production jar
COPY src ./src
RUN mvn clean package -DskipTests -B

# Stage 2: Runtime stage
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Add non-root system user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Create directory for file uploads and set ownership
RUN mkdir -p /app/uploads && chown -R appuser:appgroup /app

# Copy packaged jar from builder
COPY --from=builder /app/target/sakthi-garments-backend-1.0.0.jar app.jar
RUN chown appuser:appgroup app.jar

USER appuser

EXPOSE 8080

ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]
