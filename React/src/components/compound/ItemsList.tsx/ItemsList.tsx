import { useNavigate } from "react-router-dom";
import ItemType from "../../../types/ItemType"
import useItemStore from "../../../store/useItemStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import useApi from "../../../customHooks/useApi";
import deleteNFT from "../../../utils/Contract/deleteNFT";
import useUserWalletStore from "../../../store/useUserWalletStore";
import { toast, ToastContainer } from "react-toastify";
import { getTokenOwner } from "../../../utils/Contract/contractConnector";

function ItemsList({items, isProfile}: {items: ItemType[], isProfile: boolean}) {
    const apiUrl = import.meta.env.VITE_API_URL;

    const navigate = useNavigate();
    const { setItem } = useItemStore();
    const { userWallet } = useUserWalletStore();
    const [isDeleteLoading, setIsDeleteLoading] = useState<{ [key: number]: boolean }>({});
    const [tokenOwners, setTokenOwners] = useState<{ [key: number]: string }>({});
    const cols = (isProfile) ? 4 : 6;
    const width = (isProfile) ? 3 : 2;
    const profileStyle = (isProfile) ? "d-flex justify-content-between align-items-center" : "";

    const { fetchData: deleteItem } = useApi(apiUrl + "item/delete", "DELETE");

    const fetchTokenOwners = async (items: ItemType[]) => {
        try {
            const owners = await Promise.all(
                items.map(async (item) => {
                    if (item.tokenId) {
                        const owner = await getTokenOwner(BigInt(item.tokenId));
                        return { tokenId: item.tokenId.toString(), owner: owner.toLowerCase() };
                    } else {
                        return {tokenId: 0, owner: 0}
                    }
                })
            );
    
            const ownersMap = owners.reduce((acc, { tokenId, owner }) => {
                acc[tokenId] = owner;
                return acc;
            }, {} as { [key: string]: string });
    
            setTokenOwners(ownersMap);
        } catch (error) {
            console.error("Failed to fetch token owners:", error);
        }
    };

    useEffect(() => {
        if (items.length > 0) {
            fetchTokenOwners(items);
        }
    }, [items]);

    const handlePreviewItem = (item: ItemType) => {
        setItem(item);
        navigate(`/collection/${item.collection.id}/item/${item.id}`);
        // window.location.reload();
    }

    const handleDeleteItem = async (e: React.MouseEvent, item: ItemType) => {
        e.preventDefault()
        e.stopPropagation()

        try {
            await deleteNFT(item.tokenId, userWallet.ethAddress);

            setIsDeleteLoading((prev) => ({ ...prev, [item.id]: true }));
            await deleteItem({id: item.id});
            setIsDeleteLoading((prev) => ({ ...prev, [item.id]: false }));
            window.location.reload();
        } catch (err) {
            const errorMessage = err?.message || "Something went wrong!";
            toast.error(errorMessage);
        }

    }

    const handleEditItem = (e: React.MouseEvent, item: ItemType) => {
        e.stopPropagation()
        setItem(item);
        navigate(`/item/${item.id}/edit`);
        window.location.reload();
    }

    return (
        <>
            {items.map((item: object, index: number) => (
                index % cols === 0 && (
                    <div className="card-group" key={`row-${index}`}>
                        {items.slice(index, index + cols).map((subItem: ItemType) => (
                            <div className={`col-md-${width} mb-4`} key={subItem.id}>
                                <a href="" onClick={() => handlePreviewItem(subItem)}>
                                    <div className="card rounded mx-2">
                                        <img className="card-img-top card-img" src={subItem.image || "/defaultImages/item_default.jpg"} alt="item image" />
                                        <div className={`card-body ${profileStyle}`}>
                                            <h5 className="card-title">{subItem.shortName}</h5>
                                            {isProfile && (
                                                <div className="d-flex">
                                                    <button 
                                                        className="edit-button" 
                                                        onClick={(e) => handleEditItem(e, subItem)}
                                                        disabled={tokenOwners[subItem.tokenId.toString()]?.toLowerCase() !== userWallet?.ethAddress.toLowerCase()}
                                                    >
                                                        <FontAwesomeIcon icon={faPenToSquare} />
                                                    </button>
                                                    <button 
                                                        className="delete-button ms-2" 
                                                        onClick={(e) => handleDeleteItem(e, subItem)}
                                                        disabled={tokenOwners[subItem.tokenId.toString()]?.toLowerCase() !== userWallet?.ethAddress.toLowerCase()}
                                                    >
                                                    {isDeleteLoading[subItem.id] ? (
                                                        <div className="spinner-border spinner-border-sm text-danger" role="status"></div>
                                                    ) : (
                                                        <FontAwesomeIcon icon={faTrashCan} />
                                                    )}
                                                    </button>
                                                </div>
                                            )}
                                            {!isProfile && (
                                                <p className="card-text h6 text-light">{subItem.value} ETH</p>
                                            )}
                                        </div>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                )
            ))}
            <ToastContainer />
        </>
    )
}

export default ItemsList