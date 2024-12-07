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
import createNFT from "../../utils/Contract/createNFT";
import useUserWalletStore from "../../store/useUserWalletStore";

function CreateItem() {
    const apiUrl = import.meta.env.VITE_API_URL;

    const isLogged = isUserLogged();
    const { user } = useUserStore();
    const { id } = useParams();
    const { setItem } = useItemStore();
    const navigate = useNavigate();
    const { userWallet } = useUserWalletStore();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<{collection: string; name: string, value: string, image: string}>();

    const { isLoading, response, error, fetchFile: createItem } = useApi(apiUrl + "item", "POST");

    const onSubmit: SubmitHandler<{collection: string; name: string; value: string; image: string}> = async (data) => {
        try {
            const metadata = {
                name: data.name,
                value: data.value,
                image: data.image[0],
            };

            const mintedTokenId = await createNFT(userWallet?.ethAddress, metadata, data.value);

            if (mintedTokenId) {
                const formData = new FormData();
                formData.append("owner", user.id);
                formData.append("collection", id);
                formData.append("name", data.name);
                formData.append("value", data.value);
                formData.append("tokenId", mintedTokenId);
                formData.append("image", data.image[0]);

                await createItem(formData);
                toast.success("NFT successfully minted and item created!");
            } else {
                toast.error("Failed to mint NFT.");
            }
        } catch (error) {
            const errorMessage = error?.message || "Something went wrong!";
            toast.error(errorMessage);
        }
    }

    useEffect(() => {
        if (response) {
            setItem(response);
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
                    require={false}
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