import { SubmitHandler, useForm } from "react-hook-form";
import useApi from "../../../customHooks/useApi";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import { Cookies } from "react-cookie";
import User from "../../../types/UserType";

function UserSettingsForm({ user }: {user: User}) {
    console.log(user);
    const apiUrl = import.meta.env.VITE_API_URL;

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm<{id: string, email: string, username: string, password: string, confirmPassword: string}>();

    const { isLoading, response, error, fetchData: editUser, resetError, resetResponse } = useApi(apiUrl + "user/edit", "POST");
    const password = watch("password", "");
    const cookies = new Cookies();

    useEffect(() => {
        if (error) {
            const errorMessage = error["response"]["data"]["message"] || "Something went wrong";
            toast.error(errorMessage);
        }

        if (response) {
            cookies.set("userToken", response["token"]);
            toast.success("Changes updated!");
        }
    }, [error, response])

    const onSubmit: SubmitHandler<{id: string; email: string; username: string; password: string}> = async (data) => {
        resetError();
        resetResponse();
        data.id = user.id;
        await editUser(data);

    }

    return (
        <div className="p-3">
            <h4>User Details</h4>
            <form onSubmit={handleSubmit(onSubmit)} className="my-5">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder={user.email}
                        {...register("email")}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder={user.username}
                        {...register("username")}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter password"
                        {...register("password", {
                            minLength: 6,
                            pattern: /(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/
                        })}
                    />
                    {errors.password && errors.password.type === "minLength" && (
                        <span className="text-danger">Password must be at least 6 characters long</span>
                    )}
                    {errors.password && errors.password.type === "pattern" && (
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
                        {...register("confirmPassword", {
                            validate: (value) => value === password || "The passwords do not match"
                        })}
                    />
                    {errors.confirmPassword && typeof errors.confirmPassword === "string" &&
                        <span className="text-danger">{errors.confirmPassword["message"]}</span>
                    }
                </div>
                {isLoading ? (
                    <button type="submit" className="btn btn-primary disabled">
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    </button>
                ) : (
                    <button type="submit" className="btn btn-primary">Save</button>
                )}
            </form>
            <h4>User Images</h4>
            <form className="my-5">
                <div className="row form-group align-items-center">
                    <h5>Profile image</h5>
                    <div className="col">
                        <input type="file" className="form-control" />
                    </div>
                    <div className="col d-flex justify-content-center">
                        <img src="profileImages/BUBBA.jpg" className="rounded-circle" width="100px" height="100px"/>
                    </div>
                </div>
                <div className="row form-group align-items-center">
                <h5>Background image</h5>
                    <div className="col">
                        <input type="file" className="form-control" />
                    </div>
                    <div className="col d-flex justify-content-center">
                        <img src="backgroundImages/maze.jpg" className="rounded" width="400px" height="200px"/>
                    </div>
                </div>
                {isLoading ? (
                    <button type="submit" className="btn btn-primary disabled">
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    </button>
                ) : (
                    <button type="submit" className="btn btn-primary">Save</button>
                )}
            </form>
            <ToastContainer />
        </div>
    );
}

export default UserSettingsForm;