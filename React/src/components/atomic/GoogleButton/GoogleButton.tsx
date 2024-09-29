import "./GoogleButton.css";
import { useGoogleLogin } from "@react-oauth/google";
import useApi from "../../../customHooks/useApi";
import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import useUserStore from "../../../store/useUserStore";
import fetchUserData from "../../../utils/fetchUserData";

function GoogleButton() {
    const apiUrl = import.meta.env.VITE_API_URL;

    const { isLoading, response, fetchData: handleSubmitApi } = useApi(apiUrl + "google-login", "POST");
    const cookies = new Cookies();
    const { setUser } = useUserStore();
    const [isInitializingUser, setIsInitializingUser] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            if (response) {
                setIsInitializingUser(true);
                try {
                    const userData = await fetchUserData(response.token);
                    setUser(userData);
                    cookies.set("userToken", response.token, { path: '/' });
                    
                    setIsInitializingUser(false);
                    window.location.reload();
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };

        fetchUser();
    }, [response]);

    const login = useGoogleLogin({
        onSuccess: (accessResponse) => {
            try {
                handleSubmitApi({"token": accessResponse["access_token"]});
            } catch (e) {
                console.log("Error: " + e);
            }
        },
        onError: () => {
            console.error("Login Failed");
        },
    });

    return (
        <div>
            {isLoading || isInitializingUser ? (
                <div className="d-flex justify-content-center">
                    <LoadingAnimation />
                </div>
            ) : (
                <div className="google-login-container">
                <button
                    className="google-login-button"
                    onClick={() => login()}
                    disabled={isLoading}
                >
                    <FontAwesomeIcon icon={faGoogle} className="fa-google" />
                    Login with Google
                </button>
                </div>
            )}
        </div>
    );
    }

export default GoogleButton;