import "./popupLogin.css";
import useApi from "../../customHooks/useApi";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { Cookies } from "react-cookie";
import GoogleButton from "../GoogleButton/GoogleButton";
import GithubButton from "../GithubButton/GithubButton";

function PopupLogin({ close }: {close: () => void }) {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const {
        register,
        handleSubmit,
    } = useForm<{email: string, password: string}>();

    const { isLoading, response, error, fetchData: handleSubmitApi } = useApi("http://localhost:1000/api/login", "POST");

    useEffect(() => {
        if (response) {
            cookies.set("userToken", response["token"]);
            window.location.reload();
        }
    }, [response, error]);

    const onSubmit: SubmitHandler<{ email: string, password: string}> = async(data) => {
        try {
            await handleSubmitApi(data);
        } catch (e: any) {
            console.log(e.message);
        }
    }

    const handleSignInClick = () => {
        close();
        navigate("/register");
    }

    return (
        <div className="p-2 border rounded">
            <div className="d-flex justify-content-end">
                <button className="btn-close" onClick={close}></button>
            </div>
            <div className="px-5">
                <div><h2> Log in </h2></div>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)} className="my-5">
                        {error && (
                            <p className="alert alert-danger p-2">
                                {(error["response"]["data"]["message"])}
                            </p>
                        )}
                        <div className="">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter email" {...register('email', { required: true })} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Enter password" {...register('password', { required: true })} />                      
                        </div>
                        <div className="d-grid gap-2">
                        {isLoading ? (
                            <button type="submit" className="btn btn-primary disabled">
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            </button>
                        ) : (
                            <button className="submit btn btn-primary btn-block">Login</button>
                        )}
                        </div>
                        <small className="text-muted">If you do not have an account <a onClick={handleSignInClick}>Sign In</a></small>
                    </form>
                </div>
                <div className="social-buttons">
                    <GoogleButton />
                    <GithubButton />
                </div>
                <div>
                    <p>Login with MetaMask</p>
                </div>
            </div>
        </div>
    )
}

export default PopupLogin;