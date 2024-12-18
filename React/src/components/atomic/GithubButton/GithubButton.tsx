import './GithubButton.css';
import { useEffect } from 'react';
import { Cookies } from 'react-cookie';
import useApi from '../../../customHooks/useApi';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';
import useUserStore from '../../../store/useUserStore';

const GitHubButton = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const siteUrl = import.meta.env.VITE_SITE_URL;
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;

    const { isLoading, error, response, fetchData: handleSubmitApi } = useApi(apiUrl + "github-login", "POST");
    const cookies = new Cookies();
    const { setUser } = useUserStore();
    const navigate = useNavigate();
    
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (code) {
            try {
                handleSubmitApi({ "code": code });
            } catch (error) {
                console.error('Error logging in with GitHub:', error);
            }
        }
    }, []);

    useEffect(() => {
        // if (response) {
        //     const cookie = new Cookies();
        //     cookie.set("userToken", response["token"]);
        //     navigate("/");
        //     window.location.reload();
        // }
        const fetchUser = async () => {
            if (response) {
                try {
                    setUser(response["user"]);
                    cookies.set("userToken", response["token"], { path: '/' });
                    
                    navigate("/");
                    window.location.reload();
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };

        fetchUser();
    }, [response, error])

    const handleLogin = () => {
        const redirectUri = siteUrl + "?autoLogin=true";
        const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user`;

        window.location.href = githubAuthUrl;
    };


    return (
        <>
            {isLoading ? (
                <div className="d-flex justify-content-center">
                    <LoadingAnimation />
                </div>
            ) : (
                <button className="github-login-button" onClick={handleLogin}>
                    <FontAwesomeIcon icon={faGithub} /> Login with GitHub
                </button>
            )}
        </>
    );
};

export default GitHubButton;