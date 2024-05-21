import { useEffect} from 'react';
import { Cookies } from 'react-cookie';
import useApi from '../../customHooks/useApi';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import './GithubButton.css';

const GitHubButton = () => {
    const { isLoading, error, response, fetchData: handleSubmitApi } = useApi("http://localhost:1000/api/github-login", "POST");
    const navigate = useNavigate();

    useEffect(() => {
        if (response) {
            const cookie = new Cookies();
            cookie.set("userToken", response["token"]);
            navigate("/");
            window.location.reload();
        }
    }, [response, error])

    const handleLogin = () => {
        const clientId = 'Ov23liBPuSRVeVtlU4jx';
        const redirectUri = 'http://localhost:5173?autoLogin=true';
        const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user`;

        window.location.href = githubAuthUrl;
    };

    const handleGithubCallback = async (code: string) => {
        try {
            handleSubmitApi({ "code": code });
        } catch (error) {
            console.error('Error logging in with GitHub:', error);
        }
    };

    // Check URL for GitHub OAuth code
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (code) {
            handleGithubCallback(code);
        }
    }, []);

    return (
        <>
            {isLoading ? (
                <div className="spinner-border text-dark" role="status">
                    <span className="sr-only"></span>
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