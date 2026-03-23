import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { getActorDetail } from '../data/dummy-bff-api'
import { img } from '../utils/image'

export function ActorDetailPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const actorId = Number(searchParams.get('actorId') ?? '1')
  const [movieSearchInput, setMovieSearchInput] = useState('')
  const [movieSearch, setMovieSearch] = useState('')
  const [sortKey, setSortKey] = useState<'year' | 'name'>('year')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  const actor = getActorDetail(actorId)

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

  const totalImageCount = actor.filmography.reduce((sum, f) => sum + f.castEntry.roleImages.length, 0)

  const filteredFilmography = actor.filmography
    .filter((f) => f.movie.title.includes(movieSearch))
    .sort((a, b) => {
      const cmp = sortKey === 'name'
        ? a.movie.title.localeCompare(b.movie.title, 'ko')
        : a.movie.year - b.movie.year
      return sortDir === 'asc' ? cmp : -cmp
    })

  return (
    <>
      {/* 배우 기본 정보 */}
      <div className="detail-actor-header">
        <div className="detail-actor-image">
          {actor.profileImage
            ? <img src={img(actor.profileImage)} alt={actor.name} />
            : <span>이미지 없음</span>
          }
        </div>
        <div className="detail-actor-info">
          <div className="detail-actor-name">{actor.name}{actor.filmography.length >= 2 ? <span className="actor-movie-count"> [{actor.filmography.length}]</span> : null}</div>
          <div className="detail-meta-row"><span className="detail-meta-label">출생연도</span><span>{actor.birthYear}년</span></div>
          <div className="detail-meta-row"><span className="detail-meta-label">국적</span><span>{actor.nationality}</span></div>
          {actor.gender && <div className="detail-meta-row"><span className="detail-meta-label">성별</span><span>{actor.gender}</span></div>}
          <div className="detail-meta-row"><span className="detail-meta-label">데뷔일</span><span>{actor.debutDate}</span></div>
        </div>
      </div>

      {/* 영화 속 이미지 (영화별 그룹) */}
      <section className="result-section">
        <div className="section-title">영화 속 이미지 · 이미지 {totalImageCount}개 · 영화 {actor.filmography.length}개</div>

        {actor.filmography.length === 0
          ? <div className="empty-state">출연 영화 정보가 없습니다.</div>
          : <>
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

          {filteredFilmography.length === 0
            ? <div className="empty-state">검색 결과가 없습니다.</div>
            : (
              <div className="detail-movie-role-groups">
                {filteredFilmography.map((f) => (
                  <div key={f.movie.id} className="detail-movie-role-group">
                    <div className="detail-movie-role-group-header-wrap">
                      <button
                        className="detail-movie-role-group-header detail-movie-role-group-header--clickable"
                        onClick={() => navigate(`/movie-detail?movieId=${f.movie.id}`)}
                      >
                        <div className="detail-movie-role-group-poster">
                          {f.movie.posterUrl
                            ? <img src={img(f.movie.posterUrl)} alt={f.movie.title} />
                            : <span>이미지 없음</span>
                          }
                        </div>
                        <div className="detail-movie-role-group-info">
                          <span className="detail-movie-role-group-title">{f.movie.title}</span>
                          <span className="detail-movie-role-group-meta">{f.movie.year} · {f.movie.genre} · 배역: {f.castEntry.role}</span>
                        </div>
                      </button>
                    </div>
                    <div className="detail-movie-role-group-images-wrap">
                      {f.castEntry.roleImages.length === 0
                        ? <div className="empty-state">이미지가 없어요</div>
                        : <div className="detail-role-images-grid">
                          {f.castEntry.roleImages.slice(0, 9).map((imgUrl, i) => {
                            const isLast = i === 8 && f.castEntry.roleImages.length > 9
                            return (
                              <div key={i} className={`detail-role-image-item${isLast ? ' detail-role-image-item--more' : ''}`}>
                                <img src={img(imgUrl)} alt={`${actor.name} ${i + 1}`} />
                                {isLast && (
                                  <div className="detail-role-image-more-overlay">+{f.castEntry.roleImages.length - 9}</div>
                                )}
                              </div>
                            )
                          })}
                        </div>}
                    </div>
                  </div>
                ))}
              </div>
            )
          }
          </>}
      </section>
    </>
  )
}
