import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { SAMPLE_MOVIES } from '../data/movies'
import { img } from '../utils/image'

export function ActorDetailPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const actorName = searchParams.get('actor') ?? '톰 크루즈'
  const initialMovie = searchParams.get('movie') ?? ''
  const [movieSearchInput, setMovieSearchInput] = useState(initialMovie)
  const [movieSearch, setMovieSearch] = useState(initialMovie)
  const [sortKey, setSortKey] = useState<'year' | 'name'>('year')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  const actor = SAMPLE_MOVIES.flatMap((m) => m.actors).find((a) => a.name === actorName)

  const movies = SAMPLE_MOVIES.filter((m) => m.actors.some((a) => a.name === actorName))

  if (!actor) {
    return <div className="empty-state">배우 정보를 찾을 수 없습니다.</div>
  }

  const toggleSort = (key: 'year' | 'name') => {
    if (sortKey === key) {
      setSortDir((d) => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const filteredMovies = movies
    .filter((m) => m.title.includes(movieSearch))
    .sort((a, b) => {
      const cmp = sortKey === 'name'
        ? a.title.localeCompare(b.title, 'ko')
        : a.year - b.year
      return sortDir === 'asc' ? cmp : -cmp
    })

  return (
    <>
      {/* 배우 기본 정보 */}
      <div className="detail-actor-header">
        <div className="detail-actor-image">
          {actor.imageUrl
            ? <img src={img(actor.imageUrl!)} alt={actor.name} />
            : <span>이미지 없음</span>
          }
        </div>
        <div className="detail-actor-info">
          <div className="detail-actor-name">{actor.name}</div>
          <div className="detail-meta-row"><span className="detail-meta-label">출생연도</span><span>{actor.birthYear}년</span></div>
          <div className="detail-meta-row"><span className="detail-meta-label">국적</span><span>{actor.nationality}</span></div>
          {actor.gender && <div className="detail-meta-row"><span className="detail-meta-label">성별</span><span>{actor.gender}</span></div>}
          <div className="detail-meta-row"><span className="detail-meta-label">데뷔일</span><span>{actor.debutDate}</span></div>
        </div>
      </div>

      {/* 영화 속 이미지 (영화별 그룹) */}
      {movies.length > 0 && (
        <section className="result-section">
          <div className="section-title">영화 속 이미지 · 이미지 {movies.reduce((sum, m) => sum + (m.actors.find((a) => a.name === actorName)?.roleImages?.length ?? 0), 0)}개 · 영화 {movies.length}개</div>

          {/* 검색 + 정렬 */}
          <div className="detail-movie-filter">
            <div className="detail-movie-search-bar">
              <input
                className="detail-movie-search"
                type="text"
                placeholder="영화 제목 검색..."
                value={movieSearchInput}
                onChange={(e) => setMovieSearchInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') setMovieSearch(movieSearchInput) }}
              />
              <button
                className="detail-movie-search-btn"
                onClick={() => setMovieSearch(movieSearchInput)}
              >검색</button>
            </div>
            <div className="detail-movie-sort">
              <button
                className={`detail-movie-sort-btn${sortKey === 'year' ? ' detail-movie-sort-btn--active' : ''}`}
                onClick={() => toggleSort('year')}
              >연도{sortKey === 'year' ? (sortDir === 'asc' ? '↑' : '↓') : ''}</button>
              <button
                className={`detail-movie-sort-btn${sortKey === 'name' ? ' detail-movie-sort-btn--active' : ''}`}
                onClick={() => toggleSort('name')}
              >영화제목{sortKey === 'name' ? (sortDir === 'asc' ? '↑' : '↓') : ''}</button>
            </div>
          </div>

          {filteredMovies.length === 0
            ? <div className="empty-state">검색 결과가 없습니다.</div>
            : (
              <div className="detail-movie-role-groups">
                {filteredMovies.map((m) => {
                  const a = m.actors.find((a) => a.name === actorName)
                  if (!a) return null
                  return (
                    <div key={m.id} className="detail-movie-role-group">
                      {/* 영화 정보 1줄 - 클릭 시 영화 상세로 이동 */}
                      <button
                        className="detail-movie-role-group-header detail-movie-role-group-header--clickable"
                        onClick={() => navigate(`/movie-detail?title=${encodeURIComponent(m.title)}`)}
                      >
                        <div className="detail-movie-role-group-poster">
                          {m.posterUrl
                            ? <img src={img(m.posterUrl!)} alt={m.title} />
                            : <span>이미지 없음</span>
                          }
                        </div>
                        <div className="detail-movie-role-group-info">
                          <span className="detail-movie-role-group-title">{m.title}</span>
                          <span className="detail-movie-role-group-meta">{m.year} · {m.genre} · 배역: {a.role}</span>
                        </div>
                      </button>
                      {/* 이미지 바둑판 (최대 9장, 초과 시 마지막 칸에 +N 표시) */}
                      <div className="detail-role-images-grid">
                        {a.roleImages.slice(0, 9).map((imgUrl, i) => {
                          const isLast = i === 8 && a.roleImages!.length > 9
                          return (
                            <div key={i} className={`detail-role-image-item${isLast ? ' detail-role-image-item--more' : ''}`}>
                              <img src={img(imgUrl)} alt={`${actor.name} ${i + 1}`} />
                              {isLast && (
                                <div className="detail-role-image-more-overlay">+{a.roleImages!.length - 9}</div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          }
        </section>
      )}
    </>
  )
}
