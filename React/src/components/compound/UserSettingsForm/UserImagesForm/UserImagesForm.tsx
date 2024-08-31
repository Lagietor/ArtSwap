<<<<<<< HEAD
import { useEffect, useState } from 'react'
=======
import { useEffect } from 'react'
>>>>>>> abaed7c59c6df70ac2f869cac4e74f293032e48e
import { Cookies } from 'react-cookie';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import FormFileInput from '../../../atomic/FormFileInput/FormFileInput';
import SubmitButton from '../../../atomic/SubmitButton/SubmitButton';
import useApi from '../../../../customHooks/useApi';
import UserType from '../../../../types/UserType';
<<<<<<< HEAD
import fetchUserData from '../../../../utils/fetchUserData';

const UserImagesForm = ({ user, setUser }: {user: UserType, setUser: Function}) => {
=======

const UserImagesForm = ({ user }: {user: UserType}) => {
>>>>>>> abaed7c59c6df70ac2f869cac4e74f293032e48e
    const apiUrl = import.meta.env.VITE_API_URL;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<{profileImage: File, backgroundImage: File}>();

    const { isLoading, response, error, fetchFile: uploadImages, resetError, resetResponse } = useApi(apiUrl + "user/" + user.id + "/images", "POST");
    const cookies = new Cookies();
<<<<<<< HEAD
    const [isInitializingUser, setIsInitializingUser] = useState(false);
=======
>>>>>>> abaed7c59c6df70ac2f869cac4e74f293032e48e

    useEffect(() => {
        if (error) {
            const errorMessage = error["response"]["data"]["message"] || "Something went wrong";
            toast.error(errorMessage);
        }

<<<<<<< HEAD
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
=======
        if (response) {
            cookies.set("userToken", response["token"]);
            toast.success("Changes updated!");
>>>>>>> abaed7c59c6df70ac2f869cac4e74f293032e48e
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
<<<<<<< HEAD
                    <div className="d-flex justify-content-center">
                        <img src={user.profileImage || "/defaultImages/profile_default.jpg"} className="rounded-circle" width="150px" height="150px"/>
                    </div>
                    <h5 className="text-center text-light mt-4">Profile image</h5>
=======
>>>>>>> abaed7c59c6df70ac2f869cac4e74f293032e48e
                    <FormFileInput
                        label="Profile image"
                        id="profileImage"
                        register={register}
                        errors={errors}
                        require={false}
                    />
<<<<<<< HEAD
                </div>
                <div className="form-group align-items-center">
                <div className="col d-flex justify-content-center">
                    <img src={user.backgroundImage || "/defaultImages/background_default.avif"} className="rounded" width="400px" height="200px"/>
                </div>
                <h5 className="text-center text-light mt-4">Background image</h5>
                </div>
=======
                    <div className="d-flex justify-content-center">
                        <img src={user.profileImage} className="rounded-circle" width="150px" height="150px"/>
                    </div>
                    <h5 className="text-center text-light mt-4">Profile image</h5>
                </div>
                <div className="form-group align-items-center">
>>>>>>> abaed7c59c6df70ac2f869cac4e74f293032e48e
                <FormFileInput
                    label="Background image"
                    id="backgroundImage"
                    register={register}
                    errors={errors}
                    require={false}
                />
<<<<<<< HEAD
                <div className="d-flex justify-content-center mt-5">
                    <SubmitButton 
                        isLoading={isLoading || isInitializingUser}
=======
                <div className="col d-flex justify-content-center">
                    <img src={user.backgroundImage} className="rounded" width="400px" height="200px"/>
                </div>
                <h5 className="text-center text-light mt-4">Background image</h5>
                </div>
                <div className="d-flex justify-content-center mt-5">
                    <SubmitButton 
                        isLoading={isLoading}
>>>>>>> abaed7c59c6df70ac2f869cac4e74f293032e48e
                        text="Save"    
                    />
                </div>
            </form>
            <ToastContainer />
        </>
    )
}

export default UserImagesForm