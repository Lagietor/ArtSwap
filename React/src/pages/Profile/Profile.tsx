import { useNavigate } from "react-router-dom";
import useUser from "../../customHooks/useUser";
import "./Profile.css";

function Profile() {
    const { isLogged, user } = useUser();
    const navigate = useNavigate();

    if (!isLogged) {
        navigate("/");
        return;
    }

    return (
        <div className="container bg-light">
            <div className="background-container">
                <img src="/backgroundImages/maze.jpg" alt="Background" />
            </div>
            <div className="bg-light pb-5 pt-3 pe-2">
                <div className="d-flex justify-content-end">
                    <button className="btn btn-light border border-secondary">Settings</button>
                </div>
            </div>
            <div className="profile-header">
                <div className="profile-picture">
                    <img src="/profileImages/BUBBA.jpg" alt="Profile Image" />
                </div>
                <div className="w-100 text-center pb-4">
                    <h1>{user.username}</h1>
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-2 ms-3">
                    <h5>My items</h5>
                    <div className="input">
                        <button className="value">
                            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" data-name="Layer 2">
                            <path fill="#7D8590"></path>
                            </svg>
                            Collected
                        </button>
                        <button className="value">
                            <svg id="Line" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#7D8590" id="XMLID_1646_"></path>
                            <path id="XMLID_1645_" fill="#7D8590"></path>
                            </svg>
                            Created
                        </button>
                    </div>
                </div>
                <div className="col me-5">
                    <input type="search" className="form-control rounded" placeholder="Search" />
                </div>
            </div>
        </div>
    );
}

export default Profile;