import { useForm, SubmitHandler } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import { useEffect, useState } from "react";
import useApi from "../../customHooks/useApi";
import "react-toastify/dist/ReactToastify.css";
import FormInput from "../../components/atomic/FormInput/FormInput";
import FormPasswordInput from "../../components/atomic/FormPasswordInput/FormPasswordInput";
import FormConfirmPasswordInput from "../../components/atomic/FormConfirmPasswordInput/FormConfirmPasswordInput";
import SubmitButton from "../../components/atomic/SubmitButton/SubmitButton";
import isUserLogged from "../../utils/isUserLogged";
import useUserStore from "../../store/useUserStore";
import fetchUserData from "../../utils/fetchUserData";

function Register() {
    const apiUrl = import.meta.env.VITE_API_URL;

    const isLogged = isUserLogged();
    const navigate = useNavigate();
    const [isInitializingUser, setIsInitializingUser] = useState(false);
    const { setUser } = useUserStore();

    if (isLogged) {
        navigate("/");
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm<{email: string, username: string, password: string, confirmPassword: string}>();

    const { isLoading, response, error, fetchData: handleSubmitApi } = useApi(apiUrl + "register", "POST");
    const password = watch("password", "");
    const cookies = new Cookies();

    useEffect(() => {
        const fetchUser = async () => {
            if (response) {
                try {
                    setIsInitializingUser(true);
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

    const onSubmit: SubmitHandler<{ email: string; password: string}> = async (data) => {
        try {
            await handleSubmitApi(data);
        } catch (error) {
            toast.error("Registration failed!");
        }
    }


    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)} className="my-5">
                { error && (
                    <p className="alert alert-danger">{error["response"]["data"]["message"]}</p>
                )}
                <FormInput
                    id="email"
                    register={register}
                    errors={errors}
                    placeholder="Enter email"
                />
                <FormInput
                    id="username"
                    register={register}
                    errors={errors}
                    placeholder="Enter username"
                />
                <FormPasswordInput
                    id="password"
                    register={register}
                    errors={errors}
                    placeholder="Enter password"
                />
                <FormConfirmPasswordInput
                    id="confirmPassword"
                    register={register}
                    errors={errors}
                    password={password}
                    placeholder="Confirm password"
                />
                <div className="d-flex justify-content-center">
                    <SubmitButton
                        isLoading={isLoading || isInitializingUser}
                        text="Register"
                    />
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Register;