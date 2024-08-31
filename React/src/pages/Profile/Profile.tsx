import "./Profile.css";
import { useNavigate } from "react-router-dom";
import ProfileCard from "../../components/compound/ProfileCard/ProfileCard";
import { useState } from "react";
import ProfileItems from "../../components/compound/ProfileItems/ProfileItems";
import User from "../../types/UserType";
<<<<<<< HEAD
import useUserStore from "../../store/useUserStore";
import isUserLogged from "../../utils/isUserLogged";
=======
import useUserStore from "../../store/userStore";
>>>>>>> abaed7c59c6df70ac2f869cac4e74f293032e48e

function Profile() {
    const isLogged = isUserLogged();
    const { user } = useUserStore();
    const navigate = useNavigate();
    const [activeButton, setActiveButton] = useState("all");

<<<<<<< HEAD
    if (!isLogged) {
=======
    // const { user: user2, isLogged: isLogged2, isLoading, error } = useUserStore(state => ({
    //     user: state.user,
    //     isLogged: state.isLogged,
    //     isLoading: state.isLoading,
    //     error: state.error
    // }));

    if (!isLogged || !user) {
>>>>>>> abaed7c59c6df70ac2f869cac4e74f293032e48e
        navigate("/");
        return null;
    }

    return (
        <div className="container bg-info">
            <ProfileCard user={user as User} />
            <hr />
            <div className="row">
                <div className="col-2 ms-3">
                    <h5 className="text-light">My items</h5>
                    <div className="column bg-info">
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