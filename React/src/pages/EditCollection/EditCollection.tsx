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

function EditCollection() {
    const apiUrl = import.meta.env.VITE_API_URL;

    const isLogged = isUserLogged();
    const { user } = useUserStore();
    const { collection } = useCollectionStore();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<{name: string, desc: string, image: File}>();

    const { isLoading, response, error, fetchFile: editCollection } = useApi(apiUrl + `collection/edit/${collection.id}`, "POST");

    const onSubmit: SubmitHandler<{name: string; desc: string; image: File}> = async (data) => {
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("desc", data.desc);
            formData.append("image", data.image[0]);

            await editCollection(formData);
        } catch (error) {
            toast.error("Something went wrong!");
        }
    }

    useEffect(() => {
        if (response) {
            navigate("/profile");
        }
    }, [response])

    if (!isLogged || !user) {
        navigate("/");
        return null;
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center text-primary">Edit Collection</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="my-5">
                <FormInput
                    id="name"
                    register={register}
                    errors={errors}
                    value={collection.name}
                    placeholder="Enter name"
                />
                <FormTextarea
                    label="Description"
                    id="desc"
                    register={register}
                    errors={errors}
                    value={collection.description}
                    placeholder="Enter description"
                />
                <FormFileInput
                    label="Upload Image"
                    id="image"
                    register={register}
                    errors={errors}
                />
                <img className="rounded mx-auto d-block mb-5" src={collection.image} />
                <div className="d-flex justify-content-center">
                    <SubmitButton isLoading={isLoading} text={"Submit"}/>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}

export default EditCollection;