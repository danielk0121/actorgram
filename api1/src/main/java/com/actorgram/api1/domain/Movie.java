package com.actorgram.api1.domain;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "movie")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false)
    private Integer year;

    @Column(nullable = false, length = 100)
    private String genre;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String overview;

    @Column(nullable = false, length = 100)
    private String director;

    @Column(nullable = false, length = 100)
    private String writer;

    @Column(nullable = false, length = 20)
    private String ageRating;

    @Column(nullable = false)
    private Integer runtime;

    @Column(nullable = false)
    private LocalDate releaseDate;

    @Column(nullable = false, length = 50)
    private String country;

    @Column(length = 500)
    private String posterUrl;

    @Column(nullable = false, length = 20)
    private String format;

    private Integer episode;

    protected Movie() {}

    public Movie(String title, Integer year, String genre, String overview, String director,
                 String writer, String ageRating, Integer runtime, LocalDate releaseDate,
                 String country, String posterUrl, String format, Integer episode) {
        this.title = title;
        this.year = year;
        this.genre = genre;
        this.overview = overview;
        this.director = director;
        this.writer = writer;
        this.ageRating = ageRating;
        this.runtime = runtime;
        this.releaseDate = releaseDate;
        this.country = country;
        this.posterUrl = posterUrl;
        this.format = format;
        this.episode = episode;
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

    public void update(String title, Integer year, String genre, String overview, String director,
                       String writer, String ageRating, Integer runtime, LocalDate releaseDate,
                       String country, String posterUrl, String format, Integer episode) {
        this.title = title;
        this.year = year;
        this.genre = genre;
        this.overview = overview;
        this.director = director;
        this.writer = writer;
        this.ageRating = ageRating;
        this.runtime = runtime;
        this.releaseDate = releaseDate;
        this.country = country;
        this.posterUrl = posterUrl;
        this.format = format;
        this.episode = episode;
    }
}
