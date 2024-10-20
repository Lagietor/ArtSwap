import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import useApi from "../../customHooks/useApi";
import { useEffect } from "react";
import SubmitButton from "../../components/atomic/SubmitButton/SubmitButton";
import FormInput from "../../components/atomic/FormInput/FormInput";
import FormTextarea from "../../components/atomic/FormTextArea/FormTextArea";
import FormFileInput from "../../components/atomic/FormFileInput/FormFileInput";
import isUserLogged from "../../utils/isUserLogged";
import useUserStore from "../../store/useUserStore";
import useCollectionStore from "../../store/useCollectionStore";

function CreateCollection() {
    const apiUrl = import.meta.env.VITE_API_URL;

    const isLogged = isUserLogged();
    const { user } = useUserStore();
    const { setCollection } = useCollectionStore();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<{userId: string; name: string, desc: string, image: File}>();

    const { isLoading, response, error, fetchFile: createCollection } = useApi(apiUrl + "collection", "POST");

    const onSubmit: SubmitHandler<{userId: string; name: string; desc: string; image: File}> = async (data) => {
        try {
            const formData = new FormData();
            formData.append("userId", user.id);
            formData.append("name", data.name);
            formData.append("desc", data.desc);
            formData.append("image", data.image[0]);

            await createCollection(formData);
        } catch (error) {
            toast.error("Something went wrong!");
        }
    }

    useEffect(() => {
        if (response) {
            setCollection(response);
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
                    require={false}
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