package com.actorgram.api1.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class CastEntryRequest {

    @NotNull  private Long movieId;
    @NotNull  private Long actorId;
    @NotBlank private String role;
    @NotNull  private Boolean isMain;
    private String roleProfileImage;

    public Long getMovieId() { return movieId; }
    public void setMovieId(Long movieId) { this.movieId = movieId; }
    public Long getActorId() { return actorId; }
    public void setActorId(Long actorId) { this.actorId = actorId; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public Boolean getIsMain() { return isMain; }
    public void setIsMain(Boolean isMain) { this.isMain = isMain; }
    public String getRoleProfileImage() { return roleProfileImage; }
    public void setRoleProfileImage(String roleProfileImage) { this.roleProfileImage = roleProfileImage; }
}
