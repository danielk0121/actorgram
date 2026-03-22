import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SAMPLE_MOVIES } from '../data/movies'
import { SAMPLE_ACTORS } from '../data/actors'
import { ActorCard } from '../components/ActorCard'

export function ActorSearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialQ = searchParams.get('q') ?? ''
  const [query, setQuery] = useState(initialQ)
  const [search, setSearch] = useState(initialQ)

  useEffect(() => {
    const q = searchParams.get('q') ?? ''
    setQuery(q)
    setSearch(q)
  }, [searchParams])

  const q = search.toLowerCase()

  // TODO: API 서버 연동 시 fetch 호출로 교체
  const getRoleImageCount = (actorId: number) =>
    SAMPLE_MOVIES.flatMap((m) => m.cast.find((c) => c.actorId === actorId)?.roleImages ?? []).length

  const matchedActors = (
    search
      ? SAMPLE_ACTORS.filter((a) => {
          const nameMatch = a.name.toLowerCase().includes(q)
          const roleMatch = SAMPLE_MOVIES.flatMap((m) => m.cast).some(
            (c) => c.actorId === a.id && c.role.toLowerCase().includes(q)
          )
          return nameMatch || roleMatch
        })
      : SAMPLE_ACTORS
  ).sort((a, b) => getRoleImageCount(b.id) - getRoleImageCount(a.id))

  const handleSearch = () => {
    setSearch(query)
    setSearchParams({ q: query })
  }
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          placeholder="배우 이름 또는 배역 이름으로 검색..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch}>검색</button>
      </div>

      {search && matchedActors.length === 0 && (
        <div className="empty-state">검색 결과가 없습니다.</div>
      )}

      <section className="result-section">
        <div className="section-title">{search ? `검색 배우 (${matchedActors.length})` : `전체 배우 (${matchedActors.length})`}</div>
        <div className="actor-list">
          {matchedActors.map((a) => (
            <ActorCard key={a.id} actor={a} allMovies={SAMPLE_MOVIES} />
          ))}
        </div>
      </section>
    </>
  )
}
