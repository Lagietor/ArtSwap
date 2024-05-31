import { useState } from "react";
import UserSettingsForm from "../../components/compound/UserSettingsForm/UserSettingsForm";
import AdjustmentsSettingsForm from "../../components/compound/AdjustmentsSettingsForm/AdjustmentsSettingsForm";
import useUser from "../../customHooks/useUser";
import { useNavigate } from "react-router-dom";
import User from "../../types/User";
import "./Settings.css";

function Settings() {
    const { isLogged, user } = useUser();
    const [ activeTab, setActiveTab ] = useState("user");
    const navigate = useNavigate();

    if (!isLogged) {
        navigate("/");
        return null;
    }

    return (
        <div className="container rounded mt-4 bg-light">
            <div className="row">
                <div className="col-2 border-end">
                    <div className="input">
                            <button className={`value ${activeTab === "user" ? "active" : ""}`} onClick={() => setActiveTab("user")}>
                                User
                            </button>
                            <button className={`value ${activeTab === "adjustments" ? "active" : ""}`} onClick={() => setActiveTab("adjustments")}>
                                Adjustments
                            </button>
                            <button className={`value ${activeTab === "more" ? "active" : ""}`} onClick={() => setActiveTab("more")}>
                                More soon...
                            </button>
                        </div>
                </div>
                <div className="col">
                    {user ? (
                        <>
                            {activeTab === "user" && (
                                <UserSettingsForm user={user as User}/>
                            )}
                            {activeTab === "adjustments" && (
                                <AdjustmentsSettingsForm />
                            )}
                        </>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default Settings;