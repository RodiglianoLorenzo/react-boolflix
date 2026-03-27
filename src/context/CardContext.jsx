import { createContext, useContext, useState } from "react"
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons'

const CardContext = createContext()

function CreateCardContext({ children }) {

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

    const handleSubmite = (e) => {
        e.preventDefault()
        handlesearchFilms()
    }

    return (
        <CardContext.Provider value={{ search, setSearch, handlesearchFilms, films, getCountryCode, renderStars, serieTV, handleSubmite }}>
            {children}
        </CardContext.Provider>
    )
}

function UseCardContext() {

    const UseCardContext = useContext(CardContext)

    return UseCardContext
}

export { CreateCardContext, UseCardContext }



