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
import Settings from "./pages/Settings/Settings";
import CreateCollection from "./pages/CreateCollection/CreateCollection";
import CreateItem from "./pages/CreateItem/CreateItem";
import EditItem from "./pages/EditItem/EditItem";
import EditCollection from "./pages/EditCollection/EditCollection";
import Footer from "./components/compound/Footer/Footer";

function App() {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    return (
        <div className="app-wrapper">
            <BrowserRouter>
                <GoogleOAuthProvider clientId={clientId}>
                    <Header />
                
                    <div className="content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="/item/:id/edit" element={<EditItem />} />
                            <Route path="/collection/:id/edit" element={<EditCollection />} />
                            <Route path="/collection/create" element={<CreateCollection />} />
                            <Route path="/collection/:id" element={<Collection />} />
                            <Route path="/collection/:id/item/create" element={<CreateItem />} />
                            <Route path="/collection/:collectionId/item/:itemId" element={<Item />} />
                        </Routes>
                    </div>
                    <Footer />
                </GoogleOAuthProvider>
            </BrowserRouter>
        </div>
    )
}

export default App
