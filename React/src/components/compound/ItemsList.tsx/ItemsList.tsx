import { useNavigate } from "react-router-dom";
import ItemType from "../../../types/ItemType"
import useItemStore from "../../../store/useItemStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import useApi from "../../../customHooks/useApi";

function ItemsList({items, isProfile}: {items: ItemType[], isProfile: boolean}) {
    const apiUrl = import.meta.env.VITE_API_URL;

    const navigate = useNavigate();
    const { setItem } = useItemStore();
    const [isDeleteLoading, setIsDeleteLoading] = useState<{ [key: number]: boolean }>({});
    const cols = (isProfile) ? 4 : 6;
    const width = (isProfile) ? 3 : 2;
    const profileStyle = (isProfile) ? "d-flex justify-content-between align-items-center" : "";

    const { fetchData: deleteItem } = useApi(apiUrl + "item/delete", "DELETE");

    const handlePreviewItem = (item: ItemType) => {
        setItem(item);
        navigate(`/collection/${item.collection.id}/item/${item.id}`);
        window.location.reload();
    }

    const handleDeleteItem = async (e: React.MouseEvent, item: ItemType) => {
        e.preventDefault()
        e.stopPropagation()

        setIsDeleteLoading((prev) => ({ ...prev, [item.id]: true }));
        await deleteItem({id: item.id});
        setIsDeleteLoading((prev) => ({ ...prev, [item.id]: false }));

        window.location.reload();
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
                                                    <button className="edit-button" onClick={(e) => handleEditItem(e, subItem)}>
                                                        <FontAwesomeIcon icon={faPenToSquare} />
                                                    </button>
                                                    <button className="delete-button ms-2" onClick={(e) => handleDeleteItem(e, subItem)}>
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
        </>
    )
}

export default ItemsList