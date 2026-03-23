import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import { ScrollToTop } from './components/ScrollToTop'
import './App.css'
import { ActorSearchPage } from './pages/ActorSearchPage'
import { MovieSearchPage } from './pages/MovieSearchPage'
import { PhotoSearchPage } from './pages/PhotoSearchPage'
import { AiSearchPage } from './pages/AiSearchPage'
import { ActorDetailPage } from './pages/ActorDetailPage'
import { MovieDetailPage } from './pages/MovieDetailPage'
import { AboutPage } from './pages/AboutPage'

function App() {
  const navigate = useNavigate()

  const handleActorClick = (actorId: number) => {
    navigate(`/actor-detail?actorId=${actorId}`)
  }


  return (
    <div className="app">
      <ScrollToTop />
      <header className="header">
        <div className="header-inner">
          <div className="header-row1">
            <NavLink to="/actors" className="header-left">
              <img src={`${import.meta.env.BASE_URL}favicon.svg`} alt="actors 로고" className="header-favicon" />
              <div className="header-logo-wrap">
                <div className="header-logo">actors</div>
                <div className="header-version">v260323-1539</div>
              </div>
            </NavLink>
            <nav className="header-nav">
              <NavLink to="/actors" className={({ isActive }) => `nav-item${isActive ? ' nav-item--active' : ''}`}>배우</NavLink>
              <NavLink to="/movies" className={({ isActive }) => `nav-item${isActive ? ' nav-item--active' : ''}`}>영화</NavLink>
              <NavLink to="/photos" className={({ isActive }) => `nav-item${isActive ? ' nav-item--active' : ''}`}>사진 검색</NavLink>
              <NavLink to="/ai" className={({ isActive }) => `nav-item${isActive ? ' nav-item--active' : ''}`}>AI 검색</NavLink>
              <NavLink to="/about" className={({ isActive }) => `nav-item nav-item--about${isActive ? ' nav-item--active' : ''}`}>?</NavLink>
            </nav>
          </div>
        </div>
        <div className="header-row2-outer">
          <div className="header-row2">
            <nav className="header-nav">
              <NavLink to="/actor-detail" className={({ isActive }) => `nav-item${isActive ? ' nav-item--active' : ''}`}>배우 상세</NavLink>
              <NavLink to="/movie-detail" className={({ isActive }) => `nav-item${isActive ? ' nav-item--active' : ''}`}>영화 상세</NavLink>
            </nav>
          </div>
        </div>
      </header>

      <main className="main">
        <Routes>
          <Route path="/" element={<ActorSearchPage />} />
          <Route path="/actors" element={<ActorSearchPage />} />
          <Route path="/movies" element={<MovieSearchPage onActorClick={handleActorClick} />} />
          <Route path="/photos" element={<PhotoSearchPage />} />
          <Route path="/ai" element={<AiSearchPage />} />
          <Route path="/actor-detail" element={<ActorDetailPage />} />
          <Route path="/movie-detail" element={<MovieDetailPage />} />
          <Route path="/profiles" element={<ActorDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>

      <footer className="footer">actors by danielk0121</footer>
    </div>
  )
}

export default App
