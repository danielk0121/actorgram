package com.actorgram.api1.repository;

import com.actorgram.api1.domain.RoleImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoleImageRepository extends JpaRepository<RoleImage, Long> {
    List<RoleImage> findByCastEntryIdOrderBySeqAsc(Long castEntryId);
}
