export interface Actor {
  id: number
  name: string
  birthYear: number
  nationality: string
  debutDate: string
  gender?: '남' | '여'
  profileImage?: string
}

export interface CastEntry {
  id: number         // 배역 인스턴스 고유 id
  actorId: number    // 배우 마스터 참조 id
  role: string       // 배역명
  isMain: boolean    // 주연 여부
  roleProfileImage?: string  // 배역 대표 이미지
  roleImages?: string[]
}

export interface Movie {
  id: number
  title: string
  year: number
  genre: string
  overview: string
  director: string
  writer: string
  ageRating: string      // 관람등급
  runtime: number        // 상영시간 (분)
  releaseDate: string    // 개봉일
  country: string        // 제작국가
  posterUrl?: string
  format: '단편' | '시리즈'  // 작품 형식
  episode?: number           // 시리즈인 경우 에피소드 번호
  cast: CastEntry[]          // 출연 배역 목록
}
