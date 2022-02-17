import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import About from "./Components/About";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import NoteState from "./Contextstate";
function App() {
  return (
    <div>
        <NoteState>
          <BrowserRouter>
            <Navbar />
            <div className="container">
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/about" element={<About />}/>
            </Routes>
            </div>
          </BrowserRouter>
        </NoteState>
    </div>
  );
}

export default App;
