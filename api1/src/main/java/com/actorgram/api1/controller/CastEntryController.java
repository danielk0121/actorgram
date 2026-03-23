package com.actorgram.api1.controller;

import com.actorgram.api1.dto.CastEntryRequest;
import com.actorgram.api1.dto.CastEntryResponse;
import com.actorgram.api1.service.CastEntryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Tag(name = "CastEntry", description = "출연 정보 CRUD")
@RestController
@RequestMapping("/api/cast-entries")
public class CastEntryController {

    private final CastEntryService castEntryService;

    public CastEntryController(CastEntryService castEntryService) {
        this.castEntryService = castEntryService;
    }

    @Operation(summary = "영화별 출연진 조회")
    @GetMapping("/by-movie/{movieId}")
    public List<CastEntryResponse> findByMovieId(@PathVariable Long movieId) {
        return castEntryService.findByMovieId(movieId);
    }

    @Operation(summary = "배우별 필모그래피 조회")
    @GetMapping("/by-actor/{actorId}")
    public List<CastEntryResponse> findByActorId(@PathVariable Long actorId) {
        return castEntryService.findByActorId(actorId);
    }

    @Operation(summary = "출연 정보 단건 조회")
    @GetMapping("/{id}")
    public CastEntryResponse findById(@PathVariable Long id) {
        return castEntryService.findById(id);
    }

    @Operation(summary = "출연 정보 생성")
    @PostMapping
    public ResponseEntity<CastEntryResponse> create(@Valid @RequestBody CastEntryRequest req) {
        return ResponseEntity.status(201).body(castEntryService.create(req));
    }

    @Operation(summary = "출연 정보 수정")
    @PutMapping("/{id}")
    public CastEntryResponse update(@PathVariable Long id, @Valid @RequestBody CastEntryRequest req) {
        return castEntryService.update(id, req);
    }

    @Operation(summary = "출연 정보 삭제")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        castEntryService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
