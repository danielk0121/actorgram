import { useNavigate } from 'react-router-dom'
import type { Actor, Movie } from '../types'
import { img } from '../utils/image'

export function ActorCard({ actor, allMovies }: { actor: Actor; allMovies: Movie[] }) {
  const totalMovieCount = allMovies.filter((m) => m.cast.some((c) => c.actorId === actor.id)).length

  // 배역 이미지 있는 영화 최대 3개, 연도 내림차순
  const movieRoles = allMovies
    .flatMap((m) => {
      const c = m.cast.find((c) => c.actorId === actor.id)
      if (!c || !c.roleImages || c.roleImages.length === 0) return []
      return [{ movie: m, cast: c }]
    })
    .sort((a, b) => b.movie.year - a.movie.year)
    .slice(0, 3)

  const navigate = useNavigate()

  return (
    <div className="actor-card">
      <button
        className="actor-card-top actor-card-top--clickable"
        onClick={() => navigate(`/actor-detail?actorId=${actor.id}`)}
      >
        <div className="actor-card-image">
          {actor.profileImage
            ? <img src={img(actor.profileImage!)} alt={actor.name} />
            : <span>이미지 없음</span>
          }
        </div>
        <div className="actor-card-body">
          <div className="actor-card-name">{actor.name}{totalMovieCount >= 2 ? <span className="actor-movie-count"> [{totalMovieCount}]</span> : null}</div>
          <div className="actor-card-detail">{actor.birthYear}년생 · {actor.nationality}{actor.gender ? ` · ${actor.gender}` : ''}</div>
          <div className="actor-card-detail">데뷔 {actor.debutDate} · 영화 {totalMovieCount}개</div>
        </div>
      </button>
      {movieRoles.length > 0 && (
        <div className="actor-card-movie-roles">
          {movieRoles.map(({ movie, cast }) => (
            <button
              key={movie.id}
              className="actor-card-movie-role-row actor-card-movie-role-row--clickable"
              onClick={() => navigate(`/movie-detail?movieId=${movie.id}`)}
            >
              <div className="actor-card-movie-poster">
                {movie.posterUrl
                  ? <img src={img(movie.posterUrl!)} alt={movie.title} />
                  : <span>없음</span>
                }
              </div>
              <div className="actor-card-movie-role-info">
                <div className="actor-card-movie-title">{movie.title}</div>
                <div className="actor-card-movie-role-name">{movie.year}년 · {cast.role} 역</div>
                <div className="actor-card-role-thumbs">
                  {cast.roleImages!.slice(0, 3).map((imgUrl, i) => (
                    <div
                      key={i}
                      className="actor-card-role-thumb"
                      onClick={(e) => { e.stopPropagation(); navigate(`/actor-detail?actorId=${actor.id}`) }}
                    >
                      <img src={img(imgUrl)} alt={`${cast.role} ${i + 1}`} />
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
