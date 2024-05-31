import { useNavigate } from "react-router-dom";

function ProfileCard({ user }) {
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
                    <span className="h1">{user.username}</span>
                    <div className="d-flex justify-content-end pe-3">
                        <button className="btn btn-light border border-secondary" onClick={enterSettings}>Settings</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileCard;