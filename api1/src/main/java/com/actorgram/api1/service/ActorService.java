package com.actorgram.api1.service;

import com.actorgram.api1.domain.Actor;
import com.actorgram.api1.domain.ActorStats;
import com.actorgram.api1.dto.ActorRequest;
import com.actorgram.api1.dto.ActorResponse;
import com.actorgram.api1.repository.ActorRepository;
import com.actorgram.api1.repository.ActorStatsRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class ActorService {

    private final ActorRepository actorRepository;
    private final ActorStatsRepository actorStatsRepository;

    public ActorService(ActorRepository actorRepository, ActorStatsRepository actorStatsRepository) {
        this.actorRepository = actorRepository;
        this.actorStatsRepository = actorStatsRepository;
    }

    public List<ActorResponse> findAll() {
        return actorRepository.findAll().stream()
                .map(ActorResponse::from)
                .collect(Collectors.toList());
    }

    public ActorResponse findById(Long id) {
        return ActorResponse.from(getActor(id));
    }

    @Transactional
    public ActorResponse create(ActorRequest req) {
        Actor actor = new Actor(req.getName(), req.getBirthYear(), req.getNationality(),
                req.getDebutDate(), req.getGender(), req.getProfileImage());
        actorRepository.save(actor);
        actorStatsRepository.save(new ActorStats(actor));
        return ActorResponse.from(actor);
    }

    @Transactional
    public ActorResponse update(Long id, ActorRequest req) {
        Actor actor = getActor(id);
        actor.update(req.getName(), req.getBirthYear(), req.getNationality(),
                req.getDebutDate(), req.getGender(), req.getProfileImage());
        return ActorResponse.from(actor);
    }

    @Transactional
    public void delete(Long id) {
        Actor actor = getActor(id);
        actorStatsRepository.deleteById(id);
        actorRepository.delete(actor);
    }

    private Actor getActor(Long id) {
        return actorRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("배우를 찾을 수 없습니다. id=" + id));
    }
}
