import { UseCardContext } from "../context/CardContext"
import { Link } from "react-router-dom"

export default function AppHeader() {

    const { search, setSearch, handlesearchFilms, handleSubmite } = UseCardContext()



    return (
        <header className="bg-dark text-white py-3 shadow">
            <div className="container d-flex justify-content-between align-items-center">
                <h1 className="text-decoration-none text-danger">🎬 BoolFlix</h1>

                <form onSubmit={handleSubmite} className="d-flex">
                    <input type="text" className="form-control me-2" placeholder="Cerca film o serie..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    <button type="submit" className="btn btn-danger" onClick={handlesearchFilms}>
                        Cerca
                    </button>
                </form>

            </div>
        </header >
    )
}
