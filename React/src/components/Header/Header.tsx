import Popup from "reactjs-popup";
import PopupLogin from "../PopupLogin/PopupLogin";
import { useNavigate } from "react-router-dom";
import useUser from "../../customHooks/useUser";
import { Cookies } from "react-cookie";

function Header() {
    const navigate = useNavigate();
    const { user, isLogged } = useUser();

    const handleLogout = () => {
        const cookies = new Cookies();
        cookies.remove("userToken");
        window.location.reload();
    }

    return(
        <>
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
                                <Popup
                                trigger={<button className="btn btn-primary">Log in</button>}
                                modal
                                nested
                                overlayStyle={{ background: 'rgba(0, 0, 0, 0.5)' }}
                                contentStyle={{
                                    width: '80%',
                                    maxWidth: '400px',
                                    background: '#fff',
                                    borderRadius: '5px',
                                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)'
                                }}
                            >
                                {(close: () => void) => 
                                    <PopupLogin close={close} />
                                }
                            </Popup>
                            ) : (
                                <button className="btn btn-primary" onClick={handleLogout}>Log out</button>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;