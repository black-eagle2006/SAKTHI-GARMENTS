package com.sakthigarments.controller;

import com.sakthigarments.model.DesignProject;
import com.sakthigarments.repository.DesignProjectRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/customizer")
@Tag(name = "3D Customizer Studio", description = "Saving and managing 3D apparel customization projects")
public class CustomizerController {

    private final DesignProjectRepository designRepository;

    public CustomizerController(DesignProjectRepository designRepository) {
        this.designRepository = designRepository;
    }

    @PostMapping("/designs")
    @Operation(summary = "Save a new 3D customizer project")
    public ResponseEntity<DesignProject> saveDesign(
            @RequestBody DesignProject project,
            Authentication authentication) {
        // Project can be saved with or without authenticated user
        return ResponseEntity.ok(designRepository.save(project));
    }

    @GetMapping("/designs")
    @Operation(summary = "List saved designs")
    public ResponseEntity<List<DesignProject>> getSavedDesigns() {
        return ResponseEntity.ok(designRepository.findAll());
    }

    @GetMapping("/designs/{id}")
    @Operation(summary = "Get a specific design by ID")
    public ResponseEntity<DesignProject> getDesignById(@PathVariable Long id) {
        return designRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
