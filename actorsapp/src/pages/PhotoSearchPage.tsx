import { useState, useEffect } from 'react'
import { getActors } from '../data/bff-api'
import type { ActorSummary } from '../data/bff-api'
import { PHOTO_SEARCH_DUMMY_ACTORS } from '../data/photoSearch'
import { ActorCard } from '../components/ActorCard'

export function PhotoSearchPage() {
  const [preview, setPreview] = useState<string | null>(null)
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

  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file)
    setPreview(url)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  return (
    <>
      <div className="photo-search-wrap">
        <div
          className={`photo-search-dropzone${preview ? ' photo-search-dropzone--preview' : ''}`}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {preview
            ? <img src={preview} alt="업로드된 사진" className="photo-search-preview" />
            : (
              <>
                <div className="photo-search-icon">🖼</div>
                <div className="photo-search-label">사진을 드래그하거나 클릭하여 업로드</div>
                <div className="photo-search-sub">배우 또는 영화를 사진으로 검색합니다</div>
              </>
            )
          }
          <input
            type="file"
            accept="image/*"
            className="photo-search-input"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
          />
        </div>
        <button className="ai-search-btn">검색</button>
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
