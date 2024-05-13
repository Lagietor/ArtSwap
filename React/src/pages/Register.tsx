import { useForm, SubmitHandler } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import useApi from "../customHooks/useApi";
import 'react-toastify/dist/ReactToastify.css';

function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm();

    const { isLoading, data, error, fetchData: handleSubmitApi } = useApi("http://localhost:1000/api/register", "POST");

    const onSubmit: SubmitHandler<{ email: string; password: string}> = async (data) => {
        try {
            await handleSubmitApi(data);
            toast.success('Registration successful!');
        } catch (error) {
            toast.error('Registration failed!');
        }
        console.log(data);
    }

    const password = watch('password', '');

    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)} className="my-5">
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
                    {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword.message}</span>}
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