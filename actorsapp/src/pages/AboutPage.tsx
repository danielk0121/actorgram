export function AboutPage() {
  return (
    <div className="about-wrap">
      <h1 className="about-title">이 서비스에 관하여</h1>

      <section className="about-section">
        <h2 className="about-section-title">서비스 개요</h2>
        <p className="about-text">
          actors는 배우와 영화를 탐색하고 검색하는 웹 앱입니다.
          배우 프로필, 출연 영화, 배역 이미지를 확인하고 사진 및 AI 검색 기능을 제공합니다.
        </p>
      </section>

      <section className="about-section">
        <h2 className="about-section-title">저작권 고지</h2>
        <p className="about-text">
          현재 앱에 표시되는 배우 사진, 영화 포스터, 스틸 이미지 등은 각 저작권자에게 저작권이 있으며,
          본 서비스는 개인 학습 및 프로토타입 목적으로 운영됩니다.
          상업적 용도로 사용되지 않습니다.
        </p>
        <ul className="about-list">
          <li>영화 포스터 및 스틸 이미지 — 각 영화 제작사 및 배급사 소유</li>
          <li>배우 프로필 사진 — 해당 사진 촬영자 및 에이전시 소유</li>
          <li>영화 정보(제목, 줄거리 등) — 각 원저작자 소유</li>
        </ul>
      </section>

      <section className="about-section">
        <h2 className="about-section-title">오픈소스 라이선스</h2>
        <p className="about-text">
          본 서비스는 아래 오픈소스 소프트웨어를 사용합니다.
        </p>
        <div className="about-license-table-wrap">
          <table className="about-license-table">
            <thead>
              <tr>
                <th>패키지</th>
                <th>버전</th>
                <th>라이선스</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>React</td><td>19</td><td>MIT</td></tr>
              <tr><td>React DOM</td><td>19</td><td>MIT</td></tr>
              <tr><td>React Router</td><td>7</td><td>MIT</td></tr>
              <tr><td>Vite</td><td>8</td><td>MIT</td></tr>
              <tr><td>TypeScript</td><td>5</td><td>Apache 2.0</td></tr>
            </tbody>
          </table>
        </div>
        <div className="about-notice">
          <strong>⚠ 고지 누락 문제</strong>
          <p>
            현재 앱에 오픈소스 저작권 고지(NOTICE, LICENSE) 파일이 없습니다.
            MIT 및 Apache 2.0 라이선스는 빌드 결과물에 원저작권자 고지를 포함할 의무가 있습니다.
            향후 배포 버전에서 NOTICE 파일 추가가 필요합니다.
          </p>
        </div>
      </section>

<section className="about-section">
        <h2 className="about-section-title">개발자</h2>
        <p className="about-text">danielk0121</p>
      </section>
    </div>
  )
}
