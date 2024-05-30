import {BrowserRouter, Routes, Route} from "react-router-dom";
import "./custom.scss";
import "./App.css"
import Header from "./components/compound/Header/Header";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Collection from "./pages/Collection/Collection";
import Item from "./pages/Item/Item";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <BrowserRouter>
        <GoogleOAuthProvider clientId="219657399493-oiv4hv2f5h1f8rrejnb2cl87i02jj7q6.apps.googleusercontent.com">
            <Header />
        
            <div className="container-fluid">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/collection/:id" element={<Collection />} />
                    <Route path="/collection/:collectionId/item/:itemId" element={<Item />} />
                </Routes>
            </div>
        </GoogleOAuthProvider>
    </BrowserRouter>
  )
}

export default App
