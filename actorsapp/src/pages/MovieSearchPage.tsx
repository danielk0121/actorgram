import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getMovies } from '../data/dummy-bff-api'
import { MovieCard } from '../components/MovieCard'

export function MovieSearchPage({ onActorClick }: { onActorClick: (actorId: number) => void }) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const initialQ = searchParams.get('q') ?? ''
  const [query, setQuery] = useState(initialQ)
  const [search, setSearch] = useState(initialQ)

  useEffect(() => {
    const q = searchParams.get('q') ?? ''
    setQuery(q)
    setSearch(q)
  }, [searchParams])

  const result = getMovies({ q: search })

  const handleSearch = () => setSearch(query)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          placeholder="영화 제목, 장르, 감독으로 검색..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch}>검색</button>
      </div>

      {search && result.total === 0 && (
        <div className="empty-state">검색 결과가 없습니다.</div>
      )}

      {result.total > 0 && (
        <section className="result-section">
          <div className="section-title">{search ? `영화 (${result.total})` : `전체 영화 (${result.total})`}</div>
          <div className="movie-grid movie-grid--single">
            {result.items.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={() => navigate(`/movie-detail?movieId=${movie.id}`)}
                onActorClick={onActorClick}
              />
            ))}
          </div>
        </section>
      )}
    </>
  )
}
