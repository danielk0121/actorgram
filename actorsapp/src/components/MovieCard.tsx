import type { Movie } from '../types'
import { img } from '../utils/image'

export function MovieCard({ movie, search, mode, onClick, onActorClick }: {
  movie: Movie
  search: string
  mode: 'actor' | 'movie'
  onClick: () => void
  onActorClick?: (actorName: string) => void
}) {
  // 배우 화면: 검색어와 일치하는 배우의 배역만 표시
  const matchedActors = search
    ? movie.actors.filter(
        (a) =>
          a.name.toLowerCase().includes(search.toLowerCase()) ||
          a.role.toLowerCase().includes(search.toLowerCase())
      )
    : []

  // 영화 화면: 주연배우 전체 표시
  const mainActorDetails = movie.actors.filter((a) => movie.mainActors.includes(a.name))

  // 영화 화면 배우 목록: 전체 표시
  const displayActors = mainActorDetails

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
        {/* 배우 목록: 배우명+배역명+영화속 사진 3장, 1줄 */}
        {displayActors.length > 0 && (
          <div className="movie-card-actors-list">
            {displayActors.map((a) => (
              <button
                key={a.name}
                className="movie-card-actor-row"
                onClick={(e) => { e.stopPropagation(); onActorClick?.(a.name) }}
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

        {matchedActors.length > 0 && (
          <div className="movie-card-actors">
            {matchedActors.map((a) => (
              <div key={a.name} className="movie-card-actor">
                <div className="movie-card-actor-name">{a.name}</div>
                <div className="movie-card-actor-detail">{a.role}</div>
                {a.roleImages && a.roleImages.length > 0 && (
                  <div className="movie-card-role-images">
                    {a.roleImages.map((imgUrl, i) => (
                      <div key={i} className="movie-card-role-image">
                        <img src={img(imgUrl)} alt={`${a.role} ${i + 1}`} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
