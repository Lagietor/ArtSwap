import {BrowserRouter, Routes, Route} from "react-router-dom";
import "./custom.scss";
import "./App.css"
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
        <Header />
        <div className="container-fluid">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>

    </BrowserRouter>
  )
}

export default App
