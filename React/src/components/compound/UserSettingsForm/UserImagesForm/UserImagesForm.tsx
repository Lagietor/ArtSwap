import { useEffect, useState } from 'react'
import { Cookies } from 'react-cookie';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import FormFileInput from '../../../atomic/FormFileInput/FormFileInput';
import SubmitButton from '../../../atomic/SubmitButton/SubmitButton';
import useApi from '../../../../customHooks/useApi';
import UserType from '../../../../types/UserType';
import fetchUserData from '../../../../utils/fetchUserData';

const UserImagesForm = ({ user, setUser }: {user: UserType, setUser: Function}) => {
    const apiUrl = import.meta.env.VITE_API_URL;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<{profileImage: File, backgroundImage: File}>();

    const { isLoading, response, error, fetchFile: uploadImages, resetError, resetResponse } = useApi(apiUrl + "user/" + user.id + "/images", "POST");
    const cookies = new Cookies();
    const [isInitializingUser, setIsInitializingUser] = useState(false);

    useEffect(() => {
        if (error) {
            const errorMessage = error["response"]["data"]["message"] || "Something went wrong";
            toast.error(errorMessage);
        }

        const fetchUser = async () => {
            if (response) {
                try {
                    setIsInitializingUser(true);
                    const userData = await fetchUserData(cookies.get("userToken"));
                    setUser(userData);
                    setIsInitializingUser(false);
                    
                    toast.success("Changes updated!");
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        if (response) {
            fetchUser();
        }
    }, [error, response])

    const onSubmit: SubmitHandler<{profileImage: File; backgroundImage: File}> = async (data) => {
        resetError();
        resetResponse();

        const profileImage = data.profileImage[0];
        const backgroundImage = data.backgroundImage[0];

        const formData = new FormData();
        formData.append("profileImage", profileImage);
        formData.append("backgroundImage", backgroundImage);

        await uploadImages(formData);
    }

    return (
        <>
            <h3 className="text-center text-light">User Images</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="my-5">
                <div className="form-group">
                    <div className="d-flex justify-content-center">
                        <img src={user.profileImage || "/defaultImages/profile_default.jpg"} className="rounded-circle profile-img-settings" width="150px"/>
                    </div>
                    <h5 className="text-center text-light mt-4">Profile image</h5>
                    <FormFileInput
                        label="Profile image"
                        id="profileImage"
                        register={register}
                        errors={errors}
                        require={false}
                    />
                </div>
                <div className="form-group align-items-center">
                <div className="col d-flex justify-content-center">
                    <img src={user.backgroundImage || "/defaultImages/background_default.avif"} className="rounded background-img-settings" width="500px"/>
                </div>
                <h5 className="text-center text-light mt-4">Background image</h5>
                </div>
                <FormFileInput
                    label="Background image"
                    id="backgroundImage"
                    register={register}
                    errors={errors}
                    require={false}
                />
                <div className="d-flex justify-content-center mt-5">
                    <SubmitButton 
                        isLoading={isLoading || isInitializingUser}
                        text="Save"    
                    />
                </div>
            </form>
            <ToastContainer />
        </>
    )
}

export default UserImagesForm