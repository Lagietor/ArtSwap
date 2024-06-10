import { useGoogleLogin } from "@react-oauth/google";
import useApi from "../../../customHooks/useApi";
import { useEffect } from "react";
import { Cookies } from "react-cookie";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import "./GoogleButton.css";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

function GoogleButton() {
    const apiUrl = import.meta.env.VITE_API_URL;

    const { isLoading, response, fetchData: handleSubmitApi } = useApi(apiUrl + "google-login", "POST");

    useEffect(() => {
        if (response) {
            const cookie = new Cookies();
            cookie.set("userToken", response["token"]);
            window.location.reload();
        }
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
            {!isLoading ? (
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
            ) : (
                <div className="d-flex justify-content-center">
                    <LoadingAnimation />
                </div>
            )}
        </div>
    );
    }

export default GoogleButton;