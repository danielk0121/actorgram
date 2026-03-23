/**
 * Dummy BFF API
 *
 * actors.ts / movies.ts 를 파일 DB로 사용하는 더미 BFF(Backend For Frontend) 구현.
 * 실제 API 서버 연동 시 이 파일의 함수들을 fetch() 호출로 교체한다.
 *
 * BFF 역할:
 *   - DB(actors.ts, movies.ts) 조인/집계를 서버 측에서 처리
 *   - 프론트가 역방향 조회(SAMPLE_ACTORS.find 등)를 하지 않아도 되는 포맷으로 응답
 *   - 페이징 처리
 */

import { SAMPLE_ACTORS } from './actors'
import { SAMPLE_MOVIES } from './movies'

// ----------------------------------------------------------------
// BFF 응답 타입 (프론트 친화적 포맷)
// ----------------------------------------------------------------

export interface ActorFilmography {
  movieId: number
  movieTitle: string
  movieYear: number
  movieGenre: string
  posterUrl?: string
  role: string
  roleImages: string[]
}

export interface ActorSummary {
  id: number
  name: string
  birthYear: number
  nationality: string
  debutDate: string
  gender?: '남' | '여'
  profileImage?: string
  movieCount: number          // BFF 집계
  roleImageCount: number      // BFF 집계 (정렬 기준)
  filmography: ActorFilmography[]  // BFF 조인 (N+1 방지)
}

export interface ActorDetailResponse {
  id: number
  name: string
  birthYear: number
  nationality: string
  debutDate: string
  gender?: '남' | '여'
  profileImage?: string
  filmography: ActorFilmography[]   // BFF 조인: Movie + CastEntry
}

export interface CastMember {
  actorId: number
  actorName: string             // BFF 조인
  actorProfileImage?: string    // BFF 조인
  movieCount: number            // BFF 집계 (전체 출연 작품 수)
  role: string
  roleProfileImage?: string
  roleImages: string[]
  isMain: boolean               // BFF 집계
}

export interface MovieSummary {
  id: number
  title: string
  year: number
  genre: string
  director: string
  writer: string
  ageRating: string
  runtime: number
  releaseDate: string
  country: string
  posterUrl?: string
  format: '단편' | '시리즈'
  episode?: number
  mainCast: CastMember[]        // BFF 조인: 주연배우만
}

export interface MovieDetailResponse {
  id: number
  title: string
  year: number
  genre: string
  overview: string
  director: string
  writer: string
  ageRating: string
  runtime: number
  releaseDate: string
  country: string
  posterUrl?: string
  format: '단편' | '시리즈'
  episode?: number
  cast: CastMember[]            // BFF 조인: 전체 출연진
}

export interface PagedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// ----------------------------------------------------------------
// API 함수
// ----------------------------------------------------------------

const PAGE_SIZE = 20

/**
 * GET /actors
 * 배우 목록. 검색어로 이름/배역명 필터, roleImageCount 기준 내림차순 정렬, 페이징.
 */
export function getActors(params: {
  q?: string
  page?: number
}): PagedResponse<ActorSummary> {
  const q = (params.q ?? '').toLowerCase()
  const page = params.page ?? 1

  // DB 조인: 배우별 통계 + filmography 사전 구성 (루프 1회)
  const actorStats = new Map<number, { movieCount: number; roleImageCount: number }>()
  const actorFilmography = new Map<number, ActorFilmography[]>()
  for (const movie of SAMPLE_MOVIES) {
    for (const c of movie.cast) {
      const prev = actorStats.get(c.actorId) ?? { movieCount: 0, roleImageCount: 0 }
      actorStats.set(c.actorId, {
        movieCount: prev.movieCount + 1,
        roleImageCount: prev.roleImageCount + (c.roleImages?.length ?? 0),
      })
      const films = actorFilmography.get(c.actorId) ?? []
      films.push({
        movieId: movie.id,
        movieTitle: movie.title,
        movieYear: movie.year,
        movieGenre: movie.genre,
        posterUrl: movie.posterUrl,
        role: c.role,
        roleImages: c.roleImages ?? [],
      })
      actorFilmography.set(c.actorId, films)
    }
  }
  // filmography 연도 내림차순 정렬
  for (const films of actorFilmography.values()) {
    films.sort((a, b) => b.movieYear - a.movieYear)
  }

  // 검색 필터
  const filtered = SAMPLE_ACTORS.filter((a) => {
    if (!q) return true
    if (a.name.toLowerCase().includes(q)) return true
    // 배역명 검색: 집계된 인덱스 대신 역방향 조회 — BFF이므로 서버 부담
    return SAMPLE_MOVIES.some((m) =>
      m.cast.some((c) => c.actorId === a.id && c.role.toLowerCase().includes(q))
    )
  })

  // 정렬 (roleImageCount 내림차순)
  const sorted = [...filtered].sort((a, b) => {
    const statA = actorStats.get(a.id)?.roleImageCount ?? 0
    const statB = actorStats.get(b.id)?.roleImageCount ?? 0
    return statB - statA
  })

  // 페이징
  const total = sorted.length
  const totalPages = Math.ceil(total / PAGE_SIZE)
  const sliced = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const items: ActorSummary[] = sliced.map((a) => ({
    ...a,
    movieCount: actorStats.get(a.id)?.movieCount ?? 0,
    roleImageCount: actorStats.get(a.id)?.roleImageCount ?? 0,
    filmography: actorFilmography.get(a.id) ?? [],
  }))

  return { items, total, page, pageSize: PAGE_SIZE, totalPages }
}

/**
 * GET /actors/:actorId
 * 배우 상세 + 필모그래피 (연도 내림차순).
 * cast 조인 완료 — 프론트는 역방향 조회 불필요.
 */
export function getActorDetail(actorId: number): ActorDetailResponse | null {
  const actor = SAMPLE_ACTORS.find((a) => a.id === actorId)
  if (!actor) return null

  const filmography: ActorFilmography[] = SAMPLE_MOVIES
    .flatMap((m) => {
      const c = m.cast.find((c) => c.actorId === actorId)
      if (!c) return []
      return [{
        movieId: m.id,
        movieTitle: m.title,
        movieYear: m.year,
        movieGenre: m.genre,
        posterUrl: m.posterUrl,
        role: c.role,
        roleImages: c.roleImages ?? [],
      }]
    })
    .sort((a, b) => b.movieYear - a.movieYear)

  return { ...actor, filmography }
}

/**
 * GET /movies
 * 영화 목록. 검색어로 제목/장르/감독 필터, 페이징.
 * 주연배우 정보 조인 완료 — 프론트는 SAMPLE_ACTORS.find 불필요.
 */
export function getMovies(params: {
  q?: string
  page?: number
}): PagedResponse<MovieSummary> {
  const q = (params.q ?? '').toLowerCase()
  const page = params.page ?? 1

  // 배우별 출연 영화 수 집계
  const actorStats = new Map<number, { movieCount: number }>()
  for (const movie of SAMPLE_MOVIES) {
    for (const c of movie.cast) {
      const prev = actorStats.get(c.actorId) ?? { movieCount: 0 }
      actorStats.set(c.actorId, { movieCount: prev.movieCount + 1 })
    }
  }

  const filtered = SAMPLE_MOVIES.filter((m) => {
    if (!q) return true
    return (
      m.title.toLowerCase().includes(q) ||
      m.genre.toLowerCase().includes(q) ||
      m.director.toLowerCase().includes(q)
    )
  })

  const total = filtered.length
  const totalPages = Math.ceil(total / PAGE_SIZE)
  const sliced = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const items: MovieSummary[] = sliced.map((m) => ({
    id: m.id,
    title: m.title,
    year: m.year,
    genre: m.genre,
    director: m.director,
    writer: m.writer,
    ageRating: m.ageRating,
    runtime: m.runtime,
    releaseDate: m.releaseDate,
    country: m.country,
    posterUrl: m.posterUrl,
    format: m.format,
    episode: m.episode,
    // BFF 조인: 주연배우 actorId → Actor 정보 포함
    mainCast: m.cast
      .filter((c) => m.mainActors.includes(c.actorId))
      .map((c) => {
        const actor = SAMPLE_ACTORS.find((a) => a.id === c.actorId)
        return {
          actorId: c.actorId,
          actorName: actor?.name ?? '',
          actorProfileImage: actor?.profileImage,
          movieCount: actorStats.get(c.actorId)?.movieCount ?? 0,
          role: c.role,
          roleProfileImage: c.roleProfileImage,
          roleImages: c.roleImages ?? [],
          isMain: true,
        }
      }),
  }))

  return { items, total, page, pageSize: PAGE_SIZE, totalPages }
}

/**
 * GET /movies/:movieId
 * 영화 상세 + 전체 출연진 조인.
 * 프론트는 SAMPLE_ACTORS.find 불필요.
 */
export function getMovieDetail(movieId: number): MovieDetailResponse | null {
  const movie = SAMPLE_MOVIES.find((m) => m.id === movieId)
  if (!movie) return null

  // 배우별 출연 영화 수 집계
  const movieCountMap = new Map<number, number>()
  for (const m of SAMPLE_MOVIES) {
    for (const c of m.cast) {
      movieCountMap.set(c.actorId, (movieCountMap.get(c.actorId) ?? 0) + 1)
    }
  }

  const cast: CastMember[] = movie.cast.map((c) => {
    const actor = SAMPLE_ACTORS.find((a) => a.id === c.actorId)
    return {
      actorId: c.actorId,
      actorName: actor?.name ?? '',
      actorProfileImage: actor?.profileImage,
      movieCount: movieCountMap.get(c.actorId) ?? 0,
      role: c.role,
      roleProfileImage: c.roleProfileImage,
      roleImages: c.roleImages ?? [],
      isMain: movie.mainActors.includes(c.actorId),
    }
  })

  return {
    id: movie.id,
    title: movie.title,
    year: movie.year,
    genre: movie.genre,
    overview: movie.overview,
    director: movie.director,
    writer: movie.writer,
    ageRating: movie.ageRating,
    runtime: movie.runtime,
    releaseDate: movie.releaseDate,
    country: movie.country,
    posterUrl: movie.posterUrl,
    format: movie.format,
    episode: movie.episode,
    cast,
  }
}
