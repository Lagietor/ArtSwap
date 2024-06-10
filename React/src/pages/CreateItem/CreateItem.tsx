import { ToastContainer, toast } from "react-toastify";
import useUser from "../../customHooks/useUser";
import { useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import useApi from "../../customHooks/useApi";
import { useEffect } from "react";
import FormInput from "../../components/atomic/FormInput/FormInput";
import FormFileInput from "../../components/atomic/FormFileInput/FormFileInput";
import SubmitButton from "../../components/atomic/SubmitButton/SubmitButton";

function CreateItem() {
    const apiUrl = import.meta.env.VITE_API_URL;

    const { isLogged, user } = useUser();
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<{owner: string, collection: string; name: string, value: string, image: string}>();

    const { isLoading, response, error, fetchData: createItem } = useApi(apiUrl + "item", "POST");

    const onSubmit: SubmitHandler<{owner: string; collection: string; name: string; value: string; image: string}> = async (data) => {
        if (!user) {
            toast.error("User not found!");
            return;
        }

        try {
            data.owner = user.id;
            data.collection = parseInt(id);
            data.value = parseFloat(data.value);
            // TODO: change in future
            data.image = data.image[0].name;

            await createItem(data);
        } catch (error) {
            toast.error("Something went wrong!");
        }
    }

    useEffect(() => {
        if (response) {
            navigate(`/collection/${id}/item/${response.id}`);
        }
    }, [response])

    if (!isLogged || !user) {
        navigate("/");
        return null;
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center text-primary">Create NFT</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="my-5">
                <FormInput
                    id="name"
                    register={register}
                    errors={errors}
                    placeholder="Enter name"
                />
                <FormInput
                    id="value"
                    register={register}
                    errors={errors}
                    placeholder="Enter value"
                />
                <FormFileInput
                    label="Upload image"
                    id="image"
                    register={register}
                    errors={errors}
                />
                <div className="d-flex justify-content-center">
                    <SubmitButton 
                        isLoading={isLoading}
                        text="Create"
                    />
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}

export default CreateItem;