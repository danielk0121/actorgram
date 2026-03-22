import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { Actor } from '../types'
import { SAMPLE_MOVIES } from '../data/movies'
import { ActorCard } from '../components/ActorCard'

export function ActorSearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialQ = searchParams.get('q') ?? ''
  const [query, setQuery] = useState(initialQ)
  const [search, setSearch] = useState(initialQ)

  // URL 쿼리 파라미터 변경 시 검색어 반영 (영화 화면 배우 클릭 등)
  useEffect(() => {
    const q = searchParams.get('q') ?? ''
    setQuery(q)
    setSearch(q)
  }, [searchParams])

  const q = search.toLowerCase()

  // TODO: API 서버 연동 시 fetch 호출로 교체
  // 배우별 전체 roleImages 수 계산 (영화 중복 출연 합산)
  const getRoleImageCount = (actorName: string) =>
    SAMPLE_MOVIES.flatMap((m) => m.actors.find((a) => a.name === actorName)?.roleImages ?? []).length

  const sortByImages = (actors: Actor[]) =>
    [...actors].sort((a, b) => getRoleImageCount(b.name) - getRoleImageCount(a.name))

  // 검색어가 있으면 배우명/배역명 필터, 없으면 전체 배우
  const allActors: Actor[] = Array.from(
    new Map(
      SAMPLE_MOVIES.flatMap((m) => m.actors).map((a) => [a.name, a])
    ).values()
  )

  const matchedActors: Actor[] = sortByImages(
    search
      ? Array.from(
          new Map(
            SAMPLE_MOVIES
              .flatMap((m) => m.actors)
              .filter((a) => a.name.toLowerCase().includes(q) || a.role.toLowerCase().includes(q))
              .map((a) => [a.name, a])
          ).values()
        )
      : allActors
  )

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
            <ActorCard key={a.name} actor={a} allMovies={SAMPLE_MOVIES} />
          ))}
        </div>
      </section>
    </>
  )
}
