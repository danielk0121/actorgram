# Proposal — Actor / Cast 용어 정리

## 배경

유비쿼터스 언어 테이블에서 아래 불일치가 발견됨.

| 한글 | 영어 | 소스코드 | 문제 |
|---|---|---|---|
| 출연진 | Cast | `actors` | Cast인데 소스코드는 Actor 복수형 |
| 주연배우 | Main Cast | `mainActors` | 영어는 Cast, 소스코드는 Actors — 불일치 |

## Actor vs Cast 영어 의미 차이

- **Actor** = 배우라는 직업/인물 자체
- **Cast** = 특정 작품에 캐스팅된 배우들의 집합

## 예문으로 본 소스코드 대응

> "미션 임파서블 영화에 톰 크루즈 배우가 주연배우로 출연하고 배역은 이단 헌트 역이다."

| 문장 속 개념 | 소스코드 |
|---|---|
| 미션 임파서블 (작품) | `Movie { id: 19, title: '미션 임파서블' }` |
| 톰 크루즈 (배우) | `Actor { id: 1, name: '톰 크루즈' }` |
| 출연 (배우 × 작품 관계) | `CastEntry { id: 1, actorId: 1, role: '이단 헌트' }` |
| 주연배우 (주요 출연 여부) | `Movie.mainActors: [1]` — actorId 1이 포함됨 |
| 배역 이단 헌트 | `CastEntry.role: '이단 헌트'` |

## 현재 문제

`Movie.mainActors`는 actorId 목록인데 이름이 `mainActors`(Actor 기반).
그러나 "주연 여부"는 출연(CastEntry) 단위가 아니라 배우(Actor) 단위로 결정됨.
→ 톰 크루즈라는 **배우**가 주연인 것이지, 이단 헌트라는 **배역**이 주연인 것이 아님.

따라서 `mainActors`는 의미상 정확함. Actor 기준으로 주연을 판별하는 것이 맞음.

## 결론

| 항목 | 현재 | 제안 | 비고 |
|---|---|---|---|
| 출연진 소스코드 | `actors` (Movie.cast) | `cast` | 이미 방안B에서 `Movie.cast`로 변경됨 |
| 주연배우 소스코드 | `mainActors` | `mainActors` 유지 | Actor 단위 판별이 맞으므로 그대로 |
| 유비쿼터스 언어 출연진 소스코드 표기 | `actors` | `cast` | PRD 테이블 수정 필요 |
