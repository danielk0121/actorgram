package com.actorgram.api1.domain;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "cast_entry")
public class CastEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "movie_id", nullable = false)
    private Movie movie;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "actor_id", nullable = false)
    private Actor actor;

    @Column(nullable = false, length = 100)
    private String role;

    @Column(nullable = false)
    private Boolean isMain;

    @Column(length = 500)
    private String roleProfileImage;

    @OneToMany(mappedBy = "castEntry", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("seq ASC")
    private List<RoleImage> roleImages = new ArrayList<>();

    protected CastEntry() {}

    public CastEntry(Movie movie, Actor actor, String role, Boolean isMain, String roleProfileImage) {
        this.movie = movie;
        this.actor = actor;
        this.role = role;
        this.isMain = isMain;
        this.roleProfileImage = roleProfileImage;
    }

    public Long getId() { return id; }
    public Movie getMovie() { return movie; }
    public Actor getActor() { return actor; }
    public String getRole() { return role; }
    public Boolean getIsMain() { return isMain; }
    public String getRoleProfileImage() { return roleProfileImage; }
    public List<RoleImage> getRoleImages() { return roleImages; }

    public void update(String role, Boolean isMain, String roleProfileImage) {
        this.role = role;
        this.isMain = isMain;
        this.roleProfileImage = roleProfileImage;
    }
}
