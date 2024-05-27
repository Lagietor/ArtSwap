import {BrowserRouter, Routes, Route} from "react-router-dom";
import "./custom.scss";
import "./App.css"
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Register from "./pages/Register";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Collection from "./pages/Collection/Collection";

function App() {
  return (
    <BrowserRouter>
        <GoogleOAuthProvider clientId="219657399493-oiv4hv2f5h1f8rrejnb2cl87i02jj7q6.apps.googleusercontent.com">
            <Header />
        </GoogleOAuthProvider>
        <div className="container-fluid">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/collection/:id" element={<Collection />} />
            </Routes>
        </div>

    </BrowserRouter>
  )
}

export default App
