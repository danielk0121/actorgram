package com.actorgram.api1.dto;

import com.actorgram.api1.domain.RoleImage;

public class RoleImageResponse {

    private Long id;
    private Long castEntryId;
    private String url;
    private Integer seq;

    public static RoleImageResponse from(RoleImage ri) {
        RoleImageResponse r = new RoleImageResponse();
        r.id = ri.getId();
        r.castEntryId = ri.getCastEntry().getId();
        r.url = ri.getUrl();
        r.seq = ri.getSeq();
        return r;
    }

    public Long getId() { return id; }
    public Long getCastEntryId() { return castEntryId; }
    public String getUrl() { return url; }
    public Integer getSeq() { return seq; }
}
