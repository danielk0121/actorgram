export interface Actor {
  id: number
  name: string
  role: string
  birthYear: number
  nationality: string
  debutDate: string
  gender?: '남' | '여'
  imageUrl?: string
  roleImages?: string[]   // 영화 속 배역 이미지 3장
}

export interface Movie {
  id: number
  title: string
  year: number
  genre: string
  rating: number
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
  actors: Actor[]            // 출연 배우 전체 (배역 정보 포함)
  mainActors: number[]       // 주연배우 id 목록
}
