import type { Movie } from '../types'
import { SAMPLE_ACTORS } from '../data/actors'
import { SAMPLE_MOVIES } from '../data/movies'
import { img } from '../utils/image'

export function MovieCard({ movie, search, mode, onClick, onActorClick }: {
  movie: Movie
  search: string
  mode: 'actor' | 'movie'
  onClick: () => void
  onActorClick?: (actorId: number) => void
}) {
  // 배우 화면: 검색어와 일치하는 배역만 표시
  const matchedCast = search
    ? movie.cast.filter((c) => {
        const actor = SAMPLE_ACTORS.find((a) => a.id === c.actorId)
        return (
          actor?.name.toLowerCase().includes(search.toLowerCase()) ||
          c.role.toLowerCase().includes(search.toLowerCase())
        )
      })
    : []

  // 영화 화면: 주연배우 전체 표시
  const mainCast = movie.cast.filter((c) => movie.mainActors.includes(c.actorId))

  if (mode === 'movie') {
    return (
      <div className="movie-card" onClick={onClick}>
        {/* 1줄: 포스터 + 영화 정보 */}
        <div className="movie-card-top-row">
          <div className="movie-card-poster">
            {movie.posterUrl
              ? <img src={img(movie.posterUrl!)} alt={movie.title} />
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
        {/* 배우 목록 */}
        {mainCast.length > 0 && (
          <div className="movie-card-actors-list">
            {mainCast.map((c) => {
              const actor = SAMPLE_ACTORS.find((a) => a.id === c.actorId)
              if (!actor) return null
              const movieCount = SAMPLE_MOVIES.filter((m) => m.cast.some((ce) => ce.actorId === actor.id)).length
              return (
                <button
                  key={c.id}
                  className="movie-card-actor-row"
                  onClick={(e) => { e.stopPropagation(); onActorClick?.(actor.id) }}
                >
                  <div className="movie-card-actor-row-info">
                    <div className="movie-card-actor-profile">
                      {actor.profileImage
                        ? <img src={img(actor.profileImage!)} alt={actor.name} />
                        : <span>{actor.name[0]}</span>
                      }
                    </div>
                    <div className="movie-card-actor-name">{actor.name}{movieCount >= 2 ? <span className="actor-movie-count"> [{movieCount}]</span> : null}</div>
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
        )}
      </div>
    )
  }

  return (
    <div className="movie-card" onClick={onClick}>
      <div className="movie-card-poster">
        {movie.posterUrl
          ? <img src={img(movie.posterUrl!)} alt={movie.title} />
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

        {matchedCast.length > 0 && (
          <div className="movie-card-actors">
            {matchedCast.map((c) => {
              const actor = SAMPLE_ACTORS.find((a) => a.id === c.actorId)
              if (!actor) return null
              return (
                <div key={c.id} className="movie-card-actor">
                  <div className="movie-card-actor-name">{actor.name}</div>
                  <div className="movie-card-actor-detail">{c.role}</div>
                  {c.roleImages && c.roleImages.length > 0 && (
                    <div className="movie-card-role-images">
                      {c.roleImages.map((imgUrl, i) => (
                        <div key={i} className="movie-card-role-image">
                          <img src={img(imgUrl)} alt={`${c.role} ${i + 1}`} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
