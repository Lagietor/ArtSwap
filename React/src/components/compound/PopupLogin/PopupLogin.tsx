import "./popupLogin.css";
import useApi from "../../../customHooks/useApi";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { Cookies } from "react-cookie";
import GoogleButton from "../../atomic/GoogleButton/GoogleButton";
import GithubButton from "../../atomic/GithubButton/GithubButton";
import FormInput from "../../atomic/FormInput/FormInput";
import FormPasswordInput from "../../atomic/FormPasswordInput/FormPasswordInput";
import SubmitButton from "../../atomic/SubmitButton/SubmitButton";
import useUserStore from "../../../store/useUserStore";

function PopupLogin({ close }: {close: () => void }) {
    const apiUrl = import.meta.env.VITE_API_URL;

    const navigate = useNavigate();
    const cookies = new Cookies();
    const { setUser } = useUserStore();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<{email: string, password: string}>();

    const { isLoading, response, error, fetchData: handleSubmitApi } = useApi(apiUrl + "login_check", "POST");

    useEffect(() => {
        document.documentElement.style.setProperty("--input-width", "100%");

        const fetchUser = async () => {
            if (response) {
                try {
                    setUser(response["user"]);
                    cookies.set("userToken", response["token"], { path: '/' });

                    window.location.reload();
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };

        fetchUser();
    }, [response]);

    const onSubmit: SubmitHandler<{ username: string, password: string}> = async(data) => {
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
        <div className="p-2 border border-info rounded bg-info">
            <div className="d-flex justify-content-end">
                <button className="btn-close" onClick={close}></button>
            </div>
            <div className="px-5">
                <h2 className="text-light"> Log in </h2>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)} className="my-5">
                        {error && (
                            <p className="alert alert-danger p-2">
                                {(error["response"]["data"]["message"])}
                            </p>
                        )}

                        <FormInput
                            type="email"
                            id="username"
                            register={register}
                            errors={errors}
                            placeholder="Enter email"
                        />
                        <FormPasswordInput
                            id="password"
                            register={register}
                            errors={errors}
                            placeholder="Enter password"
                            errorsEnabled={false}
                        />
                        <div className="d-grid gap-2">
                            <SubmitButton
                                isLoading={isLoading}
                                text="login"
                            />
                        </div>
                        <small className="text-light">If you do not have an account <a onClick={handleSignInClick}>Sign In</a></small>
                    </form>
                </div>
                <div className="social-buttons">
                    <GoogleButton />
                    <GithubButton />
                </div>
            </div>
        </div>
    )
}

export default PopupLogin;