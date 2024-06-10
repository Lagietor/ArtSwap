import { ToastContainer, toast } from "react-toastify";
import useUser from "../../customHooks/useUser";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import useApi from "../../customHooks/useApi";
import { useEffect } from "react";
import SubmitButton from "../../components/atomic/SubmitButton/SubmitButton";
import FormInput from "../../components/atomic/FormInput/FormInput";
import FormTextarea from "../../components/atomic/FormTextArea/FormTextArea";
import FormFileInput from "../../components/atomic/FormFileInput/FormFileInput";

function CreateCollection() {
    const apiUrl = import.meta.env.VITE_API_URL;

    const { isLogged, user } = useUser();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<{userId: string; name: string, desc: string, image: string}>();

    const { isLoading, response, error, fetchData: createCollection } = useApi(apiUrl + "collection", "POST");

    const onSubmit: SubmitHandler<{userId: string; name: string; desc: string; image: string}> = async (data) => {
        if (!user) {
            toast.error("User not found!");
            return;
        }

        try {
            data.userId = user.id;
            // TODO: change in future
            data.image = data.image[0].name;

            await createCollection(data);
        } catch (error) {
            toast.error("Something went wrong!");
        }
    }

    useEffect(() => {
        if (response) {
            navigate(`/collection/${response.id}`);
        }
    }, [response])

    if (!isLogged || !user) {
        navigate("/");
        return null;
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center text-primary">Create Collection</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="my-5">
                <FormInput
                    id="name"
                    register={register}
                    errors={errors}
                    placeholder="Enter name"
                />
                <FormTextarea
                    label="Description"
                    id="desc"
                    register={register}
                    errors={errors}
                    placeholder="Enter description"
                />
                <FormFileInput
                    label="Upload Image"
                    id="image"
                    register={register}
                    errors={errors}
                />
                <div className="d-flex justify-content-center">
                    <SubmitButton isLoading={isLoading} text={"Submit"}/>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}

export default CreateCollection;