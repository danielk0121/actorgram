import { useNavigate } from 'react-router-dom'
import type { Actor, Movie } from '../types'
import { img } from '../utils/image'

export function ActorCard({ actor, allMovies }: { actor: Actor; allMovies: Movie[] }) {
  // 배우가 출연한 전체 영화 수
  const totalMovieCount = allMovies.filter((m) => m.actors.some((a) => a.name === actor.name)).length

  // 배우가 출연한 영화 + 해당 배역 정보 (roleImages 있는 것만, 연도 내림차순, 최대 3개)
  const movieRoles = allMovies
    .flatMap((m) => {
      const a = m.actors.find((a) => a.name === actor.name)
      if (!a || !a.roleImages || a.roleImages.length === 0) return []
      return [{ movie: m, actorInMovie: a }]
    })
    .sort((a, b) => b.movie.year - a.movie.year)
    .slice(0, 3)

  const navigate = useNavigate()

  return (
    <div className="actor-card">
      <button
        className="actor-card-top actor-card-top--clickable"
        onClick={() => navigate(`/actor-detail?actor=${encodeURIComponent(actor.name)}`)}
      >
        <div className="actor-card-image">
          {actor.imageUrl
            ? <img src={img(actor.imageUrl!)} alt={actor.name} />
            : <span>이미지 없음</span>
          }
        </div>
        <div className="actor-card-body">
          <div className="actor-card-name">{actor.name}</div>
          <div className="actor-card-detail">{actor.birthYear}년생 · {actor.nationality}{actor.gender ? ` · ${actor.gender}` : ''}</div>
          <div className="actor-card-detail">데뷔 {actor.debutDate} · 영화 {totalMovieCount}개</div>
        </div>
      </button>
      {movieRoles.length > 0 && (
        <div className="actor-card-movie-roles">
          {movieRoles.map(({ movie, actorInMovie }) => (
            <button
              key={movie.id}
              className="actor-card-movie-role-row actor-card-movie-role-row--clickable"
              onClick={() => navigate(`/movie-detail?title=${encodeURIComponent(movie.title)}`)}
            >
              <div className="actor-card-movie-poster">
                {movie.posterUrl
                  ? <img src={img(movie.posterUrl!)} alt={movie.title} />
                  : <span>없음</span>
                }
              </div>
              <div className="actor-card-movie-role-info">
                <div className="actor-card-movie-title">{movie.title}</div>
                <div className="actor-card-movie-role-name">{movie.year}년 · {actorInMovie.role} 역</div>
                <div className="actor-card-role-thumbs">
                  {actorInMovie.roleImages!.slice(0, 3).map((imgUrl, i) => (
                    <div
                      key={i}
                      className="actor-card-role-thumb"
                      onClick={(e) => { e.stopPropagation(); navigate(`/actor-detail?actor=${encodeURIComponent(actor.name)}`) }}
                    >
                      <img src={img(imgUrl)} alt={`${actorInMovie.role} ${i + 1}`} />
                    </div>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
