import { useNavigate } from 'react-router-dom'
import type { MovieSummary } from '../data/dummy-bff-api'
import { img } from '../utils/image'

export function MovieCard({ movie, onClick, onActorClick }: {
  movie: MovieSummary
  onClick: () => void
  onActorClick?: (actorId: number) => void
}) {
  const navigate = useNavigate()

  return (
    <div className="movie-card" onClick={onClick}>
      {/* 포스터 + 영화 정보 */}
      <div className="movie-card-top-row">
        <div className="movie-card-poster">
          {movie.posterUrl
            ? <img src={img(movie.posterUrl)} alt={movie.title} />
            : <span>이미지 없음</span>
          }
        </div>
        <div className="movie-card-info">
          <div className="movie-card-title">{movie.title}</div>
          <div className="movie-card-meta">{movie.year} · {movie.genre} · {movie.country}</div>
          <div className="movie-card-crew">감독 {movie.director}</div>
          <div className="movie-card-crew">작가 {movie.writer}</div>
          <div className="movie-card-crew">{movie.ageRating} · {movie.runtime}분</div>
          <div className="movie-card-crew">개봉 {movie.releaseDate}</div>
          <div className="movie-card-crew">{movie.format}{movie.episode != null ? ` · ${movie.episode}화` : ''}</div>
        </div>
      </div>
      {/* 주연배우 목록 — BFF에서 조인 완료 */}
      {movie.mainCast.length > 0 && (
        <div className="movie-card-actors-list">
          {movie.mainCast.map((c) => (
            <button
              key={c.actor.id}
              className="movie-card-actor-row"
              onClick={(e) => { e.stopPropagation(); onActorClick?.(c.actor.id) ?? navigate(`/actor-detail?actorId=${c.actor.id}`) }}
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
                {c.castEntry.roleImages.slice(0, 3).map((imgUrl, i) => (
                  <div key={i} className="movie-card-actor-row-image">
                    <img src={img(imgUrl)} alt={`${c.castEntry.role} ${i + 1}`} />
                  </div>
                ))}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
