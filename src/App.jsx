import {BrowserRouter,Route,Routes} from "react-router-dom"
import Welcome from "./components/Welcome"
import Intruction from "./components/Intruction"
import Quiz from "./components/Quiz"
import Result from "./components/Result"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome/>}/>
        <Route path="/instruction" element={<Intruction/>}/>
        <Route path="/quiz" element={<Quiz/>}/>
        <Route path="/result" element={<Result/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
