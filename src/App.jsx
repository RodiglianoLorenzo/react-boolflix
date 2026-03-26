import axios from "axios"
import { useState } from "react"

function App() {

  const apiKey = import.meta.env.VITE_API_KEY


  const [films, setFilms] = useState([])
  const [search, setSearch] = useState("")

  const handlesearchFilms = () => {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search}&language=it-IT`)
      .then(res => {
        setFilms(res.data.results)
      })
      .catch(err => {
        console.error(err)
      })
  }

  return (
    <div>
      <h1>Serach Film 🎬</h1>

      <input type="text" placeholder="Search film..." value={search} onChange={(e) => setSearch(e.target.value)} />
      <button onClick={handlesearchFilms}>Search</button>

      <div>
        {films.map((film) => (
          <div key={film.id} className="card">
            <div className="card-body">
              <h5 className="card-title">{film.title}</h5>
              <p>Title: {film.original_title}</p>
              <p className="card-text">Language: {film.original_language}</p>
              <p>voto: {film.vote_average}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
