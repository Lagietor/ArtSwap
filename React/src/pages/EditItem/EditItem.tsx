import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import useApi from "../../customHooks/useApi";
import { useEffect } from "react";
import FormInput from "../../components/atomic/FormInput/FormInput";
import FormFileInput from "../../components/atomic/FormFileInput/FormFileInput";
import SubmitButton from "../../components/atomic/SubmitButton/SubmitButton";
import isUserLogged from "../../utils/isUserLogged";
import useUserStore from "../../store/useUserStore";
import useItemStore from "../../store/useItemStore";

function EditItem() {
    const apiUrl = import.meta.env.VITE_API_URL;

    const isLogged = isUserLogged();
    const { user } = useUserStore();
    const { item, clearItem } = useItemStore();
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<{name: string, value: string, image: string}>();

    const { isLoading, response, error, fetchFile: editItem } = useApi(apiUrl + `item/edit`, "POST");

    const onSubmit: SubmitHandler<{name: string; value: string; image: string}> = async (data) => {
        try {
            const formData = new FormData();
            formData.append("id", id);
            formData.append("name", data.name);
            formData.append("value", data.value);
            formData.append("image", data.image[0]);

            await editItem(formData);
        } catch (error) {
            toast.error("Something went wrong!");
        }
    }

    useEffect(() => {
        if (response) {
            clearItem();
            navigate("/profile");
        }
    }, [response])

    if (!isLogged || !user) {
        navigate("/");
        return null;
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center text-primary">Edit NFT</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="my-5">
                <FormInput
                    id="name"
                    register={register}
                    errors={errors}
                    placeholder="Enter name"
                    defaultValue={item.name}
                />
                <FormInput
                    id="value"
                    register={register}
                    errors={errors}
                    placeholder="Enter value"
                    defaultValue={item.value}
                />
                <FormFileInput
                    label="Upload image"
                    id="image"
                    register={register}
                    errors={errors}
                    require={false}
                />
                <img className="rounded mx-auto d-block mb-5" src={item.image} />
                <div className="d-flex justify-content-center">
                    <SubmitButton 
                        isLoading={isLoading}
                        text="Save"
                    />
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}

export default EditItem;