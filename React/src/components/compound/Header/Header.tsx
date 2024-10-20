import "./Header.css";
import LoginModal from "../LoginModal/LoginModal";
import { useLocation, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import { useEffect, useState } from "react";
import isUserLogged from "../../../utils/isUserLogged";
import useUserStore from "../../../store/useUserStore";
import ConnectMetaMaskButton from "../../atomic/ConnectMetaMaskButton/ConnectMetaMaskButton";
import WalletBalance from "../../atomic/WalletBalance/WalletBalance";

function Header() {
    const navigate = useNavigate();
    const isLogged = isUserLogged();
    const { search } = useLocation();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const { clearUser, user } = useUserStore();

    useEffect(() => {
        const params = new URLSearchParams(search);
        const autoLogin = params.get("autoLogin");
        if (autoLogin) {
            setShowLoginModal(true);
        }
    });

    const handleLogout = () => {
        const cookies = new Cookies();
        cookies.remove("userToken", { path: "/" });
        clearUser();
        navigate("/");
        window.location.reload();
    }

    const handleProfile = () => {
        navigate("/profile");
        window.location.reload();
    }

    const handleSettings = () => {
        navigate("/settings");
        window.location.reload();
    }

    const handleCreateCollection = () => {
        navigate("/collection/create");
        window.location.reload();
    }

    return(
        <>
            <LoginModal open={showLoginModal} handleClose={() => setShowLoginModal(false)} />
            <nav className="header navbar navbar-expand-lg navbar-light bg-info">
                <div className="container-fluid p-2 mx-5">
                    <a className="navbar-brand" href="#" onClick={() => navigate("/")}><img src="/logofull.png" width="60px"></img></a>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
                        <div>
                        {!isLogged ? (
                                <button className="btn btn-primary" onClick={() => setShowLoginModal(true)}>
                                    Log in
                                </button>
                            ) : (
                                <div className="d-flex justify-content-end">
                                    {!user?.ethAddress ? (
                                        <ConnectMetaMaskButton />
                                    ) : (
                                        <WalletBalance user={user} />
                                    )}
                                    <button className="btn btn-primary mx-5" onClick={handleCreateCollection}>Create</button>
                                    <div className="dropdown">
                                        <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown">
                                            <img src={user?.profileImage || "/defaultImages/profile_default.jpg"} alt="profile image" className="rounded-circle profile-img-header" />
                                        </a>
                                        <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end text-small">
                                            <li>
                                                <a className="dropdown-item" href="#" onClick={handleProfile}>Profile</a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="#" onClick={handleSettings}>Settings</a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="#" onClick={handleLogout}>Log out</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;