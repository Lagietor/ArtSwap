import { useNavigate } from "react-router-dom";
import useUser from "../../customHooks/useUser";
import ProfileCard from "../../components/compound/ProfileCard/ProfileCard";
import { useState } from "react";
import ProfileItems from "../../components/compound/ProfileItems/ProfileItems";
import User from "../../types/UserType";
import "./Profile.css";

function Profile() {
    const { isLogged, user } = useUser();
    const navigate = useNavigate();
    const [activeButton, setActiveButton] = useState("all");

    if (!isLogged || !user) {
        navigate("/");
        return null;
    }

    return (
        <div className="container bg-light">
            <ProfileCard user={user as User} />
            <hr />
            <div className="row">
                <div className="col-2 ms-3">
                    <h5>My items</h5>
                    <div className="input">
                        <button className={`value ${activeButton === "all" ? "active" : ""}`} onClick={() => setActiveButton("all")}>
                            <svg id="Line" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#7D8590" id="XMLID_1646_"></path>
                            <path id="XMLID_1645_" fill="#7D8590"></path>
                            </svg>
                            All
                        </button>
                        <button className={`value ${activeButton === "collected" ? "active" : ""}`} onClick={() => setActiveButton("collected")}>
                            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" data-name="Layer 2">
                            <path fill="#7D8590"></path>
                            </svg>
                            Collected
                        </button>
                        <button className={`value ${activeButton === "created" ? "active" : ""}`} onClick={() => setActiveButton("created")}>
                            <svg id="Line" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#7D8590" id="XMLID_1646_"></path>
                            <path id="XMLID_1645_" fill="#7D8590"></path>
                            </svg>
                            Created
                        </button>
                    </div>
                </div>
                <div className="col me-5">
                    <ProfileItems id={user.id as string} filter={activeButton} />
                </div>
            </div>
        </div>
    );
}

export default Profile;