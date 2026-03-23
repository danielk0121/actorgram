package com.actorgram.api1.service;

import com.actorgram.api1.domain.CastEntry;
import com.actorgram.api1.domain.RoleImage;
import com.actorgram.api1.dto.RoleImageRequest;
import com.actorgram.api1.dto.RoleImageResponse;
import com.actorgram.api1.repository.CastEntryRepository;
import com.actorgram.api1.repository.RoleImageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class RoleImageService {

    private final RoleImageRepository roleImageRepository;
    private final CastEntryRepository castEntryRepository;

    public RoleImageService(RoleImageRepository roleImageRepository, CastEntryRepository castEntryRepository) {
        this.roleImageRepository = roleImageRepository;
        this.castEntryRepository = castEntryRepository;
    }

    public List<RoleImageResponse> findByCastEntryId(Long castEntryId) {
        return roleImageRepository.findByCastEntryIdOrderBySeqAsc(castEntryId).stream()
                .map(RoleImageResponse::from)
                .collect(Collectors.toList());
    }

    @Transactional
    public RoleImageResponse create(Long castEntryId, RoleImageRequest req) {
        CastEntry castEntry = castEntryRepository.findById(castEntryId)
                .orElseThrow(() -> new IllegalArgumentException("출연 정보를 찾을 수 없습니다. id=" + castEntryId));
        RoleImage roleImage = new RoleImage(castEntry, req.getUrl(), req.getSeq());
        roleImageRepository.save(roleImage);
        return RoleImageResponse.from(roleImage);
    }

    @Transactional
    public RoleImageResponse update(Long id, RoleImageRequest req) {
        RoleImage roleImage = getRoleImage(id);
        roleImage.update(req.getUrl(), req.getSeq());
        return RoleImageResponse.from(roleImage);
    }

    @Transactional
    public void delete(Long id) {
        roleImageRepository.delete(getRoleImage(id));
    }

    private RoleImage getRoleImage(Long id) {
        return roleImageRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("배역 이미지를 찾을 수 없습니다. id=" + id));
    }
}
