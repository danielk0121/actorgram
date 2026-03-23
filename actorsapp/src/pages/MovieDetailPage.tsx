import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { getMovieDetail } from '../data/bff-api'
import type { MovieDetailResponse } from '../data/bff-api'
import { img } from '../utils/image'

export function MovieDetailPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const movieId = Number(searchParams.get('movieId') ?? '9998')
  const [movie, setMovie] = useState<MovieDetailResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getMovieDetail(movieId).then((result) => {
      setMovie(result)
      setLoading(false)
    })
  }, [movieId])

  if (loading) {
    return <div className="spinner-wrap"><div className="spinner" /></div>
  }

  if (!movie) {
    return <div className="empty-state">영화 정보를 찾을 수 없습니다.</div>
  }

  const mainCast = movie.cast.filter((c) => c.castEntry.isMain)

  return (
    <>
      {/* 영화 기본 정보 */}
      <div className="detail-movie-header">
        <div className="detail-movie-header-poster">
          {movie.posterUrl
            ? <img src={img(movie.posterUrl)} alt={movie.title} />
            : <span>이미지 없음</span>
          }
        </div>
        <div className="detail-movie-header-info">
          <div className="detail-movie-header-title">{movie.title}</div>
          <div className="detail-meta-row"><span className="detail-meta-label">연도</span><span>{movie.year}년</span></div>
          <div className="detail-meta-row"><span className="detail-meta-label">장르</span><span>{movie.genre}</span></div>
          <div className="detail-meta-row"><span className="detail-meta-label">감독</span><span>{movie.director}</span></div>
          <div className="detail-meta-row"><span className="detail-meta-label">작가</span><span>{movie.writer}</span></div>
          <div className="detail-meta-row"><span className="detail-meta-label">관람등급</span><span>{movie.ageRating}</span></div>
          <div className="detail-meta-row"><span className="detail-meta-label">상영시간</span><span>{movie.runtime}분</span></div>
          <div className="detail-meta-row"><span className="detail-meta-label">개봉일</span><span>{movie.releaseDate}</span></div>
          <div className="detail-meta-row"><span className="detail-meta-label">제작국가</span><span>{movie.country}</span></div>
          <div className="detail-meta-row"><span className="detail-meta-label">형식</span><span>{movie.format}{movie.episode != null ? ` · ${movie.episode}화` : ''}</span></div>
        </div>
      </div>

      {/* 줄거리 */}
      <section className="result-section">
        <div className="section-title">줄거리</div>
        <p className="detail-overview">{movie.overview}</p>
      </section>

      {/* 주연배우 — BFF에서 조인 완료 */}
      {mainCast.length > 0 && (
        <section className="result-section">
          <div className="section-title">주연배우 ({mainCast.length})</div>
          <div className="movie-card-actors-list detail-actors-list">
            {mainCast.map((c) => (
              <button
                key={c.actor.id}
                className="movie-card-actor-row"
                onClick={() => navigate(`/actor-detail?actorId=${c.actor.id}`)}
              >
                <div className="movie-card-actor-row-info">
                  <div className="movie-card-actor-profile">
                    {c.actor.profileImage
                      ? <img src={img(c.actor.profileImage)} alt={c.actor.name} />
                      : <span>{c.actor.name[0]}</span>
                    }
                  </div>
                  <div className="movie-card-actor-name">{c.actor.name}{c.actor.movieCount >= 2 ? <span className="actor-movie-count"> [{c.actor.movieCount}]</span> : null}</div>
                  <div className="movie-card-actor-detail">{c.castEntry.role} 역</div>
                </div>
                <div className="movie-card-actor-row-images">
                  {c.castEntry.roleImages.length === 0
                    ? <span className="movie-card-actor-row-no-image">사진없음</span>
                    : c.castEntry.roleImages.slice(0, 3).map((imgUrl, i) => (
                        <div key={i} className="movie-card-actor-row-image">
                          <img src={img(imgUrl)} alt={`${c.castEntry.role} ${i + 1}`} />
                        </div>
                      ))
                  }
                </div>
              </button>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
