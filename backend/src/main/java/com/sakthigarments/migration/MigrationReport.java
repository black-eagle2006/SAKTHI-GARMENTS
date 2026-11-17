package com.sakthigarments.migration;

import java.time.LocalDateTime;
import java.util.*;

public class MigrationReport {

    private String status = "PENDING";
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private long durationMs;
    private String sourceMode;
    private String sourceLocation;
    private Map<String, CollectionStat> collectionStats = new LinkedHashMap<>();
    private Map<String, Boolean> validationChecks = new LinkedHashMap<>();
    private List<String> globalWarnings = new ArrayList<>();

    public static class CollectionStat {
        private String collectionName;
        private int readCount = 0;
        private int importedCount = 0;
        private int skippedCount = 0;
        private int errorCount = 0;
        private List<String> errors = new ArrayList<>();

        public CollectionStat() {}

        public CollectionStat(String collectionName) {
            this.collectionName = collectionName;
        }

        public void incrementRead() { this.readCount++; }
        public void incrementImported() { this.importedCount++; }
        public void incrementSkipped() { this.skippedCount++; }
        public void addError(String error) {
            this.errorCount++;
            this.errors.add(error);
        }

        public String getCollectionName() { return collectionName; }
        public int getReadCount() { return readCount; }
        public int getImportedCount() { return importedCount; }
        public int getSkippedCount() { return skippedCount; }
        public int getErrorCount() { return errorCount; }
        public List<String> getErrors() { return errors; }
    }

    public MigrationReport() {
        this.startTime = LocalDateTime.now();
    }

    public void complete(String finalStatus) {
        this.endTime = LocalDateTime.now();
        this.durationMs = java.time.Duration.between(startTime, endTime).toMillis();
        this.status = finalStatus;
    }

    public CollectionStat getOrCreateStat(String collection) {
        return collectionStats.computeIfAbsent(collection, CollectionStat::new);
    }

    public void addValidationCheck(String checkName, boolean passed) {
        validationChecks.put(checkName, passed);
    }

    public void addWarning(String warning) {
        globalWarnings.add(warning);
    }

    public String toMarkdown() {
        StringBuilder sb = new StringBuilder();
        sb.append("# MongoDB to MySQL 8 Migration Execution Report\n\n");
        sb.append("**Execution Status:** `").append(status).append("`  \n");
        sb.append("**Source Mode:** `").append(sourceMode).append("`  \n");
        sb.append("**Source Location:** `").append(sourceLocation).append("`  \n");
        sb.append("**Execution Duration:** ").append(durationMs).append(" ms  \n");
        sb.append("**Completed At:** ").append(endTime != null ? endTime.toString() : "N/A").append("  \n\n");

        sb.append("### Collection Migration Statistics\n\n");
        sb.append("| Collection | Read | Imported | Skipped | Errors |\n");
        sb.append("| :--- | :--- | :--- | :--- | :--- |\n");
        for (CollectionStat stat : collectionStats.values()) {
            sb.append("| `").append(stat.getCollectionName()).append("` | ")
              .append(stat.getReadCount()).append(" | ")
              .append(stat.getImportedCount()).append(" | ")
              .append(stat.getSkippedCount()).append(" | ")
              .append(stat.getErrorCount()).append(" |\n");
        }

        sb.append("\n### Relational Integrity Validations\n\n");
        for (Map.Entry<String, Boolean> entry : validationChecks.entrySet()) {
            sb.append("- [").append(entry.getValue() ? "x" : " ").append("] ")
              .append(entry.getKey()).append(": **")
              .append(entry.getValue() ? "PASSED" : "FAILED").append("**\n");
        }

        if (!globalWarnings.isEmpty()) {
            sb.append("\n### Operational Notes & Warnings\n\n");
            for (String w : globalWarnings) {
                sb.append("> ⚠️ ").append(w).append("\n\n");
            }
        }

        return sb.toString();
    }

    // Getters and setters
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getStartTime() { return startTime; }
    public LocalDateTime getEndTime() { return endTime; }
    public long getDurationMs() { return durationMs; }

    public String getSourceMode() { return sourceMode; }
    public void setSourceMode(String sourceMode) { this.sourceMode = sourceMode; }

    public String getSourceLocation() { return sourceLocation; }
    public void setSourceLocation(String sourceLocation) { this.sourceLocation = sourceLocation; }

    public Map<String, CollectionStat> getCollectionStats() { return collectionStats; }
    public Map<String, Boolean> getValidationChecks() { return validationChecks; }
    public List<String> getGlobalWarnings() { return globalWarnings; }
}
