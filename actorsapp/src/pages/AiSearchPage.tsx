import { useState, useEffect } from 'react'
import { getActors } from '../data/dummy-bff-api'
import type { ActorSummary } from '../data/dummy-bff-api'
import { PHOTO_SEARCH_DUMMY_ACTORS } from '../data/photoSearch'
import { ActorCard } from '../components/ActorCard'

export function AiSearchPage() {
  const [query, setQuery] = useState('')
  const [matchedActors, setMatchedActors] = useState<ActorSummary[]>([])

  useEffect(() => {
    // 각 이름으로 검색해서 첫 번째 결과 수집
    Promise.all(
      PHOTO_SEARCH_DUMMY_ACTORS.map((name) => getActors({ q: name, page: 1 }))
    ).then((results) => {
      const matched = results
        .map((r, i) => r.items.find((a) => a.name === PHOTO_SEARCH_DUMMY_ACTORS[i]))
        .filter((a): a is ActorSummary => a != null)
      setMatchedActors(matched)
    })
  }, [])

  const handleSearch = () => {
    // TODO: AI 프롬프트 API 연동
  }
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) handleSearch()
  }

  return (
    <>
      <div className="ai-search-wrap">
        <div className="ai-search-bar">
          <textarea
            className="ai-search-textarea"
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
              <ActorCard key={a.id} actor={a} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}
