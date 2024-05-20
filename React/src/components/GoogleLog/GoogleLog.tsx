import { GoogleLogin } from "@react-oauth/google"
import { useEffect } from "react";
import { Cookies } from "react-cookie";
import useApi from "../../customHooks/useApi";

function GoogleLog() {
    const { isLoading, response, error, fetchData: handleSubmitApi } = useApi("http://localhost:1000/api/google-login", "POST");

    useEffect(() => {
        if (response) {
            const cookie = new Cookies();
            cookie.set("userToken", response["token"]);
            window.location.reload();
        }
    }, [response]);

    return (
        <>
            { !isLoading ? (
                <GoogleLogin 
                    onSuccess={(credentialResponse) => {
                        handleSubmitApi({ "token": credentialResponse.credential});
                    }}
                    onError={() => {
                        console.log("Login Failed");
                    }}
                />
            ) : (
                <div className="spinner-border text-dark" role="status">
                    <span className="sr-only"></span>
                </div>
            )}
        </>
    );
}

export default GoogleLog;