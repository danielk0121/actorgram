import { useSearchParams, useNavigate } from 'react-router-dom'
import { SAMPLE_MOVIES } from '../data/movies'
import { SAMPLE_ACTORS } from '../data/actors'
import { img } from '../utils/image'

// 배우의 출연 영화 수 계산
const movieCountByActor = (actorId: number) =>
  SAMPLE_MOVIES.filter((m) => m.cast.some((c) => c.actorId === actorId)).length

export function MovieDetailPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const movieId = Number(searchParams.get('movieId') ?? '19')

  const movie = SAMPLE_MOVIES.find((m) => m.id === movieId)

  if (!movie) {
    return <div className="empty-state">영화 정보를 찾을 수 없습니다.</div>
  }

  const mainCast = movie.cast.filter((c) => movie.mainActors.includes(c.actorId))

  return (
    <>
      {/* 영화 기본 정보 */}
      <div className="detail-movie-header">
        <div className="detail-movie-header-poster">
          {movie.posterUrl
            ? <img src={img(movie.posterUrl!)} alt={movie.title} />
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

      {/* 주연배우 */}
      {mainCast.length > 0 && (
        <section className="result-section">
          <div className="section-title">주연배우 ({mainCast.length})</div>
          <div className="movie-card-actors-list">
            {mainCast.map((c) => {
              const actor = SAMPLE_ACTORS.find((a) => a.id === c.actorId)
              if (!actor) return null
              return (
                <button
                  key={c.id}
                  className="movie-card-actor-row"
                  onClick={() => navigate(`/actor-detail?actorId=${actor.id}`)}
                >
                  <div className="movie-card-actor-row-info">
                    <div className="movie-card-actor-profile">
                      {actor.profileImage
                        ? <img src={img(actor.profileImage!)} alt={actor.name} />
                        : <span>{actor.name[0]}</span>
                      }
                    </div>
                    <div className="movie-card-actor-name">{actor.name}{movieCountByActor(actor.id) >= 2 ? <span className="actor-movie-count"> [{movieCountByActor(actor.id)}]</span> : null}</div>
                    <div className="movie-card-actor-detail">{c.role} 역</div>
                  </div>
                  <div className="movie-card-actor-row-images">
                    {(c.roleImages ?? []).slice(0, 3).map((imgUrl, i) => (
                      <div key={i} className="movie-card-actor-row-image">
                        <img src={img(imgUrl)} alt={`${c.role} ${i + 1}`} />
                      </div>
                    ))}
                  </div>
                </button>
              )
            })}
          </div>
        </section>
      )}
    </>
  )
}
