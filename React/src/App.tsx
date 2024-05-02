import {BrowserRouter, Routes, Route} from "react-router-dom";
import "./custom.scss";
import "./App.css"
import Header from "./components/Header/Header";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
