import { useSearchParams, useNavigate } from 'react-router-dom'
import { SAMPLE_MOVIES } from '../data/movies'
import { img } from '../utils/image'

export function MovieDetailPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const movieTitle = searchParams.get('title') ?? '미션 임파서블'

  const movie = SAMPLE_MOVIES.find((m) => m.title === movieTitle)

  if (!movie) {
    return <div className="empty-state">영화 정보를 찾을 수 없습니다.</div>
  }

  const mainActorDetails = movie.actors.filter((a) => movie.mainActors.includes(a.name))

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
      {mainActorDetails.length > 0 && (
        <section className="result-section">
          <div className="section-title">주연배우 ({mainActorDetails.length})</div>
          <div className="movie-card-actors-list">
            {mainActorDetails.map((a) => (
              <button
                key={a.name}
                className="movie-card-actor-row"
                onClick={() => navigate(`/actor-detail?actor=${encodeURIComponent(a.name)}&movie=${encodeURIComponent(movie.title)}`)}
              >
                <div className="movie-card-actor-row-info">
                  <div className="movie-card-actor-profile">
                    {a.imageUrl
                      ? <img src={img(a.imageUrl!)} alt={a.name} />
                      : <span>{a.name[0]}</span>
                    }
                  </div>
                  <div className="movie-card-actor-name">{a.name}</div>
                  <div className="movie-card-actor-detail">{a.role} 역</div>
                </div>
                <div className="movie-card-actor-row-images">
                  {(a.roleImages && a.roleImages.length > 0 ? a.roleImages : (a.imageUrl ? [a.imageUrl] : [])).slice(0, 3).map((imgUrl, i) => (
                    <div key={i} className="movie-card-actor-row-image">
                      <img src={img(imgUrl)} alt={`${a.role} ${i + 1}`} />
                    </div>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
