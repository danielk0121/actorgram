import { useNavigate } from 'react-router-dom'
import type { ActorSummary, ActorFilmography } from '../data/dummy-bff-api'
import { img } from '../utils/image'

export function ActorCard({ actor }: { actor: ActorSummary & { filmography: ActorFilmography[] } }) {
  const navigate = useNavigate()

  // 배역 이미지 있는 영화 최대 3개 (BFF에서 연도 내림차순 정렬된 상태)
  const movieRoles = actor.filmography
    .filter((f) => f.castEntry.roleImages.length > 0)
    .slice(0, 3)

  return (
    <div className="actor-card">
      <button
        className="actor-card-top actor-card-top--clickable"
        onClick={() => navigate(`/actor-detail?actorId=${actor.id}`)}
      >
        <div className="actor-card-image">
          {actor.profileImage
            ? <img src={img(actor.profileImage)} alt={actor.name} />
            : <span>이미지 없음</span>
          }
        </div>
        <div className="actor-card-body">
          <div className="actor-card-name">{actor.name}{actor.movieCount >= 2 ? <span className="actor-movie-count"> [{actor.movieCount}]</span> : null}</div>
          <div className="actor-card-detail">{actor.birthYear}년생 · {actor.nationality}{actor.gender ? ` · ${actor.gender}` : ''}</div>
          <div className="actor-card-detail">데뷔 {actor.debutDate} · 영화 {actor.movieCount}개</div>
        </div>
      </button>
      {movieRoles.length > 0 && (
        <div className="actor-card-movie-roles">
          {movieRoles.map((f) => (
            <button
              key={f.movie.id}
              className="actor-card-movie-role-row actor-card-movie-role-row--clickable"
              onClick={() => navigate(`/movie-detail?movieId=${f.movie.id}`)}
            >
              <div className="actor-card-movie-poster">
                {f.movie.posterUrl
                  ? <img src={img(f.movie.posterUrl)} alt={f.movie.title} />
                  : <span>없음</span>
                }
              </div>
              <div className="actor-card-movie-role-info">
                <div className="actor-card-movie-title">{f.movie.title}</div>
                <div className="actor-card-movie-role-name">{f.movie.year}년 · {f.castEntry.role} 역</div>
                <div className="actor-card-role-thumbs">
                  {f.castEntry.roleImages.slice(0, 3).map((imgUrl, i) => (
                    <div
                      key={i}
                      className="actor-card-role-thumb"
                      onClick={(e) => { e.stopPropagation(); navigate(`/actor-detail?actorId=${actor.id}`) }}
                    >
                      <img src={img(imgUrl)} alt={`${f.castEntry.role} ${i + 1}`} />
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
