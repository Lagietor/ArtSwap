import "./Profile.css";
import { useNavigate } from "react-router-dom";
import ProfileCard from "../../components/compound/ProfileCard/ProfileCard";
import { useState } from "react";
import ProfileItems from "../../components/compound/ProfileItems/ProfileItems";
import User from "../../types/UserType";
import useUserStore from "../../store/useUserStore";
import isUserLogged from "../../utils/isUserLogged";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-solid-svg-icons";
import ProfileCollections from "../../components/compound/ProfileCollections/ProfileCollections";

function Profile() {
    const isLogged = isUserLogged();
    const { user } = useUserStore();
    const navigate = useNavigate();
    const [activeFilterButton, setActiveFilterButton] = useState("all");
    const [activeCategoryButton, setActiveCategoryButton] = useState("items");

    if (!isLogged) {
        navigate("/");
        return null;
    }

    const changeFilterCategory = (category: string) => {
        setActiveCategoryButton(category);
        setActiveFilterButton("all");
    }

    return (
        <div className="container bg-info">
            <ProfileCard user={user as User} />
            <hr />
            <div className="row">
                <div className="col-2 ms-3">
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <a href="#" className={`nav-link ${activeCategoryButton == "items" ? "active text-dark" : "text-light"}`} onClick={() => changeFilterCategory("items")}><FontAwesomeIcon icon={faSquare} /></a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className={`nav-link ${activeCategoryButton == "collections" ? "active text-dark" : "text-light"}`} onClick={() => changeFilterCategory("collections")}><FontAwesomeIcon icon={faLayerGroup} /></a>
                        </li>
                    </ul>
                    
                    {activeCategoryButton === "items" ? (
                        <div className="column bg-info">
                            <button className={`value ${activeFilterButton === "all" && "active"}`} onClick={() => setActiveFilterButton("all")}>
                                <svg id="Line" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#7D8590" id="XMLID_1646_"></path>
                                <path id="XMLID_1645_" fill="#7D8590"></path>
                                </svg>
                                All
                            </button>
                            <button className={`value ${activeFilterButton === "collected" && "active"}`} onClick={() => setActiveFilterButton("collected")}>
                                <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" data-name="Layer 2">
                                <path fill="#7D8590"></path>
                                </svg>
                                Collected
                            </button>
                            <button className={`value ${activeFilterButton === "created" && "active"}`} onClick={() => setActiveFilterButton("created")}>
                                <svg id="Line" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#7D8590" id="XMLID_1646_"></path>
                                <path id="XMLID_1645_" fill="#7D8590"></path>
                                </svg>
                                Created
                            </button>
                        </div>
                    ) : (
                        <div className="column bg-info">
                            <button className={`value ${activeFilterButton === "all" && "active"}`} onClick={() => setActiveFilterButton("all")}>
                                <svg id="Line" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#7D8590" id="XMLID_1646_"></path>
                                <path id="XMLID_1645_" fill="#7D8590"></path>
                                </svg>
                                All
                            </button>
                        </div>
                    )}
                    </div>
                <div className="col me-5">
                    {activeCategoryButton === "items" ? (
                        <ProfileItems id={user.id as string} filter={activeFilterButton} />
                    ) : (
                        <ProfileCollections id={user.id as string} filter={activeFilterButton} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;