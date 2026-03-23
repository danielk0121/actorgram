package com.actorgram.api1.controller;

import com.actorgram.api1.dto.MovieRequest;
import com.actorgram.api1.dto.MovieResponse;
import com.actorgram.api1.service.MovieService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Tag(name = "Movie", description = "영화 CRUD")
@RestController
@RequestMapping("/api/movies")
public class MovieController {

    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @Operation(summary = "영화 전체 조회")
    @GetMapping
    public List<MovieResponse> findAll() {
        return movieService.findAll();
    }

    @Operation(summary = "영화 단건 조회")
    @GetMapping("/{id}")
    public MovieResponse findById(@PathVariable Long id) {
        return movieService.findById(id);
    }

    @Operation(summary = "영화 생성")
    @PostMapping
    public ResponseEntity<MovieResponse> create(@Valid @RequestBody MovieRequest req) {
        return ResponseEntity.status(201).body(movieService.create(req));
    }

    @Operation(summary = "영화 수정")
    @PutMapping("/{id}")
    public MovieResponse update(@PathVariable Long id, @Valid @RequestBody MovieRequest req) {
        return movieService.update(id, req);
    }

    @Operation(summary = "영화 삭제")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        movieService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
