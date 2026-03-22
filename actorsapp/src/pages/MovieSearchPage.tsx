import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { SAMPLE_MOVIES } from '../data/movies'
import { MovieCard } from '../components/MovieCard'

export function MovieSearchPage({ onActorClick }: { onActorClick: (actorName: string) => void }) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const initialQ = searchParams.get('q') ?? ''
  const [query, setQuery] = useState(initialQ)
  const [search, setSearch] = useState(initialQ)

  // URL 쿼리 파라미터 변경 시 검색어 반영 (배우 화면 영화 클릭 등)
  useEffect(() => {
    const q = searchParams.get('q') ?? ''
    setQuery(q)
    setSearch(q)
  }, [searchParams])

  const q = search.toLowerCase()

  // TODO: API 서버 연동 시 fetch 호출로 교체
  const filteredMovies = SAMPLE_MOVIES
    .filter((m) =>
      m.title.toLowerCase().includes(q) ||
      m.genre.toLowerCase().includes(q) ||
      m.director.toLowerCase().includes(q)
    )
    .sort((a, b) => b.id - a.id)

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

      {search && filteredMovies.length === 0 && (
        <div className="empty-state">검색 결과가 없습니다.</div>
      )}

      {filteredMovies.length > 0 && (
        <section className="result-section">
          <div className="section-title">{search ? `영화 (${filteredMovies.length})` : `전체 영화 (${filteredMovies.length})`}</div>
          <div className="movie-grid movie-grid--single">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} search={search} mode="movie" onClick={() => navigate(`/movie-detail?title=${encodeURIComponent(movie.title)}`)} onActorClick={onActorClick} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}
