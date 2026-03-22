import { useState, useEffect } from 'react'
import { Routes, Route, NavLink, useNavigate, useSearchParams } from 'react-router-dom'
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
    posterUrl: '/images/poster13.jpg',
    mainActors: ['톰 크루즈', '존 보이트', '엠마뉴엘 베아르', '헨리 체르니'],
    actors: [
      { name: '톰 크루즈', role: '이단 헌트', birthYear: 1962, nationality: '미국', debutDate: '1981-08-05', imageUrl: '/images/actor1.jpg', roleImages: ['/images/mi1.jpg', '/images/mi2.jpg', '/images/mi3.jpg'] },
      { name: '존 보이트', role: '짐 펠프스', birthYear: 1938, nationality: '미국', debutDate: '1960-01-01', imageUrl: '/images/actor2.jpg' },
      { name: '엠마뉴엘 베아르', role: '클레어 펠프스', birthYear: 1963, nationality: '프랑스', debutDate: '1984-01-01', imageUrl: '/images/actor3.jpg' },
      { name: '헨리 체르니', role: '유진 킷트리지', birthYear: 1959, nationality: '캐나다', debutDate: '1987-01-01', imageUrl: '/images/actor4.jpg' },
    ],
  },
  {
    id: 14, title: '제리 맥과이어', year: 1996, genre: '드라마', rating: 7.3,
    overview: '스포츠 에이전트 제리 맥과이어는 도덕적 각성 후 회사에서 해고되고, 단 한 명의 선수와 함께 자신만의 에이전시를 꾸려 나간다.',
    director: '카메론 크로', writer: '카메론 크로',
    ageRating: '12세', runtime: 139, releaseDate: '1996-12-13', country: '미국',
    posterUrl: '/images/poster14.jpg',
    mainActors: ['톰 크루즈', '르네 젤위거', '쿠바 구딩 주니어', '켈리 프레스턴', '제리 오코넬', '보니 헌트'],
    actors: [
      { name: '톰 크루즈', role: '제리 맥과이어', birthYear: 1962, nationality: '미국', debutDate: '1981-08-05', imageUrl: '/images/actor1.jpg', roleImages: ['/images/jm1.jpg', '/images/jm2.jpg', '/images/jm3.jpg'] },
      { name: '르네 젤위거', role: '도로시 보이드', birthYear: 1969, nationality: '미국', debutDate: '1992-01-01', imageUrl: '/images/actor5.jpg' },
      { name: '쿠바 구딩 주니어', role: '로드 타이드웰', birthYear: 1968, nationality: '미국', debutDate: '1988-01-01', imageUrl: '/images/actor6.jpg' },
      { name: '켈리 프레스턴', role: '에이버리 비숍', birthYear: 1962, nationality: '미국', debutDate: '1985-01-01', imageUrl: '/images/actor7.jpg' },
      { name: '제리 오코넬', role: '프랭크 롭', birthYear: 1974, nationality: '미국', debutDate: '1986-01-01', imageUrl: '/images/actor8.jpg' },
      { name: '보니 헌트', role: '로리 보이드', birthYear: 1961, nationality: '미국', debutDate: '1988-01-01', imageUrl: '/images/actor9.jpg' },
    ],
  },
  {
    id: 15, title: '탑건: 매버릭', year: 2022, genre: '액션', rating: 8.3,
    overview: '30년이 지나도 현역 최고의 파일럿으로 활약하는 매버릭은 탑건 최정예 졸업생들을 이끌고 특수 임무에 나서며 과거의 유령과 마주한다.',
    director: '조셉 코신스키', writer: '에렌 크루거',
    ageRating: '12세', runtime: 130, releaseDate: '2022-06-22', country: '미국',
    posterUrl: '/images/poster15.jpg',
    mainActors: ['톰 크루즈', '마일스 텔러', '제니퍼 코넬리', '존 햄', '글렌 파월', '루이스 풀먼', '모니카 바르보사', '에드 해리스', '발 킬머'],
    actors: [
      { name: '톰 크루즈', role: '매버릭', birthYear: 1962, nationality: '미국', debutDate: '1981-08-05', imageUrl: '/images/actor1.jpg', roleImages: ['/images/tg1.jpg', '/images/tg2.jpg', '/images/tg3.jpg'] },
      { name: '마일스 텔러', role: '루스터', birthYear: 1987, nationality: '미국', debutDate: '2010-01-01', imageUrl: '/images/actor10.jpg' },
      { name: '제니퍼 코넬리', role: '페니 벤자민', birthYear: 1970, nationality: '미국', debutDate: '1984-01-01', imageUrl: '/images/actor11.jpg' },
      { name: '존 햄', role: '사이클론', birthYear: 1971, nationality: '미국', debutDate: '1996-01-01', imageUrl: '/images/actor12.jpg' },
      { name: '글렌 파월', role: '행맨', birthYear: 1988, nationality: '미국', debutDate: '2012-01-01', imageUrl: '/images/actor13.jpg' },
      { name: '루이스 풀먼', role: '바이퍼', birthYear: 1994, nationality: '미국', debutDate: '2016-01-01', imageUrl: '/images/actor14.jpg' },
      { name: '모니카 바르보사', role: '피닉스', birthYear: 1991, nationality: '미국', debutDate: '2014-01-01', imageUrl: '/images/actor15.jpg' },
      { name: '에드 해리스', role: '해군장관', birthYear: 1950, nationality: '미국', debutDate: '1975-01-01', imageUrl: '/images/actor16.jpg' },
      { name: '발 킬머', role: '아이스맨', birthYear: 1959, nationality: '미국', debutDate: '1984-01-01', imageUrl: '/images/actor17.jpg' },
    ],
  },
  {
    id: 1, title: '인셉션', year: 2010, genre: 'SF', rating: 8.8,
    overview: '타인의 꿈에 침투해 기업 비밀을 훔치는 도둑 코브는 누명을 벗기 위해 꿈속에 아이디어를 심는 불가능한 임무를 맡는다.',
    director: '크리스토퍼 놀란', writer: '크리스토퍼 놀란',
    ageRating: '12세', runtime: 148, releaseDate: '2010-07-21', country: '미국',
    posterUrl: '/images/poster1.jpg',
    mainActors: ['레오나르도 디카프리오', '조셉 고든-레빗', '엘리엇 페이지', '톰 하디', '켄 와타나베', '디리프 라오', '킬리언 머피', '마리옹 코티야르'],
    actors: [
      { name: '레오나르도 디카프리오', role: '돔 코브', birthYear: 1974, nationality: '미국', debutDate: '1989-01-01', imageUrl: '/images/actor18.jpg' },
      { name: '조셉 고든-레빗', role: '아서', birthYear: 1981, nationality: '미국', debutDate: '1988-01-01', imageUrl: '/images/actor19.jpg' },
      { name: '엘리엇 페이지', role: '아리아드네', birthYear: 1987, nationality: '캐나다', debutDate: '1997-01-01', imageUrl: '/images/actor20.jpg' },
      { name: '톰 하디', role: '이임스', birthYear: 1977, nationality: '영국', debutDate: '2001-01-01', imageUrl: '/images/actor21.jpg' },
      { name: '켄 와타나베', role: '사이토', birthYear: 1959, nationality: '일본', debutDate: '1984-01-01', imageUrl: '/images/actor22.jpg' },
      { name: '디리프 라오', role: '유수프', birthYear: 1975, nationality: '인도', debutDate: '2000-01-01', imageUrl: '/images/actor23.jpg' },
      { name: '킬리언 머피', role: '로버트 피셔', birthYear: 1976, nationality: '아일랜드', debutDate: '1998-01-01', imageUrl: '/images/actor24.jpg' },
      { name: '마리옹 코티야르', role: '맬', birthYear: 1975, nationality: '프랑스', debutDate: '1994-01-01', imageUrl: '/images/actor25.jpg' },
    ],
  },
  {
    id: 2, title: '인터스텔라', year: 2014, genre: 'SF', rating: 8.6,
    overview: '지구 멸망의 위기 속에서 탐험대가 웜홀을 통해 우주로 떠나 인류의 새로운 터전을 찾아 나선다.',
    director: '크리스토퍼 놀란', writer: '조나단 놀란',
    ageRating: '전체', runtime: 169, releaseDate: '2014-11-06', country: '미국',
    posterUrl: '/images/poster2.jpg',
    mainActors: ['매튜 맥커너히', '앤 해서웨이', '제시카 차스테인', '마이클 케인', '맷 데이먼'],
    actors: [
      { name: '매튜 맥커너히', role: '쿠퍼', birthYear: 1969, nationality: '미국', debutDate: '1992-01-01', imageUrl: '/images/actor26.jpg' },
      { name: '앤 해서웨이', role: '브랜드 박사', birthYear: 1982, nationality: '미국', debutDate: '1999-01-01', imageUrl: '/images/actor27.jpg' },
      { name: '제시카 차스테인', role: '머프', birthYear: 1977, nationality: '미국', debutDate: '2004-01-01', imageUrl: '/images/actor28.jpg' },
      { name: '마이클 케인', role: '브랜드 교수', birthYear: 1933, nationality: '영국', debutDate: '1956-01-01', imageUrl: '/images/actor29.jpg' },
      { name: '맷 데이먼', role: '만 박사', birthYear: 1970, nationality: '미국', debutDate: '1988-01-01', imageUrl: '/images/actor30.jpg' },
    ],
  },
  {
    id: 3, title: '다크 나이트', year: 2008, genre: '액션', rating: 9.0,
    overview: '조커의 혼돈 속에서 배트맨은 고담 시민을 지키기 위해 심리적·육체적 한계에 부딪히며 정의의 의미를 시험받는다.',
    director: '크리스토퍼 놀란', writer: '조나단 놀란',
    ageRating: '15세', runtime: 152, releaseDate: '2008-07-18', country: '미국',
    posterUrl: '/images/poster3.jpg',
    mainActors: ['크리스찬 베일', '히스 레저', '아론 에크하트', '마이클 케인', '게리 올드만', '모건 프리먼', '매기 질런홀', '킬리언 머피'],
    actors: [
      { name: '크리스찬 베일', role: '브루스 웨인', birthYear: 1974, nationality: '영국', debutDate: '1987-01-01', imageUrl: '/images/actor31.jpg' },
      { name: '히스 레저', role: '조커', birthYear: 1979, nationality: '호주', debutDate: '1992-01-01', imageUrl: '/images/actor32.jpg' },
      { name: '아론 에크하트', role: '하비 덴트', birthYear: 1968, nationality: '미국', debutDate: '1992-01-01', imageUrl: '/images/actor33.jpg' },
      { name: '마이클 케인', role: '알프레드', birthYear: 1933, nationality: '영국', debutDate: '1956-01-01', imageUrl: '/images/actor29.jpg' },
      { name: '게리 올드만', role: '제임스 고든', birthYear: 1958, nationality: '영국', debutDate: '1982-01-01', imageUrl: '/images/actor34.jpg' },
      { name: '모건 프리먼', role: '루셔스 폭스', birthYear: 1937, nationality: '미국', debutDate: '1964-01-01', imageUrl: '/images/actor35.jpg' },
      { name: '매기 질런홀', role: '레이첼 도스', birthYear: 1977, nationality: '미국', debutDate: '1992-01-01', imageUrl: '/images/actor36.jpg' },
      { name: '킬리언 머피', role: '조나단 크레인', birthYear: 1976, nationality: '아일랜드', debutDate: '1998-01-01', imageUrl: '/images/actor24.jpg' },
    ],
  },
  {
    id: 4, title: '기생충', year: 2019, genre: '스릴러', rating: 8.5,
    overview: '가난한 기택 가족이 부유한 박 사장 가족에게 접근하면서 두 가족 사이에 예상치 못한 사건이 벌어진다.',
    director: '봉준호', writer: '봉준호',
    ageRating: '15세', runtime: 132, releaseDate: '2019-05-30', country: '한국',
    posterUrl: '/images/poster4.jpg',
    mainActors: ['송강호', '이선균', '조여정', '최우식', '박소담', '이정은', '장혜진'],
    actors: [
      { name: '송강호', role: '기택', birthYear: 1967, nationality: '한국', debutDate: '1996-01-01', imageUrl: '/images/actor37.jpg' },
      { name: '이선균', role: '박동익', birthYear: 1975, nationality: '한국', debutDate: '2001-01-01', imageUrl: '/images/actor38.jpg' },
      { name: '조여정', role: '연교', birthYear: 1981, nationality: '한국', debutDate: '2000-01-01', imageUrl: '/images/actor39.jpg' },
      { name: '최우식', role: '기우', birthYear: 1990, nationality: '한국', debutDate: '2012-01-01', imageUrl: '/images/actor40.jpg' },
      { name: '박소담', role: '기정', birthYear: 1991, nationality: '한국', debutDate: '2013-01-01', imageUrl: '/images/actor41.jpg' },
      { name: '이정은', role: '문광', birthYear: 1969, nationality: '한국', debutDate: '1997-01-01', imageUrl: '/images/actor42.jpg' },
      { name: '장혜진', role: '충숙', birthYear: 1970, nationality: '한국', debutDate: '1998-01-01', imageUrl: '/images/actor43.jpg' },
    ],
  },
  {
    id: 5, title: '대부', year: 1972, genre: '드라마', rating: 9.2,
    overview: '노령의 마피아 대부 비토 코를레오네가 제국을 마지막 아들 마이클에게 물려주며 벌어지는 권력 승계와 복수의 이야기.',
    director: '프란시스 포드 코폴라', writer: '마리오 푸조',
    ageRating: '15세', runtime: 175, releaseDate: '1972-03-24', country: '미국',
    posterUrl: '/images/poster5.jpg',
    mainActors: ['말론 브란도', '알 파치노', '제임스 칸', '다이앤 키튼', '로버트 듀발', '리처드 카스텔라노', '알 레티에리', '다이앤 시레이토', '리처드 브라이트', '알렉스 로코'],
    actors: [
      { name: '말론 브란도', role: '비토 코를레오네', birthYear: 1924, nationality: '미국', debutDate: '1950-01-01', imageUrl: '/images/actor44.jpg' },
      { name: '알 파치노', role: '마이클 코를레오네', birthYear: 1940, nationality: '미국', debutDate: '1969-01-01', imageUrl: '/images/actor45.jpg' },
      { name: '제임스 칸', role: '소니 코를레오네', birthYear: 1940, nationality: '미국', debutDate: '1963-01-01', imageUrl: '/images/actor46.jpg' },
      { name: '다이앤 키튼', role: '케이 애덤스', birthYear: 1946, nationality: '미국', debutDate: '1970-01-01', imageUrl: '/images/actor47.jpg' },
      { name: '로버트 듀발', role: '톰 헤이건', birthYear: 1931, nationality: '미국', debutDate: '1962-01-01', imageUrl: '/images/actor48.jpg' },
      { name: '리처드 카스텔라노', role: '피터 클레멘자', birthYear: 1933, nationality: '미국', debutDate: '1960-01-01', imageUrl: '/images/actor49.jpg' },
      { name: '알 레티에리', role: '솔로조', birthYear: 1928, nationality: '미국', debutDate: '1968-01-01', imageUrl: '/images/actor50.jpg' },
      { name: '다이앤 시레이토', role: '코니 코를레오네', birthYear: 1948, nationality: '미국', debutDate: '1965-01-01', imageUrl: '/images/actor51.jpg' },
      { name: '리처드 브라이트', role: '알', birthYear: 1937, nationality: '미국', debutDate: '1965-01-01', imageUrl: '/images/actor52.jpg' },
      { name: '알렉스 로코', role: '모 그린', birthYear: 1936, nationality: '미국', debutDate: '1963-01-01', imageUrl: '/images/actor53.jpg' },
    ],
  },
  {
    id: 6, title: '펄프 픽션', year: 1994, genre: '범죄', rating: 8.9,
    overview: '두 킬러, 복서, 갱스터와 그의 아내의 삶이 폭력과 구원의 네 가지 이야기로 교차한다.',
    director: '쿠엔틴 타란티노', writer: '쿠엔틴 타란티노',
    ageRating: '청소년불가', runtime: 154, releaseDate: '1994-10-14', country: '미국',
    posterUrl: '/images/poster6.jpg',
    mainActors: ['존 트라볼타', '새뮤얼 L. 잭슨', '우마 서먼'],
    actors: [
      { name: '존 트라볼타', role: '빈센트 베가', birthYear: 1954, nationality: '미국', debutDate: '1972-01-01', imageUrl: '/images/actor54.jpg' },
      { name: '새뮤얼 L. 잭슨', role: '줄스 윈필드', birthYear: 1948, nationality: '미국', debutDate: '1972-01-01', imageUrl: '/images/actor55.jpg' },
      { name: '우마 서먼', role: '미아 월리스', birthYear: 1970, nationality: '미국', debutDate: '1987-01-01', imageUrl: '/images/actor56.jpg' },
    ],
  },
  {
    id: 7, title: '매트릭스', year: 1999, genre: 'SF', rating: 8.7,
    overview: '컴퓨터 해커 네오는 자신이 살아온 세계가 거대한 가상현실임을 알게 되고 인류를 지배하는 기계에 맞서 싸운다.',
    director: '라나 워쇼스키', writer: '릴리 워쇼스키',
    ageRating: '15세', runtime: 136, releaseDate: '1999-03-31', country: '미국',
    posterUrl: '/images/poster7.jpg',
    mainActors: ['키아누 리브스', '로렌스 피시번', '캐리-앤 모스', '휴고 위빙', '글로리아 포스터', '조 팬톨리아노'],
    actors: [
      { name: '키아누 리브스', role: '네오', birthYear: 1964, nationality: '캐나다', debutDate: '1984-01-01', imageUrl: '/images/actor57.jpg' },
      { name: '로렌스 피시번', role: '모피어스', birthYear: 1961, nationality: '미국', debutDate: '1975-01-01', imageUrl: '/images/actor58.jpg' },
      { name: '캐리-앤 모스', role: '트리니티', birthYear: 1967, nationality: '캐나다', debutDate: '1992-01-01', imageUrl: '/images/actor59.jpg' },
      { name: '휴고 위빙', role: '에이전트 스미스', birthYear: 1959, nationality: '호주', debutDate: '1984-01-01', imageUrl: '/images/actor60.jpg' },
      { name: '글로리아 포스터', role: '오라클', birthYear: 1933, nationality: '미국', debutDate: '1964-01-01', imageUrl: '/images/actor61.jpg' },
      { name: '조 팬톨리아노', role: '사이퍼', birthYear: 1951, nationality: '미국', debutDate: '1976-01-01', imageUrl: '/images/actor62.jpg' },
    ],
  },
  {
    id: 8, title: '포레스트 검프', year: 1994, genre: '드라마', rating: 8.8,
    overview: '지능지수 75의 앨라배마 청년 포레스트 검프의 시선으로 케네디 암살, 베트남 전쟁 등 미국 현대사가 펼쳐진다.',
    director: '로버트 저메키스', writer: '에릭 로스',
    ageRating: '전체', runtime: 142, releaseDate: '1994-07-06', country: '미국',
    posterUrl: '/images/poster8.jpg',
    mainActors: ['톰 행크스', '로빈 라이트', '게리 시니즈', '샐리 필드', '마이클 콘너 험프리스'],
    actors: [
      { name: '톰 행크스', role: '포레스트 검프', birthYear: 1956, nationality: '미국', debutDate: '1980-01-01', imageUrl: '/images/actor63.jpg' },
      { name: '로빈 라이트', role: '제니 커런', birthYear: 1966, nationality: '미국', debutDate: '1986-01-01', imageUrl: '/images/actor64.jpg' },
      { name: '게리 시니즈', role: '댄 테일러 중위', birthYear: 1954, nationality: '미국', debutDate: '1981-01-01', imageUrl: '/images/actor65.jpg' },
      { name: '샐리 필드', role: '포레스트 어머니', birthYear: 1946, nationality: '미국', debutDate: '1967-01-01', imageUrl: '/images/actor66.jpg' },
      { name: '마이클 콘너 험프리스', role: '어린 포레스트', birthYear: 1985, nationality: '미국', debutDate: '1994-01-01', imageUrl: '/images/actor67.jpg' },
    ],
  },
  {
    id: 9, title: '쉰들러 리스트', year: 1993, genre: '드라마', rating: 9.0,
    overview: '2차 세계대전 중 독일 사업가 오스카 쉰들러가 나치의 박해를 피해 유대인 노동자들을 구하는 실화를 바탕으로 한 이야기.',
    director: '스티븐 스필버그', writer: '스티븐 재일리안',
    ageRating: '15세', runtime: 195, releaseDate: '1993-12-15', country: '미국',
    posterUrl: '/images/poster9.jpg',
    mainActors: ['리암 니슨', '벤 킹슬리', '랄프 파인즈', '캐롤라인 굿올'],
    actors: [
      { name: '리암 니슨', role: '오스카 쉰들러', birthYear: 1952, nationality: '영국', debutDate: '1976-01-01', imageUrl: '/images/actor68.jpg' },
      { name: '벤 킹슬리', role: '이차크 스턴', birthYear: 1943, nationality: '영국', debutDate: '1972-01-01', imageUrl: '/images/actor69.jpg' },
      { name: '랄프 파인즈', role: '아몬 괴트', birthYear: 1962, nationality: '영국', debutDate: '1990-01-01', imageUrl: '/images/actor70.jpg' },
      { name: '캐롤라인 굿올', role: '에밀리 쉰들러', birthYear: 1959, nationality: '영국', debutDate: '1985-01-01', imageUrl: '/images/actor71.jpg' },
    ],
  },
  {
    id: 10, title: '파이트 클럽', year: 1999, genre: '드라마', rating: 8.8,
    overview: '불면증에 시달리는 직장인과 비누 장수가 비밀 격투 클럽을 만들고 점점 더 극단적인 방향으로 치닫는다.',
    director: '데이비드 핀처', writer: '짐 울스',
    ageRating: '청소년불가', runtime: 139, releaseDate: '1999-10-15', country: '미국',
    posterUrl: '/images/poster10.jpg',
    mainActors: ['브래드 피트', '에드워드 노튼', '헬레나 본햄 카터', '미트 로프', '재러드 레토', '자이몬 혼수', '이언 베일리'],
    actors: [
      { name: '브래드 피트', role: '타일러 더든', birthYear: 1963, nationality: '미국', debutDate: '1987-01-01', imageUrl: '/images/actor72.jpg' },
      { name: '에드워드 노튼', role: '내레이터', birthYear: 1969, nationality: '미국', debutDate: '1993-01-01', imageUrl: '/images/actor73.jpg' },
      { name: '헬레나 본햄 카터', role: '말라 싱어', birthYear: 1966, nationality: '영국', debutDate: '1983-01-01', imageUrl: '/images/actor74.jpg' },
      { name: '미트 로프', role: '밥', birthYear: 1947, nationality: '미국', debutDate: '1975-01-01', imageUrl: '/images/actor75.jpg' },
      { name: '재러드 레토', role: '앤젤 페이스', birthYear: 1971, nationality: '미국', debutDate: '1992-01-01', imageUrl: '/images/actor76.jpg' },
      { name: '자이몬 혼수', role: '카를로스', birthYear: 1964, nationality: '시에라리온', debutDate: '1994-01-01', imageUrl: '/images/actor77.jpg' },
      { name: '이언 베일리', role: '리처드', birthYear: 1965, nationality: '미국', debutDate: '1997-01-01', imageUrl: '/images/actor78.jpg' },
    ],
  },
  {
    id: 11, title: '좋은 친구들', year: 1990, genre: '범죄', rating: 8.7,
    overview: '헨리 힐이 마피아 조직에 발을 들이며 겪는 성공과 배신, 몰락의 실화.',
    director: '마틴 스코세이지', writer: '니콜라스 필레기',
    ageRating: '청소년불가', runtime: 146, releaseDate: '1990-09-19', country: '미국',
    posterUrl: '/images/poster11.jpg',
    mainActors: ['레이 리오타', '로버트 드 니로', '조 페시', '로레인 브라코', '폴 소르비노', '프랭크 빈센트', '마이클 임페리올리', '척 로우', '프랭크 디레오'],
    actors: [
      { name: '레이 리오타', role: '헨리 힐', birthYear: 1954, nationality: '미국', debutDate: '1983-01-01', imageUrl: '/images/actor79.jpg' },
      { name: '로버트 드 니로', role: '지미 콘웨이', birthYear: 1943, nationality: '미국', debutDate: '1963-01-01', imageUrl: '/images/actor80.jpg' },
      { name: '조 페시', role: '토미 드비토', birthYear: 1943, nationality: '미국', debutDate: '1961-01-01', imageUrl: '/images/actor81.jpg' },
      { name: '로레인 브라코', role: '카렌 힐', birthYear: 1954, nationality: '미국', debutDate: '1979-01-01', imageUrl: '/images/actor82.jpg' },
      { name: '폴 소르비노', role: '폴리 치클로', birthYear: 1939, nationality: '미국', debutDate: '1970-01-01', imageUrl: '/images/actor83.jpg' },
      { name: '프랭크 빈센트', role: '빌리 바츠', birthYear: 1938, nationality: '미국', debutDate: '1980-01-01', imageUrl: '/images/actor84.jpg' },
      { name: '마이클 임페리올리', role: '스파이더', birthYear: 1966, nationality: '미국', debutDate: '1989-01-01', imageUrl: '/images/actor85.jpg' },
      { name: '척 로우', role: '해리 라이트', birthYear: 1952, nationality: '미국', debutDate: '1980-01-01', imageUrl: '/images/actor86.jpg' },
      { name: '프랭크 디레오', role: '투디', birthYear: 1950, nationality: '미국', debutDate: '1990-01-01', imageUrl: '/images/actor87.jpg' },
    ],
  },
  {
    id: 12, title: '양들의 침묵', year: 1991, genre: '스릴러', rating: 8.6,
    overview: 'FBI 수습 요원 클라리스는 연쇄살인범을 잡기 위해 수감 중인 식인 살인마 한니발 렉터의 도움을 받는다.',
    director: '조나단 드미', writer: '테드 탤리',
    ageRating: '청소년불가', runtime: 118, releaseDate: '1991-02-14', country: '미국',
    posterUrl: '/images/poster12.jpg',
    mainActors: ['조디 포스터', '앤서니 홉킨스', '테드 레빈'],
    actors: [
      { name: '조디 포스터', role: '클라리스 스탈링', birthYear: 1962, nationality: '미국', debutDate: '1968-01-01', imageUrl: '/images/actor88.jpg' },
      { name: '앤서니 홉킨스', role: '한니발 렉터', birthYear: 1937, nationality: '영국', debutDate: '1960-01-01', imageUrl: '/images/actor89.jpg' },
      { name: '테드 레빈', role: '버팔로 빌', birthYear: 1952, nationality: '미국', debutDate: '1984-01-01', imageUrl: '/images/actor90.jpg' },
    ],
  },
]

// 배우 카드에서 기본 노출 이미지 수 (4개 2줄 = 8개)
const ROLE_IMAGES_DEFAULT = 8

function ActorCard({ actor, allMovies }: { actor: Actor; allMovies: Movie[] }) {
  const navigate = useNavigate()

  const roleImages = allMovies
    .flatMap((m) => m.actors.find((a) => a.name === actor.name)?.roleImages ?? [])

  const visibleImages = roleImages.slice(0, ROLE_IMAGES_DEFAULT)
  const hasMore = roleImages.length > ROLE_IMAGES_DEFAULT

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
          <div className="actor-card-role-images-grid">
            {visibleImages.map((img, i) => (
              <div key={i} className="actor-card-role-thumb">
                <img src={img} alt={`${actor.name} 배역 ${i + 1}`} />
              </div>
            ))}
          </div>
          {hasMore && (
            <button
              className="actor-card-more-btn-below"
              onClick={() => navigate(`/profiles?actor=${encodeURIComponent(actor.name)}`)}
            >
              더보기
            </button>
          )}
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

  // 영화 화면 배우 목록: 전체 표시
  const displayActors = mainActorDetails

  if (mode === 'movie') {
    return (
      <div className="movie-card" onClick={onClick}>
        {/* 1줄: 포스터 + 영화 정보 */}
        <div className="movie-card-top-row">
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
          </div>
        </div>
        {/* 2줄: 주연배우 2열 그리드 */}
        {displayActors.length > 0 && (
          <div className="movie-card-actors--grid">
            {displayActors.map((a) => (
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
    )
  }

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

        {matchedActors.length > 0 && (
          <div className="movie-card-actors">
            {matchedActors.map((a) => (
              <div key={a.name} className="movie-card-actor">
                <div className="movie-card-actor-name">{a.name}</div>
                <div className="movie-card-actor-detail">{a.role}</div>
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
      </div>
    </div>
  )
}


function ActorSearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialQ = searchParams.get('q') ?? '톰 크루즈'
  const [query, setQuery] = useState(initialQ)
  const [search, setSearch] = useState(initialQ)

  // URL 쿼리 파라미터 변경 시 검색어 반영 (영화 화면 배우 클릭 등)
  useEffect(() => {
    const q = searchParams.get('q') ?? '톰 크루즈'
    setQuery(q)
    setSearch(q)
  }, [searchParams])

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

  const handleSearch = () => {
    setSearch(query)
    setSearchParams({ q: query })
  }
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
              <MovieCard key={movie.id} movie={movie} search={search} mode="actor" onClick={() => {}} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}

function MovieSearchPage({ onActorClick }: { onActorClick: (actorName: string) => void }) {
  const [query, setQuery] = useState('')
  const [search, setSearch] = useState('')

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
              <MovieCard key={movie.id} movie={movie} search={search} mode="movie" onClick={() => {}} onActorClick={onActorClick} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}

// TODO: API 서버 연동 시 업로드 이미지 분석 결과로 교체
const PHOTO_SEARCH_DUMMY_ACTOR = '톰 크루즈'
const PHOTO_SEARCH_DUMMY_IMAGE = '/images/tomcruze.jpg'

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

  // TODO: API 서버 연동 시 실제 검색 결과로 교체
  const q = PHOTO_SEARCH_DUMMY_ACTOR.toLowerCase()
  const filteredMovies = SAMPLE_MOVIES.filter((m) =>
    m.actors.some((a) => a.name.toLowerCase().includes(q))
  )
  const matchedActors: Actor[] = Array.from(
    new Map(
      filteredMovies
        .flatMap((m) => m.actors)
        .filter((a) => a.name.toLowerCase().includes(q))
        .map((a) => [a.name, a])
    ).values()
  )

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

      {/* TODO: API 서버 연동 시 실제 인식 결과로 교체 */}
      <div className="photo-search-result-label">
        샘플 검색 결과입니다. 배우 사진이 <strong>{PHOTO_SEARCH_DUMMY_ACTOR}</strong>인 경우 아래처럼 표시됩니다.
      </div>

      {matchedActors.length > 0 && (
        <section className="result-section">
          <div className="section-title">배우</div>
          <div className="actor-list">
            {matchedActors.map((a) => (
              <ActorCard key={a.name} actor={{ ...a, imageUrl: a.imageUrl ?? PHOTO_SEARCH_DUMMY_IMAGE }} allMovies={filteredMovies} />
            ))}
          </div>
        </section>
      )}

      {filteredMovies.length > 0 && (
        <section className="result-section">
          <div className="section-title">영화 ({filteredMovies.length})</div>
          <div className="movie-grid has-search">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} search={PHOTO_SEARCH_DUMMY_ACTOR} mode="actor" onClick={() => {}} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}

function ActorProfilePage() {
  const [searchParams] = useSearchParams()
  const actorName = searchParams.get('actor') ?? ''

  // 해당 배우의 모든 roleImages 수집 (영화 제목, 배역 이름 포함)
  const allRoleImages = SAMPLE_MOVIES
    .flatMap((m) => {
      const a = m.actors.find((a) => a.name === actorName)
      if (!a) return []
      return (a.roleImages ?? []).map((img) => ({ img, movieTitle: m.title, role: a.role, releaseDate: m.releaseDate }))
    })

  const actor = SAMPLE_MOVIES
    .flatMap((m) => m.actors)
    .find((a) => a.name === actorName)

  if (!actor) {
    return <div className="empty-state">배우 정보를 찾을 수 없습니다.</div>
  }

  return (
    <>
      <div className="actor-profile-header">
        <div className="actor-profile-image">
          {actor.imageUrl
            ? <img src={actor.imageUrl} alt={actor.name} />
            : <span>이미지 없음</span>
          }
        </div>
        <div className="actor-profile-info">
          <div className="actor-profile-name">{actor.name}</div>
          <div className="actor-profile-meta">
            <span className="actor-profile-meta-label">출생연도</span>
            <span>{actor.birthYear}년</span>
          </div>
          <div className="actor-profile-meta">
            <span className="actor-profile-meta-label">국적</span>
            <span>{actor.nationality}</span>
          </div>
          <div className="actor-profile-meta">
            <span className="actor-profile-meta-label">데뷔일</span>
            <span>{actor.debutDate}</span>
          </div>
        </div>
      </div>

      {allRoleImages.length > 0 && (
        <section className="result-section">
          <div className="section-title">영화 속 이미지 ({allRoleImages.length})</div>
          <div className="actor-profile-images-grid">
            {allRoleImages.map((item, i) => (
              <div key={i} className="actor-profile-image-item">
                <img src={item.img} alt={`${actor.name} ${i + 1}`} />
                <div className="actor-profile-image-caption">
                  <span className="actor-profile-image-movie">{item.movieTitle}</span>
                  <span className="actor-profile-image-role">{item.role}</span>
                  <span className="actor-profile-image-date">{item.releaseDate}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {allRoleImages.length === 0 && (
        <div className="empty-state">등록된 이미지가 없습니다.</div>
      )}
    </>
  )
}

function App() {
  const navigate = useNavigate()

  const handleActorClick = (actorName: string) => {
    navigate(`/actors?q=${encodeURIComponent(actorName)}`)
  }

  return (
    <div className="app">
      <header className="header">
        <NavLink to="/actors" className="header-left">
          <img src="/favicon.svg" alt="actors 로고" className="header-favicon" />
          <div className="header-logo">actors</div>
        </NavLink>
        <nav className="header-nav">
          <NavLink to="/actors" className={({ isActive }) => `nav-item${isActive ? ' nav-item--active' : ''}`}>배우</NavLink>
          <NavLink to="/movies" className={({ isActive }) => `nav-item${isActive ? ' nav-item--active' : ''}`}>영화</NavLink>
          <NavLink to="/photos" className={({ isActive }) => `nav-item${isActive ? ' nav-item--active' : ''}`}>사진 검색</NavLink>
          <NavLink to="/profiles" className={({ isActive }) => `nav-item${isActive ? ' nav-item--active' : ''}`}>배우 프로필</NavLink>
        </nav>
      </header>

      <main className="main">
        <Routes>
          <Route path="/" element={<ActorSearchPage />} />
          <Route path="/actors" element={<ActorSearchPage />} />
          <Route path="/movies" element={<MovieSearchPage onActorClick={handleActorClick} />} />
          <Route path="/photos" element={<PhotoSearchPage />} />
          <Route path="/profiles" element={<ActorProfilePage />} />
        </Routes>
      </main>

      <footer className="footer">actors by danielk0121</footer>
    </div>
  )
}

export default App
