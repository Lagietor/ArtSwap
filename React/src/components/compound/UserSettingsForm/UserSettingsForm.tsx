import { SubmitHandler, useForm } from "react-hook-form";
import useApi from "../../../customHooks/useApi";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import { Cookies } from "react-cookie";
import User from "../../../types/UserType";
import FormInput from "../../atomic/FormInput/FormInput";
import FormPasswordInput from "../../atomic/FormPasswordInput/FormPasswordInput";
import FormConfirmPasswordInput from "../../atomic/FormConfirmPasswordInput/FormConfirmPasswordInput";
import SubmitButton from "../../atomic/SubmitButton/SubmitButton";
import FormFileInput from "../../atomic/FormFileInput/FormFileInput";

function UserSettingsForm({ user }: {user: User}) {
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
            <h3 className="text-center text-light mt-5">User Details</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="my-5">
                <FormInput
                    id="email"
                    register={register}
                    errors={errors}
                    placeholder="Enter email"
                    require={false}
                />
                <FormInput
                    id="username"
                    register={register}
                    errors={errors}
                    placeholder="Enter username"
                    require={false}
                />
                <FormPasswordInput
                    id="password"
                    register={register}
                    errors={errors}
                    placeholder="Enter password"
                    require={false}
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
                        isLoading={isLoading}
                        text="Save"    
                    />
                </div>
            </form>
            <h3 className="text-center text-light">User Images</h3>
            <form className="my-5">
                <div className="form-group">
                    <h5 className="text-center text-light">Profile image</h5>
                    <FormFileInput
                        label="Profile picture"
                        id="profilePicture"
                        register={register}
                        errors={errors}
                    />
                    <div className="d-flex justify-content-center">
                        <img src="profileImages/BUBBA.jpg" className="rounded-circle" width="150px" height="150px"/>
                    </div>
                </div>
                <div className="form-group align-items-center">
                <h5 className="text-center text-light">Background image</h5>
                <FormFileInput
                    label="Background picture"
                    id="backgroundPicture"
                    register={register}
                    errors={errors}
                />
                <div className="col d-flex justify-content-center">
                    <img src="backgroundImages/maze.jpg" className="rounded" width="400px" height="200px"/>
                </div>
                </div>
                <div className="d-flex justify-content-center">
                    <SubmitButton 
                        isLoading={isLoading}
                        text="Save"    
                    />
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default UserSettingsForm;