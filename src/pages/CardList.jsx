import { UseCardContext } from "../context/CardContext"
import ReactCountryFlag from "react-country-flag"

export default function CardList() {

    const { films, getCountryCode, renderStars, serieTV } = UseCardContext()

    return (
        <div className="container mt-4">
            <div className="row row-cols-2 row-cols-md-4 g-4">
                {films.map((film) => (
                    <div key={film.id} className="col">
                        <div className="card movie-card h-100">
                            <div className="img-wrapper">
                                <img src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`} alt={film.title} className="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title text-white">{film.title}</h5>
                                    <p className="text-white">
                                        Language:{" "}
                                        {getCountryCode(film.original_language) ? (
                                            <ReactCountryFlag
                                                countryCode={getCountryCode(film.original_language)} svg />
                                        ) : (
                                            "🏳️"
                                        )}
                                    </p>
                                    <div className="stars">
                                        <p className="text-white">voto: {renderStars(film.vote_average)}</p>
                                    </div>
                                    <div className="overlay">
                                        <h5>{film.title}</h5>
                                        <p>Original title: {film.original_title}</p>
                                        <div className="stars">{renderStars(film.vote_average)}</div>
                                        <p className="overview">{film.overview || "No description available"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>



            <div className="row row-cols-2 row-cols-md-4 g-4">
                {serieTV.map((serie) => (
                    <div key={serie.id} className="col">
                        <div className="card movie-card h-100">
                            <div className="img-wrapper">
                                <img src={`https://image.tmdb.org/t/p/w500/${serie.poster_path}`} alt={serie.title} className="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title">{serie.title}</h5>
                                    <p className="text-white">
                                        Language:{" "}
                                        {getCountryCode(serie.original_language) ? (
                                            <ReactCountryFlag
                                                countryCode={getCountryCode(serie.original_language)} svg />
                                        ) : (
                                            "🏳️"
                                        )}
                                    </p>
                                    <div className="stars">
                                        <p className="text-white">voto: {renderStars(serie.vote_average)}</p>
                                    </div>
                                    <div className="overlay">
                                        <h5>{serie.title}</h5>
                                        <p>Original title: {serie.original_title}</p>
                                        <div className="stars">{renderStars(serie.vote_average)}</div>
                                        <p className="overview">{serie.overview || "No description available"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}