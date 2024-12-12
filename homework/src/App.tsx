import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import MainPage from './components/MainPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ArticleDetails from './components/ArticleDetails'

interface MovieObject {
  Poster: string
  Title: string
}

function App() {
  const [count, setCount] = useState(0)
  const [movieData, setMovieData] = useState<null | MovieObject>(null)

  useEffect(() => {
    console.log('componente montato!')
  }, [])

  return (
    <BrowserRouter>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <button
            onClick={() => setMovieData({ Poster: 'ssss', Title: 'Batman' })}
          >
            SETTA MOVIEDATA
          </button>
          {movieData && <p>{movieData.Title}</p>}
        </div>
        <section>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/articles/:id" element={<ArticleDetails />} />
          </Routes>
        </section>
      </div>
    </BrowserRouter>
  )
}

export default App
