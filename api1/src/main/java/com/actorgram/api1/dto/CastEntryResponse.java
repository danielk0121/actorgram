package com.actorgram.api1.dto;

import com.actorgram.api1.domain.CastEntry;

import java.util.List;
import java.util.stream.Collectors;

public class CastEntryResponse {

    private Long id;
    private Long movieId;
    private Long actorId;
    private String role;
    private Boolean isMain;
    private String roleProfileImage;
    private List<RoleImageResponse> roleImages;

    public static CastEntryResponse from(CastEntry c) {
        CastEntryResponse r = new CastEntryResponse();
        r.id = c.getId();
        r.movieId = c.getMovie().getId();
        r.actorId = c.getActor().getId();
        r.role = c.getRole();
        r.isMain = c.getIsMain();
        r.roleProfileImage = c.getRoleProfileImage();
        r.roleImages = c.getRoleImages().stream()
                .map(RoleImageResponse::from)
                .collect(Collectors.toList());
        return r;
    }

    public Long getId() { return id; }
    public Long getMovieId() { return movieId; }
    public Long getActorId() { return actorId; }
    public String getRole() { return role; }
    public Boolean getIsMain() { return isMain; }
    public String getRoleProfileImage() { return roleProfileImage; }
    public List<RoleImageResponse> getRoleImages() { return roleImages; }
}
