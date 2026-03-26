import axios from "axios"
import { useState } from "react"
import ReactCountryFlag from "react-country-flag"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons'


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
  //apiKey passkey for the api
  const apiKey = import.meta.env.VITE_API_KEY

  // const for the film and search
  const [films, setFilms] = useState([])
  const [search, setSearch] = useState("")

  // const for the serie
  const [serieTV, setSerieTv] = useState([])

  //rating star
  const renderStars = (averageVote) => {
    const vote = Math.ceil(averageVote / 2)
    const result = []

    for (let i = 1; i <= 5; i++) {
      if (i <= vote) {
        result.push(<FontAwesomeIcon key={i} icon={solidStar} />)
      } else {
        result.push(<FontAwesomeIcon key={i} icon={regularStar} />)
      }
    }

    return result
  }


  //function for get film and serieTV from API
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

      <div className="row row-cols-2 row-cols-md-4 g-3 p-3">
        {films.map((film) => (
          <div key={film.id} className="card">
            <img src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`} alt={film.title} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{film.title}</h5>
              <h1>Title: {film.original_title}</h1>
              <p>
                Language:{" "}
                {getCountryCode(film.original_language) ? (
                  <ReactCountryFlag
                    countryCode={getCountryCode(film.original_language)} svg />
                ) : (
                  "🏳️"
                )}
              </p>
              <p>voto: {renderStars(film.vote_average)}</p>
            </div>
          </div>
        ))}
      </div>


      <div className="row row-cols-2 row-cols-md-4 g-3 px-3">
        {serieTV.map((serie) => (
          <div key={serie.id} className="card">
            <img src={`https://image.tmdb.org/t/p/w500/${serie.poster_path}`} alt={serie.name} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{serie.name}</h5>
              <h1>Title: {serie.original_name}</h1>
              <p>
                Language:{" "}
                {getCountryCode(serie.original_language) ? (
                  <ReactCountryFlag
                    countryCode={getCountryCode(serie.original_language)} svg />
                ) : (
                  "🏳️"
                )}
              </p>
              <p>voto: {renderStars(serie.vote_average)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
