import LoginModal from "../LoginModal/LoginModal";
import { useLocation, useNavigate } from "react-router-dom";
import useUser from "../../../customHooks/useUser";
import { Cookies } from "react-cookie";
import { useEffect, useState } from "react";

function Header() {
    const navigate = useNavigate();
    const { user, isLogged } = useUser();
    const { search } = useLocation();
    const [showLoginModal, setShowLoginModal] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(search);
        const autoLogin = params.get("autoLogin");
        if (autoLogin) {
            setShowLoginModal(true);
        }
    });

    const handleLogout = () => {
        const cookies = new Cookies();
        cookies.remove("userToken");
        navigate('/');
        window.location.reload();
    }

    const handleProfile = () => {
        navigate("/profile");
        window.location.reload();
    }

    const handleLoginModalClose = () => {
        setShowLoginModal(false);
    };

    return(
        <>
            <LoginModal open={showLoginModal} handleClose={handleLoginModalClose} />
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid p-2 mx-5">
                    <a className="navbar-brand" href="#" onClick={() => navigate("/")}>Logo</a>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                        </ul>
                        <div>
                        {!isLogged ? (
                                <button className="btn btn-primary" onClick={() => setShowLoginModal(true)}>
                                    Log in
                                </button>
                            ) : (
                                <div className="dropdown">
                                    <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown">
                                        <img src="/profileImages/BUBBA.jpg" alt="profile-picture" width="45" height="45" className="rounded-circle" />
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end text-small">
                                        <li>
                                            <a className="dropdown-item" href="#" onClick={handleProfile}>Profile</a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#">Settings</a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#" onClick={handleLogout}>Log out</a>
                                        </li>
                                    </ul>
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