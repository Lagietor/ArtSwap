import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

interface User {
    id: string,
    email: string,
    username: string,
    profileImage: string,
    backgroundImage: string,
    roles: []
}

function ProfileCard({ user }: {user: User}) {
    const navigate = useNavigate();

    const enterSettings = () => {
        navigate("/settings");
        window.location.reload();
    }

    return (
        <>
            <div className="background-container">
                <img src="/backgroundImages/maze.jpg" alt="Background" />
            </div>
            <div className="profile-header">
                <div className="profile-picture">
                    <img src="/profileImages/BUBBA.jpg" alt="Profile Image" />
                </div>
                <div className="w-100 text-center pb-4">
                    <span className="h1 text-light">{user.username}</span>
                    <div className="d-flex justify-content-end pe-3">
                        <button className="btn btn-primary border border-secondary" onClick={enterSettings}>
                            <FontAwesomeIcon icon={faGear} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileCard;