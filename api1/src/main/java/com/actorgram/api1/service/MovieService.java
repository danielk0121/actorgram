package com.actorgram.api1.service;

import com.actorgram.api1.domain.Movie;
import com.actorgram.api1.dto.MovieRequest;
import com.actorgram.api1.dto.MovieResponse;
import com.actorgram.api1.repository.MovieRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class MovieService {

    private final MovieRepository movieRepository;

    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public List<MovieResponse> findAll() {
        return movieRepository.findAll().stream()
                .map(MovieResponse::from)
                .collect(Collectors.toList());
    }

    public MovieResponse findById(Long id) {
        return MovieResponse.from(getMovie(id));
    }

    @Transactional
    public MovieResponse create(MovieRequest req) {
        Movie movie = new Movie(req.getTitle(), req.getYear(), req.getGenre(), req.getOverview(),
                req.getDirector(), req.getWriter(), req.getAgeRating(), req.getRuntime(),
                req.getReleaseDate(), req.getCountry(), req.getPosterUrl(),
                req.getFormat(), req.getEpisode());
        movieRepository.save(movie);
        return MovieResponse.from(movie);
    }

    @Transactional
    public MovieResponse update(Long id, MovieRequest req) {
        Movie movie = getMovie(id);
        movie.update(req.getTitle(), req.getYear(), req.getGenre(), req.getOverview(),
                req.getDirector(), req.getWriter(), req.getAgeRating(), req.getRuntime(),
                req.getReleaseDate(), req.getCountry(), req.getPosterUrl(),
                req.getFormat(), req.getEpisode());
        return MovieResponse.from(movie);
    }

    @Transactional
    public void delete(Long id) {
        movieRepository.delete(getMovie(id));
    }

    private Movie getMovie(Long id) {
        return movieRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("영화를 찾을 수 없습니다. id=" + id));
    }
}
