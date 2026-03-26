import axios from "axios"
import { useState } from "react"
import ReactCountryFlag from "react-country-flag"

// country code
const languageToCountry = {
  it: "IT",
  en: "US",
  fr: "FR",
  es: "ES",
  de: "DE",
  ja: "JP",
  zh: "CN",
  ko: "KR",
  ru: "RU",
  pt: "PT",
};

const getCountryCode = (lang) => languageToCountry[lang]

function App() {

  const apiKey = import.meta.env.VITE_API_KEY


  const [films, setFilms] = useState([])
  const [search, setSearch] = useState("")


  const [serieTV, setSerieTv] = useState([])


  const handlesearchFilms = () => {
    Promise.all([
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search}&language=it-IT`),
      axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&language=it-IT&query=${search}`)
    ])
      .then(([filmRes, serieRes]) => {
        setFilms(filmRes.data.results)
        setSerieTv(serieRes.data.results)
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

      <div className="row">
        <div className="col">
          {films.map((film) => (
            <div key={film.id} className="card">
              <div className="card-body">
                <h5 className="card-title">{film.title}</h5>
                <p>Title: {film.original_title}</p>
                <p>
                  Language:{" "}
                  {getCountryCode(film.original_language) ? (
                    <ReactCountryFlag
                      countryCode={getCountryCode(film.original_language)} svg />
                  ) : (
                    "🏳️"
                  )}
                </p>
                <p>voto: {film.vote_average}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="row">
        <div className="col">
          {serieTV.map((serie) => (
            <div key={serie.id} className="card">
              <div className="card-body">
                <h5 className="card-title">{serie.name}</h5>
                <p>Title: {serie.original_name}</p>
                <p>
                  Language:{" "}
                  {getCountryCode(serie.original_language) ? (
                    <ReactCountryFlag
                      countryCode={getCountryCode(serie.original_language)} svg />
                  ) : (
                    "🏳️"
                  )}
                </p>
                <p>voto: {serie.vote_average}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
