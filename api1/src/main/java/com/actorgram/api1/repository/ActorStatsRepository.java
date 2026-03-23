package com.actorgram.api1.repository;

import com.actorgram.api1.domain.ActorStats;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActorStatsRepository extends JpaRepository<ActorStats, Long> {
}
