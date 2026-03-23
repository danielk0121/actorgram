package com.actorgram.api1.dto;

import com.actorgram.api1.domain.Movie;

import java.time.LocalDate;

public class MovieResponse {

    private Long id;
    private String title;
    private Integer year;
    private String genre;
    private String overview;
    private String director;
    private String writer;
    private String ageRating;
    private Integer runtime;
    private LocalDate releaseDate;
    private String country;
    private String posterUrl;
    private String format;
    private Integer episode;

    public static MovieResponse from(Movie m) {
        MovieResponse r = new MovieResponse();
        r.id = m.getId();
        r.title = m.getTitle();
        r.year = m.getYear();
        r.genre = m.getGenre();
        r.overview = m.getOverview();
        r.director = m.getDirector();
        r.writer = m.getWriter();
        r.ageRating = m.getAgeRating();
        r.runtime = m.getRuntime();
        r.releaseDate = m.getReleaseDate();
        r.country = m.getCountry();
        r.posterUrl = m.getPosterUrl();
        r.format = m.getFormat();
        r.episode = m.getEpisode();
        return r;
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public Integer getYear() { return year; }
    public String getGenre() { return genre; }
    public String getOverview() { return overview; }
    public String getDirector() { return director; }
    public String getWriter() { return writer; }
    public String getAgeRating() { return ageRating; }
    public Integer getRuntime() { return runtime; }
    public LocalDate getReleaseDate() { return releaseDate; }
    public String getCountry() { return country; }
    public String getPosterUrl() { return posterUrl; }
    public String getFormat() { return format; }
    public Integer getEpisode() { return episode; }
}
