import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getActors, getActorDetail } from '../data/dummy-bff-api'
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

  const result = getActors({ q: search })

  // ActorCard에 filmography 포함해서 전달 (BFF 조인)
  const actorsWithFilmography = result.items.map((a) => ({
    ...a,
    filmography: getActorDetail(a.id)?.filmography ?? [],
  }))

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

      {search && result.total === 0 && (
        <div className="empty-state">검색 결과가 없습니다.</div>
      )}

      <section className="result-section">
        <div className="section-title">{search ? `검색 배우 (${result.total})` : `전체 배우 (${result.total})`}</div>
        <div className="actor-list">
          {actorsWithFilmography.map((a) => (
            <ActorCard key={a.id} actor={a} />
          ))}
        </div>
      </section>
    </>
  )
}
