# 프로젝트 루트

## LLM 최우선 사항
- 프롬프트 응답, 커밋 메세지 등 거의 모든 곳에서 한글을 사용한다.
- 단, 소스 코드, 코드 변수명 등 일반적인 코딩에서는 영어를 사용한다. 코드 주석은 한글.

## 개요

여러 프론트엔드 웹 앱을 관리하는 모노레포 구조입니다.
현재 `actorsapp` 하나이며, 이후 앱이 추가될 예정입니다.

## 프로젝트 구조

```
claude_test/                  # 프로젝트 루트
├── specs/
│   ├── PRD.md               # 전체 요구사항 문서
│   ├── erd.dbml             # ERD (DBML 형식, 도메인 모델 기준)
│   └── openapi.yaml         # BFF API 명세
├── docs/
│   └── todo.md              # 작업 목록
├── actorsapp/               # 배우/영화 탐색 앱
│   ├── src/
│   │   ├── App.tsx          # 메인 앱 컴포넌트
│   │   ├── App.css          # 앱 전용 스타일
│   │   ├── index.css        # 전역 스타일 및 CSS 변수
│   │   └── main.tsx         # 진입점
│   ├── public/
│   │   └── favicon.svg      # A 글자 파비콘
│   ├── vite.config.ts       # Vite 설정 (host: 0.0.0.0, port: 40000)
│   └── package.json
└── {추가앱}/                 # 향후 앱 추가 예정
```

## 앱 목록

| 앱 | 설명 | 포트 |
|---|---|---|
| actorsapp | 배우/영화 탐색 및 검색 | 40000 |

## 공통 개발 규칙

- CSS 라이브러리(Tailwind, MUI 등) 사용 금지
- 무채색 톤 유지 (`var(--color-*)` CSS 변수 활용)
- 모바일 브레이크포인트: 420px 이하
- 유스케이스 요구사항은 `specs/PRD.md`에 기록 (기술 스택/개요 등은 README에 기록)

## 작업 흐름

1. 사용자가 PRD 명세를 전달
2. `specs/PRD.md`에 요구사항 기록
3. 해당 앱에 반영
4. 변경사항 커밋 후 즉시 푸시 (커밋과 푸시는 항상 함께)

## 커밋 규칙

- `git commit -m "메시지"` 형식 사용 (heredoc 사용 금지)
- 커밋 메시지는 간결한 한 문장으로 작성

## 버전 정보 갱신 규칙

커밋·푸시 전, 아래 절차를 반드시 수행한다.

1. `actorsapp/src/App.tsx`의 `header-version` 값을 확인한다. 형식: `v YYMMDD-HHmm`
2. 현재 한국 시간(`TZ=Asia/Seoul date +"%y%m%d-%H%M"`)과 비교한다.
3. **10분 이상 차이**가 나면 버전 값을 현재 한국 시간으로 수정한 뒤 커밋에 포함한다.
4. 10분 미만이면 그대로 둔다.

## actorsapp 실행

```bash
cd actorsapp
npm install
npm run dev   # http://0.0.0.0:40000
```
