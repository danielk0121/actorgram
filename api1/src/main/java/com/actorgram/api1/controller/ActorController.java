package com.actorgram.api1.controller;

import com.actorgram.api1.dto.ActorRequest;
import com.actorgram.api1.dto.ActorResponse;
import com.actorgram.api1.service.ActorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Tag(name = "Actor", description = "배우 CRUD")
@RestController
@RequestMapping("/api/actors")
public class ActorController {

    private final ActorService actorService;

    public ActorController(ActorService actorService) {
        this.actorService = actorService;
    }

    @Operation(summary = "배우 전체 조회")
    @GetMapping
    public List<ActorResponse> findAll() {
        return actorService.findAll();
    }

    @Operation(summary = "배우 단건 조회")
    @GetMapping("/{id}")
    public ActorResponse findById(@PathVariable Long id) {
        return actorService.findById(id);
    }

    @Operation(summary = "배우 생성")
    @PostMapping
    public ResponseEntity<ActorResponse> create(@Valid @RequestBody ActorRequest req) {
        return ResponseEntity.status(201).body(actorService.create(req));
    }

    @Operation(summary = "배우 수정")
    @PutMapping("/{id}")
    public ActorResponse update(@PathVariable Long id, @Valid @RequestBody ActorRequest req) {
        return actorService.update(id, req);
    }

    @Operation(summary = "배우 삭제")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        actorService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
