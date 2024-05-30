import { useForm, SubmitHandler } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import { useEffect } from "react";
import useApi from "../../customHooks/useApi";
import useUser from "../../customHooks/useUser";
import 'react-toastify/dist/ReactToastify.css';

function Register() {
    const { isLogged } = useUser();
    const navigate = useNavigate();

    if (isLogged) {
        navigate("/");
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm<{email: string, username: string, password: string, confirmPassword: string}>();

    const { isLoading, response, error, fetchData: handleSubmitApi } = useApi("http://localhost:1000/api/register", "POST");
    const password = watch('password', '');
    const cookies = new Cookies();

    useEffect(() => {
        if (response) {
            cookies.set("userToken", response["token"]);
            window.location.reload();
        }
    }, [response]);

    const onSubmit: SubmitHandler<{ email: string; password: string}> = async (data) => {
        try {
            await handleSubmitApi(data);
        } catch (error) {
            toast.error('Registration failed!');
        }
    }


    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)} className="my-5">
                { error && (
                    <p className="alert alert-danger">{error["response"]["data"]["message"]}</p>
                )}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                        {...register('email', { required: true })}
                    />
                    {errors.email && <span className="text-danger">This field is required</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Enter username"
                        {...register('username', { required: true })}
                    />
                    {errors.username && <span className="text-danger">This field is required</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter password"
                        {...register('password', {
                            required: true,
                            minLength: 6,
                            pattern: /(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/
                        })}
                    />
                    {errors.password && errors.password.type === 'required' && (
                        <span className="text-danger">This field is required</span>
                    )}
                    {errors.password && errors.password.type === 'minLength' && (
                        <span className="text-danger">Password must be at least 6 characters long</span>
                    )}
                    {errors.password && errors.password.type === 'pattern' && (
                        <span className="text-danger">
                            Password must contain at least one number, one uppercase letter, and one special character
                        </span>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        placeholder="Confirm password"
                        {...register('confirmPassword', {
                            validate: (value) => value === password || 'The passwords do not match'
                        })}
                    />
                    {errors.confirmPassword && typeof errors.confirmPassword === 'string' &&
                        <span className="text-danger">{errors.confirmPassword["message"]}</span>
                    }
                </div>
                {isLoading ? (
                    <button type="submit" className="btn btn-primary disabled">
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    </button>
                ) : (
                    <button type="submit" className="btn btn-primary">Register</button>
                )}
            </form>
            <ToastContainer />
        </div>
    )
}

export default Register;