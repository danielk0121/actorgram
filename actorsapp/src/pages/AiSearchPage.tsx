import { useState } from 'react'
import type { Actor } from '../types'
import { SAMPLE_MOVIES } from '../data/movies'
import { PHOTO_SEARCH_DUMMY_ACTORS } from '../data/photoSearch'
import { ActorCard } from '../components/ActorCard'

export function AiSearchPage() {
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    // TODO: AI 프롬프트 API 연동
  }
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) handleSearch()
  }

  // TODO: API 서버 연동 시 실제 검색 결과로 교체
  const matchedActors: Actor[] = PHOTO_SEARCH_DUMMY_ACTORS.map((name) => {
    const found = SAMPLE_MOVIES.flatMap((m) => m.actors).find((a) => a.name === name)
    return found ?? { id: 0, name, role: '', birthYear: 0, nationality: '', debutDate: '' }
  }).filter((a) => a.birthYear !== 0)

  const moviesByActor = (actorName: string) =>
    SAMPLE_MOVIES.filter((m) => m.actors.some((a) => a.name === actorName))

  return (
    <>
      <div className="ai-search-wrap">
        <div className="ai-search-bar">
          <textarea
            className="ai-search-textarea"
            rows={4}
            placeholder="배우나 영화에 대해 자유롭게 질문하세요..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="ai-search-btn" onClick={handleSearch}>검색</button>
        </div>
      </div>

      {/* TODO: API 서버 연동 시 실제 인식 결과로 교체 */}
      <div className="photo-search-result-label">
        <div>샘플 검색 결과입니다.</div>
        <div>추정되는 배우: <strong>{PHOTO_SEARCH_DUMMY_ACTORS.join(', ')}</strong></div>
      </div>

      {matchedActors.length > 0 && (
        <section className="result-section">
          <div className="section-title">배우</div>
          <div className="actor-list">
            {matchedActors.map((a) => (
              <ActorCard key={a.name} actor={a} allMovies={moviesByActor(a.name)} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}
