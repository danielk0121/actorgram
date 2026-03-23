package com.actorgram.api1.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class RoleImageRequest {

    @NotBlank private String url;
    @NotNull  private Integer seq;

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
    public Integer getSeq() { return seq; }
    public void setSeq(Integer seq) { this.seq = seq; }
}
