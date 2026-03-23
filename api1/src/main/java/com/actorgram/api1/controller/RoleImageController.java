package com.actorgram.api1.controller;

import com.actorgram.api1.dto.RoleImageRequest;
import com.actorgram.api1.dto.RoleImageResponse;
import com.actorgram.api1.service.RoleImageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Tag(name = "RoleImage", description = "배역 이미지 CRUD")
@RestController
@RequestMapping("/api/role-images")
public class RoleImageController {

    private final RoleImageService roleImageService;

    public RoleImageController(RoleImageService roleImageService) {
        this.roleImageService = roleImageService;
    }

    @Operation(summary = "출연 정보별 배역 이미지 조회")
    @GetMapping("/by-cast-entry/{castEntryId}")
    public List<RoleImageResponse> findByCastEntryId(@PathVariable Long castEntryId) {
        return roleImageService.findByCastEntryId(castEntryId);
    }

    @Operation(summary = "배역 이미지 추가")
    @PostMapping("/by-cast-entry/{castEntryId}")
    public ResponseEntity<RoleImageResponse> create(@PathVariable Long castEntryId,
                                                    @Valid @RequestBody RoleImageRequest req) {
        return ResponseEntity.status(201).body(roleImageService.create(castEntryId, req));
    }

    @Operation(summary = "배역 이미지 수정")
    @PutMapping("/{id}")
    public RoleImageResponse update(@PathVariable Long id, @Valid @RequestBody RoleImageRequest req) {
        return roleImageService.update(id, req);
    }

    @Operation(summary = "배역 이미지 삭제")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        roleImageService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
