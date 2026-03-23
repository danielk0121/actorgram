package com.actorgram.api1.domain;

import javax.persistence.*;

@Entity
@Table(name = "actor_stats")
public class ActorStats {

    @Id
    private Long actorId;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "actor_id")
    private Actor actor;

    @Column(nullable = false)
    private Integer movieCount = 0;

    protected ActorStats() {}

    public ActorStats(Actor actor) {
        this.actor = actor;
        this.movieCount = 0;
    }

    public Long getActorId() { return actorId; }
    public Actor getActor() { return actor; }
    public Integer getMovieCount() { return movieCount; }

    public void increment() { this.movieCount++; }
    public void decrement() { if (this.movieCount > 0) this.movieCount--; }
    public void setMovieCount(Integer movieCount) { this.movieCount = movieCount; }
}
