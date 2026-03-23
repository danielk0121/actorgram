import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getMovies } from '../data/bff-api'
import type { MovieSummary } from '../data/bff-api'
import { MovieCard } from '../components/MovieCard'

export function MovieSearchPage({ onActorClick }: { onActorClick: (actorId: number) => void }) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const initialQ = searchParams.get('q') ?? ''
  const [query, setQuery] = useState(initialQ)
  const [search, setSearch] = useState(initialQ)

  const [items, setItems] = useState<MovieSummary[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  // 검색어 변경 시 목록 초기화 후 1페이지 로드
  useEffect(() => {
    setItems([])
    setPage(1)
    setTotalPages(1)
  }, [search])

  // 페이지 변경 시 로드
  useEffect(() => {
    let cancelled = false
    setLoading(true)
    getMovies({ q: search, page }).then((result) => {
      if (cancelled) return
      setTotal(result.total)
      setTotalPages(result.totalPages)
      setItems((prev) => page === 1 ? result.items : [...prev, ...result.items])
      setLoading(false)
    })
    return () => { cancelled = true }
  }, [search, page])

  // 무한스크롤 sentinel 관찰
  const setupObserver = useCallback(() => {
    if (observerRef.current) observerRef.current.disconnect()
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading) {
        setPage((prev) => {
          if (prev < totalPages) return prev + 1
          return prev
        })
      }
    }, { threshold: 0.1 })
    if (sentinelRef.current) observerRef.current.observe(sentinelRef.current)
  }, [loading, totalPages])

  useEffect(() => {
    setupObserver()
    return () => observerRef.current?.disconnect()
  }, [setupObserver])

  useEffect(() => {
    const q = searchParams.get('q') ?? ''
    setQuery(q)
    setSearch(q)
  }, [searchParams])

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

      {!loading && search && total === 0 && (
        <div className="empty-state">검색 결과가 없습니다.</div>
      )}

      {(total > 0 || loading) && (
        <section className="result-section">
          <div className="section-title">{search ? `영화 (${total})` : `전체 영화 (${total})`}</div>
          <div className="movie-grid movie-grid--single">
            {items.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={() => navigate(`/movie-detail?movieId=${movie.id}`)}
                onActorClick={onActorClick}
              />
            ))}
          </div>
          {loading && (
            <div className="spinner-wrap">
              <div className="spinner" />
            </div>
          )}
          <div ref={sentinelRef} style={{ height: 1 }} />
        </section>
      )}
    </>
  )
}
