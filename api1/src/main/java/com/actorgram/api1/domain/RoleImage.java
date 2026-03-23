package com.actorgram.api1.domain;

import javax.persistence.*;

@Entity
@Table(name = "role_image")
public class RoleImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cast_entry_id", nullable = false)
    private CastEntry castEntry;

    @Column(nullable = false, length = 500)
    private String url;

    @Column(nullable = false)
    private Integer seq;

    protected RoleImage() {}

    public RoleImage(CastEntry castEntry, String url, Integer seq) {
        this.castEntry = castEntry;
        this.url = url;
        this.seq = seq;
    }

    public Long getId() { return id; }
    public CastEntry getCastEntry() { return castEntry; }
    public String getUrl() { return url; }
    public Integer getSeq() { return seq; }

    public void update(String url, Integer seq) {
        this.url = url;
        this.seq = seq;
    }
}
