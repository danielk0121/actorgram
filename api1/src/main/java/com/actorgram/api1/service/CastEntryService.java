package com.actorgram.api1.service;

import com.actorgram.api1.domain.Actor;
import com.actorgram.api1.domain.ActorStats;
import com.actorgram.api1.domain.CastEntry;
import com.actorgram.api1.domain.Movie;
import com.actorgram.api1.dto.CastEntryRequest;
import com.actorgram.api1.dto.CastEntryResponse;
import com.actorgram.api1.repository.ActorRepository;
import com.actorgram.api1.repository.ActorStatsRepository;
import com.actorgram.api1.repository.CastEntryRepository;
import com.actorgram.api1.repository.MovieRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class CastEntryService {

    private final CastEntryRepository castEntryRepository;
    private final MovieRepository movieRepository;
    private final ActorRepository actorRepository;
    private final ActorStatsRepository actorStatsRepository;

    public CastEntryService(CastEntryRepository castEntryRepository, MovieRepository movieRepository,
                            ActorRepository actorRepository, ActorStatsRepository actorStatsRepository) {
        this.castEntryRepository = castEntryRepository;
        this.movieRepository = movieRepository;
        this.actorRepository = actorRepository;
        this.actorStatsRepository = actorStatsRepository;
    }

    public List<CastEntryResponse> findByMovieId(Long movieId) {
        return castEntryRepository.findByMovieId(movieId).stream()
                .map(CastEntryResponse::from)
                .collect(Collectors.toList());
    }

    public List<CastEntryResponse> findByActorId(Long actorId) {
        return castEntryRepository.findByActorId(actorId).stream()
                .map(CastEntryResponse::from)
                .collect(Collectors.toList());
    }

    public CastEntryResponse findById(Long id) {
        return CastEntryResponse.from(getCastEntry(id));
    }

    @Transactional
    public CastEntryResponse create(CastEntryRequest req) {
        Movie movie = movieRepository.findById(req.getMovieId())
                .orElseThrow(() -> new IllegalArgumentException("영화를 찾을 수 없습니다. id=" + req.getMovieId()));
        Actor actor = actorRepository.findById(req.getActorId())
                .orElseThrow(() -> new IllegalArgumentException("배우를 찾을 수 없습니다. id=" + req.getActorId()));

        CastEntry castEntry = new CastEntry(movie, actor, req.getRole(), req.getIsMain(), req.getRoleProfileImage());
        castEntryRepository.save(castEntry);

        // ActorStats movieCount 갱신
        ActorStats stats = actorStatsRepository.findById(actor.getId())
                .orElseThrow(() -> new IllegalArgumentException("배우 통계를 찾을 수 없습니다. actorId=" + actor.getId()));
        int count = castEntryRepository.countDistinctMovieByActorId(actor.getId());
        stats.setMovieCount(count);

        return CastEntryResponse.from(castEntry);
    }

    @Transactional
    public CastEntryResponse update(Long id, CastEntryRequest req) {
        CastEntry castEntry = getCastEntry(id);
        castEntry.update(req.getRole(), req.getIsMain(), req.getRoleProfileImage());
        return CastEntryResponse.from(castEntry);
    }

    @Transactional
    public void delete(Long id) {
        CastEntry castEntry = getCastEntry(id);
        Long actorId = castEntry.getActor().getId();
        castEntryRepository.delete(castEntry);

        // ActorStats movieCount 갱신
        ActorStats stats = actorStatsRepository.findById(actorId)
                .orElseThrow(() -> new IllegalArgumentException("배우 통계를 찾을 수 없습니다. actorId=" + actorId));
        int count = castEntryRepository.countDistinctMovieByActorId(actorId);
        stats.setMovieCount(count);
    }

    private CastEntry getCastEntry(Long id) {
        return castEntryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("출연 정보를 찾을 수 없습니다. id=" + id));
    }
}
