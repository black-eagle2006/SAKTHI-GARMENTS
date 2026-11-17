package com.sakthigarments.controller;

import com.sakthigarments.migration.MigrationReport;
import com.sakthigarments.migration.MongoToMySqlMigrationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/migration")
@Tag(name = "Database Migration", description = "MongoDB to MySQL 8 Enterprise Migration Operations")
public class MigrationController {

    private final MongoToMySqlMigrationService migrationService;

    @Autowired
    public MigrationController(MongoToMySqlMigrationService migrationService) {
        this.migrationService = migrationService;
    }

    @PostMapping("/execute")
    @Operation(summary = "Execute MongoDB to MySQL 8 Migration", description = "Extracts legacy MongoDB collections and imports them into normalized relational MySQL tables.")
    public ResponseEntity<MigrationReport> executeMigration(@RequestBody(required = false) Map<String, Object> payload) {
        boolean dryRun = false;
        if (payload != null && payload.containsKey("dryRun")) {
            dryRun = Boolean.parseBoolean(payload.get("dryRun").toString());
        }
        MigrationReport report = migrationService.executeMigration(dryRun);
        return ResponseEntity.ok(report);
    }

    @GetMapping("/report")
    @Operation(summary = "Get Latest Migration Report", description = "Returns the JSON summary of the most recent database migration execution.")
    public ResponseEntity<MigrationReport> getLatestReport() {
        MigrationReport report = migrationService.getLastReport();
        if (report == null) {
            // Trigger automatic execution to generate current state report
            report = migrationService.executeMigration(true);
        }
        return ResponseEntity.ok(report);
    }

    @GetMapping(value = "/report/markdown", produces = MediaType.TEXT_PLAIN_VALUE)
    @Operation(summary = "Get Migration Report in Markdown Format", description = "Returns formatted markdown text of the migration report for documentation.")
    public ResponseEntity<String> getMarkdownReport() {
        MigrationReport report = migrationService.getLastReport();
        if (report == null) {
            report = migrationService.executeMigration(true);
        }
        return ResponseEntity.ok(report.toMarkdown());
    }
}
