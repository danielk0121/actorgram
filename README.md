# Actorgram

배우와 영화 정보를 탐색하는 웹 앱 모노레포입니다.

## 프로젝트 구조

```
actorgram/
├── docs/
│   └── PRD.md               # 전체 요구사항 문서
├── actorsapp/               # 배우/영화 탐색 앱
│   ├── src/
│   │   ├── types/
│   │   │   └── index.ts         # Actor, Movie 인터페이스
│   │   ├── utils/
│   │   │   └── image.ts         # img() 유틸 (BASE_URL 처리)
│   │   ├── data/
│   │   │   ├── movies.ts        # SAMPLE_MOVIES (API 교체 대상)
│   │   │   └── photoSearch.ts   # PHOTO_SEARCH_DUMMY_ACTORS (API 교체 대상)
│   │   ├── components/
│   │   │   ├── ActorCard.tsx    # 배우 카드 컴포넌트
│   │   │   └── MovieCard.tsx    # 영화 카드 컴포넌트
│   │   ├── pages/
│   │   │   ├── ActorSearchPage.tsx   # /actors
│   │   │   ├── MovieSearchPage.tsx   # /movies
│   │   │   ├── PhotoSearchPage.tsx   # /photos
│   │   │   ├── AiSearchPage.tsx      # /ai
│   │   │   ├── ActorDetailPage.tsx   # /actor-detail
│   │   │   └── MovieDetailPage.tsx   # /movie-detail
│   │   ├── App.tsx          # 라우팅 + 헤더/푸터
│   │   ├── App.css          # 앱 전용 스타일
│   │   ├── index.css        # 전역 스타일 및 CSS 변수
│   │   └── main.tsx         # 진입점
│   ├── public/
│   │   ├── favicon.svg      # 파비콘
│   │   └── icons.svg        # SVG 아이콘 스프라이트
│   ├── vite.config.ts       # Vite 설정 (host: 0.0.0.0, port: 40000)
│   └── package.json
└── CLAUDE.md                # Claude Code 작업 지침
```

## 앱 목록

| 앱 | 설명 | 포트 |
|---|---|---|
| actorsapp | 배우/영화 탐색 및 검색 | 40000 |

## actorsapp

배우와 영화 정보를 탐색하는 SPA입니다.

### 기술 스택

- **React 19** + **TypeScript**
- **Vite 8** (번들러 및 개발 서버)
- **React Router 7** (클라이언트 사이드 라우팅)
- CSS 변수 기반 커스텀 스타일 (외부 CSS 라이브러리 미사용)

### 주요 화면

| 경로 | 화면 | 설명 |
|---|---|---|
| `/` | 배우 검색 (홈) | 배우 이름/배역으로 검색, 출연 영화 목록 확인 |
| `/movies` | 영화 검색 | 제목/장르/감독으로 검색, 영화 목록 확인 |
| `/photo-search` | 사진 검색 | 사진 업로드로 배우/영화 검색 |

### 실행 방법

```bash
cd actorsapp
npm install
npm run dev   # http://localhost:40000
```

### 개발 규칙

- CSS 라이브러리(Tailwind, MUI 등) 사용 금지, `var(--color-*)` CSS 변수 활용
- 무채색 톤 유지
- 모바일 브레이크포인트: 420px 이하
- 요구사항은 `docs/PRD.md`에 기록
