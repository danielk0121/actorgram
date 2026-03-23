# Actorgram

배우와 영화 정보를 탐색하는 웹 앱 모노레포입니다.

## 개발 방법론

### 도메인 주도 설계 (Domain-Driven Design)

- 도메인 전문가와 개발자가 공통 언어로 소통할 수 있도록 유비쿼터스 언어(Ubiquitous Language)를 정의한다.
- 코드, 문서, 커뮤니케이션 전반에서 동일한 용어를 일관되게 사용한다.
- 용어 정의는 [specs/PRD.md](specs/PRD.md)의 유비쿼터스 언어 섹션에 관리한다.
- 도메인 모델은 [specs/erd.dbml](specs/erd.dbml)을 기준으로 한다.

### 요구사항 문서 기반 개발 (Spec-Driven Development)

- 기능 구현 전에 요구사항을 [specs/PRD.md](specs/PRD.md)에 먼저 명세한다.
- PRD는 도메인별 유스케이스(사용자 시나리오)를 중심으로 작성하며, 구현은 PRD 명세를 기준으로 진행한다.
- API 명세는 [specs/openapi.yaml](specs/openapi.yaml)에 관리한다.
- 명세와 구현이 불일치할 경우 명세를 우선 수정한 뒤 코드에 반영한다.

### 프로토타입 주도 개발 (Prototype-Driven Development)

- API 연동 전에 샘플 데이터(`src/data/`)를 사용해 화면과 인터랙션을 먼저 구현한다.
- 실제 데이터 구조와 동일한 타입(`src/types/`)을 샘플 단계부터 적용한다.
- 이로인해, API 연동 시 데이터 레이어만 교체하면 화면 코드는 그대로 동작하도록 설계한다.

## 개발 단계

### Phase 1 — 프로토타입 화면 개발 및 도메인 설계 ✅

- PRD 작성 및 유비쿼터스 언어 정의
- 샘플 데이터 기반 화면 프로토타입 구현
- 도메인 모델(타입) 설계 및 검증

### Phase 2 — ERD 설계 및 API 서버 개발

- 도메인 모델 기반 ERD 설계
- REST API 서버 구현
- 프론트엔드 샘플 데이터를 API 연동으로 교체

### Phase 3 — E2E 테스트 구축 및 실행

- 주요 유스케이스 기반 E2E 시나리오 작성
- E2E 테스트 자동화 구축 및 CI 연동

## ERD

도메인 모델의 기준 문서. DBML 형식으로 [specs/erd.dbml](specs/erd.dbml)에 관리한다.
코드([actorsapp/src/types/index.ts](actorsapp/src/types/index.ts)), PRD 용어사전, API 명세([specs/openapi.yaml](specs/openapi.yaml))는 이 ERD를 기준으로 한다.

```
Actor ──────────────────────────────────────────┐
                                                 │ actorId
Movie ──── CastEntry (출연 정보, 주연 여부 포함) ──┘
               │
               └──── RoleImage (배역 이미지 목록)
```

| 테이블 | 설명 |
|---|---|
| `Actor` | 배우 마스터 |
| `Movie` | 작품 마스터 |
| `CastEntry` | 배우 × 작품 출연 기록. `isMain`으로 주연 여부 구분 |
| `RoleImage` | 배역 이미지 목록 (`CastEntry`의 `roleImages[]`를 정규화) |
| `ActorStats` | 배우 집계 통계 (Actor 1:1). `movieCount` 등 집계값을 미리 계산해 저장 |

## 프로젝트 구조

```
actorgram/
├── specs/
│   ├── PRD.md               # 전체 요구사항 문서
│   ├── erd.dbml             # ERD (DBML 형식, 도메인 모델 기준)
│   └── openapi.yaml         # BFF API 명세
├── docs/
│   └── todo.md              # 작업 목록
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
| `/` `/actors` | 배우 검색 (홈) | 배우 이름/배역으로 검색, 출연 영화 목록 확인 |
| `/movies` | 영화 검색 | 제목/장르/감독으로 검색, 영화 목록 확인 |
| `/photos` | 사진 검색 | 사진 업로드로 배우/영화 검색 (샘플 결과 표시) |
| `/ai` | AI 검색 | 자연어 질문으로 배우/영화 검색 (API 연동 예정) |
| `/actor-detail` | 배우 상세 | 배우 기본 정보 + 영화별 배역 이미지 그리드 |
| `/movie-detail` | 영화 상세 | 영화 정보 + 줄거리 + 주연배우 목록 |

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
- 요구사항은 [specs/PRD.md](specs/PRD.md)에 기록
