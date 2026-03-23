package com.actorgram.api1.repository;

import com.actorgram.api1.domain.CastEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CastEntryRepository extends JpaRepository<CastEntry, Long> {

    List<CastEntry> findByMovieId(Long movieId);

    List<CastEntry> findByActorId(Long actorId);

    @Query("SELECT COUNT(DISTINCT c.movie.id) FROM CastEntry c WHERE c.actor.id = :actorId")
    int countDistinctMovieByActorId(@Param("actorId") Long actorId);
}
