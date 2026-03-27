import { CreateCardContext } from "./context/CardContext"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import DefaultLayout from "./Layout/DefaultLayout"
import CardList from "./pages/CardList"

function App() {


  return (

    <CreateCardContext>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route index element={<CardList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CreateCardContext>
  )
}

export default App
