import { useEffect, useState } from 'react'
import useApi from '../../../../customHooks/useApi';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { Cookies } from 'react-cookie';
import FormInput from '../../../atomic/FormInput/FormInput';
import FormPasswordInput from '../../../atomic/FormPasswordInput/FormPasswordInput';
import FormConfirmPasswordInput from '../../../atomic/FormConfirmPasswordInput/FormConfirmPasswordInput';
import SubmitButton from '../../../atomic/SubmitButton/SubmitButton';
import UserType from '../../../../types/UserType';
import fetchUserData from '../../../../utils/fetchUserData';

const UserCredentialsForm = ({ user, setUser}:  {user: UserType, setUser: Function}) => {
    const apiUrl = import.meta.env.VITE_API_URL;

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm<{id: string, email: string, username: string, password: string, confirmPassword: string}>();

    const password = watch("password", "");
    const cookies = new Cookies();
    const { isLoading, response, error, fetchData: editUser, resetError, resetResponse } = useApi(apiUrl + "user/edit", "POST");
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

    const onSubmit: SubmitHandler<{id: string; email: string; username: string; password: string}> = async (data) => {
        resetError();
        resetResponse();
        data.id = user.id;
        await editUser(data);
    }

  return (
    <>
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
                    isLoading={isLoading || isInitializingUser}
                    text="Save"
                />
            </div>
        </form>
        <ToastContainer />
    </>
  )
}

export default UserCredentialsForm