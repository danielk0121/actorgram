import { useState, useEffect } from 'react'
import './App.css'

interface Actor {
  name: string
  role: string
  birthYear: number
  nationality: string
  debutDate: string
  imageUrl?: string
  roleImages?: string[]   // 영화 속 배역 이미지 3장
}

interface Movie {
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
  actors: Actor[]        // 출연 배우 전체 (배역 정보 포함)
  mainActors: string[]   // 주연배우 이름 목록
}

// TODO: API 서버 연동으로 교체 필요
// - GET /movies : 전체 영화 목록 조회
// - GET /movies?search={query} : 배우명/배역명 검색
const SAMPLE_MOVIES: Movie[] = [
  {
    id: 13, title: '미션 임파서블', year: 1996, genre: '액션', rating: 7.1,
    overview: '미국 정보요원 이단 헌트는 동료들의 죽음에 대한 누명을 쓰고 조직에 숨어든 진짜 스파이를 밝혀내기 위해 독자적으로 움직인다.',
    director: '브라이언 드 팔마', writer: '데이비드 코엡',
    ageRating: '15세', runtime: 110, releaseDate: '1996-05-22', country: '미국',
    mainActors: ['톰 크루즈', '존 보이트'],
    actors: [
      { name: '톰 크루즈', role: '이단 헌트', birthYear: 1962, nationality: '미국', debutDate: '1981-08-05', roleImages: ['https://picsum.photos/seed/mi1/200', 'https://picsum.photos/seed/mi2/200', 'https://picsum.photos/seed/mi3/200'] },
      { name: '존 보이트', role: '짐 펠프스', birthYear: 1938, nationality: '미국', debutDate: '1960-01-01' },
    ],
  },
  {
    id: 14, title: '제리 맥과이어', year: 1996, genre: '드라마', rating: 7.3,
    overview: '스포츠 에이전트 제리 맥과이어는 도덕적 각성 후 회사에서 해고되고, 단 한 명의 선수와 함께 자신만의 에이전시를 꾸려 나간다.',
    director: '카메론 크로', writer: '카메론 크로',
    ageRating: '12세', runtime: 139, releaseDate: '1996-12-13', country: '미국',
    mainActors: ['톰 크루즈', '르네 젤위거'],
    actors: [
      { name: '톰 크루즈', role: '제리 맥과이어', birthYear: 1962, nationality: '미국', debutDate: '1981-08-05', roleImages: ['https://picsum.photos/seed/jm1/200', 'https://picsum.photos/seed/jm2/200', 'https://picsum.photos/seed/jm3/200'] },
      { name: '르네 젤위거', role: '도로시 보이드', birthYear: 1969, nationality: '미국', debutDate: '1992-01-01' },
    ],
  },
  {
    id: 15, title: '탑건: 매버릭', year: 2022, genre: '액션', rating: 8.3,
    overview: '30년이 지나도 현역 최고의 파일럿으로 활약하는 매버릭은 탑건 최정예 졸업생들을 이끌고 특수 임무에 나서며 과거의 유령과 마주한다.',
    director: '조셉 코신스키', writer: '에렌 크루거',
    ageRating: '12세', runtime: 130, releaseDate: '2022-06-22', country: '미국',
    mainActors: ['톰 크루즈', '마일스 텔러'],
    actors: [
      { name: '톰 크루즈', role: '매버릭', birthYear: 1962, nationality: '미국', debutDate: '1981-08-05', roleImages: ['https://picsum.photos/seed/tg1/200', 'https://picsum.photos/seed/tg2/200', 'https://picsum.photos/seed/tg3/200'] },
      { name: '마일스 텔러', role: '루스터', birthYear: 1987, nationality: '미국', debutDate: '2010-01-01' },
    ],
  },
  {
    id: 1, title: '인셉션', year: 2010, genre: 'SF', rating: 8.8,
    overview: '타인의 꿈에 침투해 기업 비밀을 훔치는 도둑 코브는 누명을 벗기 위해 꿈속에 아이디어를 심는 불가능한 임무를 맡는다.',
    director: '크리스토퍼 놀란', writer: '크리스토퍼 놀란',
    ageRating: '12세', runtime: 148, releaseDate: '2010-07-21', country: '미국',
    mainActors: ['레오나르도 디카프리오', '조셉 고든-레빗', '엘리엇 페이지', '톰 하디', '켄 와타나베', '디리프 라오', '킬리언 머피', '마리옹 코티야르'],
    actors: [
      { name: '레오나르도 디카프리오', role: '돔 코브', birthYear: 1974, nationality: '미국', debutDate: '1989-01-01' },
      { name: '조셉 고든-레빗', role: '아서', birthYear: 1981, nationality: '미국', debutDate: '1988-01-01' },
      { name: '엘리엇 페이지', role: '아리아드네', birthYear: 1987, nationality: '캐나다', debutDate: '1997-01-01' },
      { name: '톰 하디', role: '이임스', birthYear: 1977, nationality: '영국', debutDate: '2001-01-01' },
      { name: '켄 와타나베', role: '사이토', birthYear: 1959, nationality: '일본', debutDate: '1984-01-01' },
      { name: '디리프 라오', role: '유수프', birthYear: 1975, nationality: '인도', debutDate: '2000-01-01' },
      { name: '킬리언 머피', role: '로버트 피셔', birthYear: 1976, nationality: '아일랜드', debutDate: '1998-01-01' },
      { name: '마리옹 코티야르', role: '맬', birthYear: 1975, nationality: '프랑스', debutDate: '1994-01-01' },
    ],
  },
  {
    id: 2, title: '인터스텔라', year: 2014, genre: 'SF', rating: 8.6,
    overview: '지구 멸망의 위기 속에서 탐험대가 웜홀을 통해 우주로 떠나 인류의 새로운 터전을 찾아 나선다.',
    director: '크리스토퍼 놀란', writer: '조나단 놀란',
    ageRating: '전체', runtime: 169, releaseDate: '2014-11-06', country: '미국',
    mainActors: ['매튜 맥커너히', '앤 해서웨이', '제시카 차스테인'],
    actors: [
      { name: '매튜 맥커너히', role: '쿠퍼', birthYear: 1969, nationality: '미국', debutDate: '1992-01-01' },
      { name: '앤 해서웨이', role: '브랜드 박사', birthYear: 1982, nationality: '미국', debutDate: '1999-01-01' },
      { name: '제시카 차스테인', role: '머프', birthYear: 1977, nationality: '미국', debutDate: '2004-01-01' },
    ],
  },
  {
    id: 3, title: '다크 나이트', year: 2008, genre: '액션', rating: 9.0,
    overview: '조커의 혼돈 속에서 배트맨은 고담 시민을 지키기 위해 심리적·육체적 한계에 부딪히며 정의의 의미를 시험받는다.',
    director: '크리스토퍼 놀란', writer: '조나단 놀란',
    ageRating: '15세', runtime: 152, releaseDate: '2008-07-18', country: '미국',
    mainActors: ['크리스찬 베일', '히스 레저', '아론 에크하트', '마이클 케인', '게리 올드만', '모건 프리먼', '매기 질런홀', '킬리언 머피'],
    actors: [
      { name: '크리스찬 베일', role: '브루스 웨인', birthYear: 1974, nationality: '영국', debutDate: '1987-01-01' },
      { name: '히스 레저', role: '조커', birthYear: 1979, nationality: '호주', debutDate: '1992-01-01' },
      { name: '아론 에크하트', role: '하비 덴트', birthYear: 1968, nationality: '미국', debutDate: '1992-01-01' },
      { name: '마이클 케인', role: '알프레드', birthYear: 1933, nationality: '영국', debutDate: '1956-01-01' },
      { name: '게리 올드만', role: '제임스 고든', birthYear: 1958, nationality: '영국', debutDate: '1982-01-01' },
      { name: '모건 프리먼', role: '루셔스 폭스', birthYear: 1937, nationality: '미국', debutDate: '1964-01-01' },
      { name: '매기 질런홀', role: '레이첼 도스', birthYear: 1977, nationality: '미국', debutDate: '1992-01-01' },
      { name: '킬리언 머피', role: '조나단 크레인', birthYear: 1976, nationality: '아일랜드', debutDate: '1998-01-01' },
    ],
  },
  {
    id: 4, title: '기생충', year: 2019, genre: '스릴러', rating: 8.5,
    overview: '가난한 기택 가족이 부유한 박 사장 가족에게 접근하면서 두 가족 사이에 예상치 못한 사건이 벌어진다.',
    director: '봉준호', writer: '봉준호',
    ageRating: '15세', runtime: 132, releaseDate: '2019-05-30', country: '한국',
    mainActors: ['송강호', '이선균', '조여정'],
    actors: [
      { name: '송강호', role: '기택', birthYear: 1967, nationality: '한국', debutDate: '1996-01-01' },
      { name: '이선균', role: '박동익', birthYear: 1975, nationality: '한국', debutDate: '2001-01-01' },
      { name: '조여정', role: '연교', birthYear: 1981, nationality: '한국', debutDate: '2000-01-01' },
    ],
  },
  {
    id: 5, title: '대부', year: 1972, genre: '드라마', rating: 9.2,
    overview: '노령의 마피아 대부 비토 코를레오네가 제국을 마지막 아들 마이클에게 물려주며 벌어지는 권력 승계와 복수의 이야기.',
    director: '프란시스 포드 코폴라', writer: '마리오 푸조',
    ageRating: '15세', runtime: 175, releaseDate: '1972-03-24', country: '미국',
    mainActors: ['말론 브란도', '알 파치노', '제임스 칸'],
    actors: [
      { name: '말론 브란도', role: '비토 코를레오네', birthYear: 1924, nationality: '미국', debutDate: '1950-01-01' },
      { name: '알 파치노', role: '마이클 코를레오네', birthYear: 1940, nationality: '미국', debutDate: '1969-01-01' },
      { name: '제임스 칸', role: '소니 코를레오네', birthYear: 1940, nationality: '미국', debutDate: '1963-01-01' },
    ],
  },
  {
    id: 6, title: '펄프 픽션', year: 1994, genre: '범죄', rating: 8.9,
    overview: '두 킬러, 복서, 갱스터와 그의 아내의 삶이 폭력과 구원의 네 가지 이야기로 교차한다.',
    director: '쿠엔틴 타란티노', writer: '쿠엔틴 타란티노',
    ageRating: '청소년불가', runtime: 154, releaseDate: '1994-10-14', country: '미국',
    mainActors: ['존 트라볼타', '새뮤얼 L. 잭슨', '우마 서먼'],
    actors: [
      { name: '존 트라볼타', role: '빈센트 베가', birthYear: 1954, nationality: '미국', debutDate: '1972-01-01' },
      { name: '새뮤얼 L. 잭슨', role: '줄스 윈필드', birthYear: 1948, nationality: '미국', debutDate: '1972-01-01' },
      { name: '우마 서먼', role: '미아 월리스', birthYear: 1970, nationality: '미국', debutDate: '1987-01-01' },
    ],
  },
  {
    id: 7, title: '매트릭스', year: 1999, genre: 'SF', rating: 8.7,
    overview: '컴퓨터 해커 네오는 자신이 살아온 세계가 거대한 가상현실임을 알게 되고 인류를 지배하는 기계에 맞서 싸운다.',
    director: '라나 워쇼스키', writer: '릴리 워쇼스키',
    ageRating: '15세', runtime: 136, releaseDate: '1999-03-31', country: '미국',
    mainActors: ['키아누 리브스', '로렌스 피시번', '캐리-앤 모스'],
    actors: [
      { name: '키아누 리브스', role: '네오', birthYear: 1964, nationality: '캐나다', debutDate: '1984-01-01' },
      { name: '로렌스 피시번', role: '모피어스', birthYear: 1961, nationality: '미국', debutDate: '1975-01-01' },
      { name: '캐리-앤 모스', role: '트리니티', birthYear: 1967, nationality: '캐나다', debutDate: '1992-01-01' },
    ],
  },
  {
    id: 8, title: '포레스트 검프', year: 1994, genre: '드라마', rating: 8.8,
    overview: '지능지수 75의 앨라배마 청년 포레스트 검프의 시선으로 케네디 암살, 베트남 전쟁 등 미국 현대사가 펼쳐진다.',
    director: '로버트 저메키스', writer: '에릭 로스',
    ageRating: '전체', runtime: 142, releaseDate: '1994-07-06', country: '미국',
    mainActors: ['톰 행크스', '로빈 라이트', '게리 시니즈'],
    actors: [
      { name: '톰 행크스', role: '포레스트 검프', birthYear: 1956, nationality: '미국', debutDate: '1980-01-01' },
      { name: '로빈 라이트', role: '제니 커런', birthYear: 1966, nationality: '미국', debutDate: '1986-01-01' },
      { name: '게리 시니즈', role: '댄 테일러 중위', birthYear: 1954, nationality: '미국', debutDate: '1981-01-01' },
    ],
  },
  {
    id: 9, title: '쉰들러 리스트', year: 1993, genre: '드라마', rating: 9.0,
    overview: '2차 세계대전 중 독일 사업가 오스카 쉰들러가 나치의 박해를 피해 유대인 노동자들을 구하는 실화를 바탕으로 한 이야기.',
    director: '스티븐 스필버그', writer: '스티븐 재일리안',
    ageRating: '15세', runtime: 195, releaseDate: '1993-12-15', country: '미국',
    mainActors: ['리암 니슨', '벤 킹슬리', '랄프 파인즈'],
    actors: [
      { name: '리암 니슨', role: '오스카 쉰들러', birthYear: 1952, nationality: '영국', debutDate: '1976-01-01' },
      { name: '벤 킹슬리', role: '이차크 스턴', birthYear: 1943, nationality: '영국', debutDate: '1972-01-01' },
      { name: '랄프 파인즈', role: '아몬 괴트', birthYear: 1962, nationality: '영국', debutDate: '1990-01-01' },
    ],
  },
  {
    id: 10, title: '파이트 클럽', year: 1999, genre: '드라마', rating: 8.8,
    overview: '불면증에 시달리는 직장인과 비누 장수가 비밀 격투 클럽을 만들고 점점 더 극단적인 방향으로 치닫는다.',
    director: '데이비드 핀처', writer: '짐 울스',
    ageRating: '청소년불가', runtime: 139, releaseDate: '1999-10-15', country: '미국',
    mainActors: ['브래드 피트', '에드워드 노튼', '헬레나 본햄 카터'],
    actors: [
      { name: '브래드 피트', role: '타일러 더든', birthYear: 1963, nationality: '미국', debutDate: '1987-01-01' },
      { name: '에드워드 노튼', role: '내레이터', birthYear: 1969, nationality: '미국', debutDate: '1993-01-01' },
      { name: '헬레나 본햄 카터', role: '말라 싱어', birthYear: 1966, nationality: '영국', debutDate: '1983-01-01' },
    ],
  },
  {
    id: 11, title: '좋은 친구들', year: 1990, genre: '범죄', rating: 8.7,
    overview: '헨리 힐이 마피아 조직에 발을 들이며 겪는 성공과 배신, 몰락의 실화.',
    director: '마틴 스코세이지', writer: '니콜라스 필레기',
    ageRating: '청소년불가', runtime: 146, releaseDate: '1990-09-19', country: '미국',
    mainActors: ['레이 리오타', '로버트 드 니로', '조 페시'],
    actors: [
      { name: '레이 리오타', role: '헨리 힐', birthYear: 1954, nationality: '미국', debutDate: '1983-01-01' },
      { name: '로버트 드 니로', role: '지미 콘웨이', birthYear: 1943, nationality: '미국', debutDate: '1963-01-01' },
      { name: '조 페시', role: '토미 드비토', birthYear: 1943, nationality: '미국', debutDate: '1961-01-01' },
    ],
  },
  {
    id: 12, title: '양들의 침묵', year: 1991, genre: '스릴러', rating: 8.6,
    overview: 'FBI 수습 요원 클라리스는 연쇄살인범을 잡기 위해 수감 중인 식인 살인마 한니발 렉터의 도움을 받는다.',
    director: '조나단 드미', writer: '테드 탤리',
    ageRating: '청소년불가', runtime: 118, releaseDate: '1991-02-14', country: '미국',
    mainActors: ['조디 포스터', '앤서니 홉킨스', '스콧 글렌'],
    actors: [
      { name: '조디 포스터', role: '클라리스 스탈링', birthYear: 1962, nationality: '미국', debutDate: '1968-01-01' },
      { name: '앤서니 홉킨스', role: '한니발 렉터', birthYear: 1937, nationality: '영국', debutDate: '1960-01-01' },
      { name: '스콧 글렌', role: '잭 크로퍼드', birthYear: 1941, nationality: '미국', debutDate: '1962-01-01' },
    ],
  },
]

const MAX_ROLE_IMAGES = 10

function ActorCard({ actor, allMovies }: { actor: Actor; allMovies: Movie[] }) {
  const [expanded, setExpanded] = useState(false)

  const roleImages = allMovies
    .flatMap((m) => m.actors.find((a) => a.name === actor.name)?.roleImages ?? [])

  const visibleImages = expanded ? roleImages : roleImages.slice(0, MAX_ROLE_IMAGES)
  const hasMore = roleImages.length > MAX_ROLE_IMAGES && !expanded

  return (
    <div className="actor-card">
      <div className="actor-card-top">
        <div className="actor-card-image">
          {actor.imageUrl
            ? <img src={actor.imageUrl} alt={actor.name} />
            : <span>이미지 없음</span>
          }
        </div>
        <div className="actor-card-body">
          <div className="actor-card-name">{actor.name}</div>
          <div className="actor-card-detail">{actor.birthYear}년생 · {actor.nationality} · 데뷔 {actor.debutDate}</div>
        </div>
      </div>
      {roleImages.length > 0 && (
        <div className="actor-card-role-images-wrap">
          <div className="actor-card-role-images-scroll">
            {visibleImages.map((img, i) => (
              <div key={i} className="actor-card-role-thumb">
                <img src={img} alt={`${actor.name} 배역 ${i + 1}`} />
              </div>
            ))}
            {hasMore && (
              <button className="actor-card-more-btn" onClick={() => setExpanded(true)}>
                +{roleImages.length - MAX_ROLE_IMAGES}<br />더보기
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function MovieCard({ movie, search, mode, onClick, onActorClick }: {
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

  return (
    <div className="movie-card" onClick={onClick}>
      <div className="movie-card-poster">
        {movie.posterUrl
          ? <img src={movie.posterUrl} alt={movie.title} />
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

        {mode === 'actor' && matchedActors.length > 0 && (
          <div className="movie-card-actors">
            {matchedActors.map((a) => (
              <div key={a.name} className="movie-card-actor">
                <div className="movie-card-actor-name">{a.name} · {a.role}</div>
                <div className="movie-card-actor-detail">{a.birthYear}년생 · {a.nationality} · 데뷔 {a.debutDate}</div>
                {a.roleImages && a.roleImages.length > 0 && (
                  <div className="movie-card-role-images">
                    {a.roleImages.map((img, i) => (
                      <div key={i} className="movie-card-role-image">
                        <img src={img} alt={`${a.role} ${i + 1}`} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {mode === 'movie' && mainActorDetails.length > 0 && (
          <div className="movie-card-actors">
            {mainActorDetails.map((a) => (
              <button
                key={a.name}
                className="movie-card-actor movie-card-actor--clickable"
                onClick={(e) => { e.stopPropagation(); onActorClick?.(a.name) }}
              >
                <div className="movie-card-actor-profile">
                  {a.imageUrl
                    ? <img src={a.imageUrl} alt={a.name} />
                    : <span>{a.name[0]}</span>
                  }
                </div>
                <div>
                  <div className="movie-card-actor-name">{a.name}</div>
                  <div className="movie-card-actor-detail">{a.role}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function MovieModal({ movie, onClose }: { movie: Movie; onClose: () => void }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-title">{movie.title}</div>
        <div className="modal-meta">
          <span>{movie.year}</span>
          <span>{movie.genre}</span>
          <span>{movie.country}</span>
          <span>{movie.ageRating}</span>
          <span>{movie.runtime}분</span>
          <span>{movie.releaseDate}</span>
        </div>
        <div className="modal-actors">
          {movie.actors.map((a) => (
            <div key={a.name} className="modal-actor-item">
              <span className="modal-actor-name">{a.name}</span>
              <span className="modal-actor-role">{a.role}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

type Page = '배우' | '영화' | '사진검색'

function ActorSearchPage({ initialSearch, onSearchDone }: { initialSearch?: string | null; onSearchDone?: () => void }) {
  const [query, setQuery] = useState(initialSearch ?? '톰 크루즈')
  const [search, setSearch] = useState(initialSearch ?? '톰 크루즈')
  const [selected, setSelected] = useState<Movie | null>(null)

  // 영화 화면에서 배우 클릭 시 검색어 반영
  useEffect(() => {
    if (initialSearch) {
      setQuery(initialSearch)
      setSearch(initialSearch)
      onSearchDone?.()
    }
  }, [initialSearch])

  const q = search.toLowerCase()

  // TODO: API 서버 연동 시 fetch 호출로 교체
  const filteredMovies = SAMPLE_MOVIES.filter((m) =>
    m.title.toLowerCase().includes(q) ||
    m.actors.some((a) => a.name.toLowerCase().includes(q) || a.role.toLowerCase().includes(q))
  )

  const matchedActors: Actor[] = search
    ? Array.from(
        new Map(
          filteredMovies
            .flatMap((m) => m.actors)
            .filter((a) => a.name.toLowerCase().includes(q) || a.role.toLowerCase().includes(q))
            .map((a) => [a.name, a])
        ).values()
      )
    : []

  const handleSearch = () => setSearch(query)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          placeholder="배우 이름 또는 배역 이름으로 검색..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch}>검색</button>
      </div>

      {search && filteredMovies.length === 0 && (
        <div className="empty-state">검색 결과가 없습니다.</div>
      )}

      {search && matchedActors.length > 0 && (
        <section className="result-section">
          <div className="section-title">배우</div>
          <div className="actor-list">
            {matchedActors.map((a) => (
              <ActorCard key={a.name} actor={a} allMovies={filteredMovies} />
            ))}
          </div>
        </section>
      )}

      {filteredMovies.length > 0 && (
        <section className="result-section">
          <div className="section-title">{search ? `영화 (${filteredMovies.length})` : `전체 영화 (${filteredMovies.length})`}</div>
          <div className={`movie-grid${search ? ' has-search' : ''}`}>
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} search={search} mode="actor" onClick={() => setSelected(movie)} />
            ))}
          </div>
        </section>
      )}

      {selected && <MovieModal movie={selected} onClose={() => setSelected(null)} />}
    </>
  )
}

function MovieSearchPage({ onActorClick }: { onActorClick: (actorName: string) => void }) {
  const [query, setQuery] = useState('')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Movie | null>(null)

  const q = search.toLowerCase()

  // TODO: API 서버 연동 시 fetch 호출로 교체
  const filteredMovies = SAMPLE_MOVIES.filter((m) =>
    m.title.toLowerCase().includes(q) ||
    m.genre.toLowerCase().includes(q) ||
    m.director.toLowerCase().includes(q)
  )

  const handleSearch = () => setSearch(query)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          placeholder="영화 제목, 장르, 감독으로 검색..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch}>검색</button>
      </div>

      {search && filteredMovies.length === 0 && (
        <div className="empty-state">검색 결과가 없습니다.</div>
      )}

      {filteredMovies.length > 0 && (
        <section className="result-section">
          <div className="section-title">{search ? `영화 (${filteredMovies.length})` : `전체 영화 (${filteredMovies.length})`}</div>
          <div className="movie-grid movie-grid--single">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} search={search} mode="movie" onClick={() => setSelected(movie)} onActorClick={onActorClick} />
            ))}
          </div>
        </section>
      )}

      {selected && <MovieModal movie={selected} onClose={() => setSelected(null)} />}
    </>
  )
}

function PhotoSearchPage() {
  const [preview, setPreview] = useState<string | null>(null)

  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file)
    setPreview(url)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  return (
    <>
      <div
        className="photo-search-dropzone"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {preview
          ? <img src={preview} alt="업로드된 사진" className="photo-search-preview" />
          : (
            <>
              <div className="photo-search-icon">🖼</div>
              <div className="photo-search-label">사진을 드래그하거나 클릭하여 업로드</div>
              <div className="photo-search-sub">배우 또는 영화를 사진으로 검색합니다</div>
            </>
          )
        }
        <input
          type="file"
          accept="image/*"
          className="photo-search-input"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
        />
      </div>

      {preview && (
        <div className="empty-state">
          {/* TODO: API 서버 연동 시 이미지 업로드 후 배우/영화 검색 결과 표시 */}
          사진 검색 API 연동 전입니다.
        </div>
      )}
    </>
  )
}

function App() {
  const [page, setPage] = useState<Page>('배우')
  const [actorSearch, setActorSearch] = useState<string | null>(null)

  const handleActorClick = (actorName: string) => {
    setActorSearch(actorName)
    setPage('배우')
  }

  return (
    <div className="app">
      <header className="header">
        <button className="header-left" onClick={() => setPage('배우')}>
          <img src="/favicon.svg" alt="actors 로고" className="header-favicon" />
          <div className="header-logo">actors</div>
        </button>
        <nav className="header-nav">
          <button className={`nav-item${page === '배우' ? ' nav-item--active' : ''}`} onClick={() => setPage('배우')}>배우</button>
          <button className={`nav-item${page === '영화' ? ' nav-item--active' : ''}`} onClick={() => setPage('영화')}>영화</button>
          <button className={`nav-item${page === '사진검색' ? ' nav-item--active' : ''}`} onClick={() => setPage('사진검색')}>사진 검색</button>
        </nav>
      </header>

      <main className="main">
        {page === '배우' && <ActorSearchPage initialSearch={actorSearch} onSearchDone={() => setActorSearch(null)} />}
        {page === '영화' && <MovieSearchPage onActorClick={handleActorClick} />}
        {page === '사진검색' && <PhotoSearchPage />}
      </main>

      <footer className="footer">actors — React + TypeScript + Vite</footer>
    </div>
  )
}

export default App
