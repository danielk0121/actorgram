package com.actorgram.api1.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

public class MovieRequest {

    @NotBlank private String title;
    @NotNull  private Integer year;
    @NotBlank private String genre;
    @NotBlank private String overview;
    @NotBlank private String director;
    @NotBlank private String writer;
    @NotBlank private String ageRating;
    @NotNull  private Integer runtime;
    @NotNull  private LocalDate releaseDate;
    @NotBlank private String country;
    private String posterUrl;
    @NotBlank private String format;
    private Integer episode;

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public Integer getYear() { return year; }
    public void setYear(Integer year) { this.year = year; }
    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }
    public String getOverview() { return overview; }
    public void setOverview(String overview) { this.overview = overview; }
    public String getDirector() { return director; }
    public void setDirector(String director) { this.director = director; }
    public String getWriter() { return writer; }
    public void setWriter(String writer) { this.writer = writer; }
    public String getAgeRating() { return ageRating; }
    public void setAgeRating(String ageRating) { this.ageRating = ageRating; }
    public Integer getRuntime() { return runtime; }
    public void setRuntime(Integer runtime) { this.runtime = runtime; }
    public LocalDate getReleaseDate() { return releaseDate; }
    public void setReleaseDate(LocalDate releaseDate) { this.releaseDate = releaseDate; }
    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }
    public String getPosterUrl() { return posterUrl; }
    public void setPosterUrl(String posterUrl) { this.posterUrl = posterUrl; }
    public String getFormat() { return format; }
    public void setFormat(String format) { this.format = format; }
    public Integer getEpisode() { return episode; }
    public void setEpisode(Integer episode) { this.episode = episode; }
}
