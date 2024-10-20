import { useEffect, useState } from "react";
import useSearch from "../../../customHooks/useSearch";
import LoadingAnimation from "../../atomic/LoadingAnimation/LoadingAnimation";
import SearchBar from "../../atomic/SearchBar/SearchBar";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faHeartCrack } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import ItemType from "../../../types/ItemType";
import useItemStore from "../../../store/useItemStore";
import useApi from "../../../customHooks/useApi";

function ProfileItems({ id, filter}: {id: string, filter: string}) {
    const apiUrl = import.meta.env.VITE_API_URL;

    const { isLoading, response, error, fetchData: searchItems } = useSearch(apiUrl + "user/" + id + "/items");
    const { fetchData: deleteItem } = useApi(apiUrl + "item/delete", "DELETE");
    const [ phrase, setPhrase ] = useState("");
    const [ sort ] = useState("");
    const [isDeleteLoading, setIsDeleteLoading] = useState<{ [key: number]: boolean }>({});
    const { setItem } = useItemStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!response) {
            searchItems(phrase, sort, filter);
        }
    });

    useEffect(() => {
        searchItems(phrase, sort, filter);
    }, [phrase, sort, filter])

    const handlePreviewItem = (item: ItemType) => {
        setItem(item);
        navigate(`/collection/${item.collection.id}/item/${item.id}`);
        window.location.reload();
    }

    const handleEditItem = (e: React.MouseEvent, item: ItemType) => {
        e.stopPropagation()
        setItem(item);
        navigate(`/item/${item.id}/edit`);
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

    return (
        <>
            <form className="form-inline w-50">
                <div className="input-group ms-1">
                    <SearchBar value={phrase} onChange={setPhrase} />
                </div>
            </form>
            <div className="mt-3">
                {isLoading || !response ? (
                    <div className="d-flex justify-content-center">
                        <LoadingAnimation />
                    </div>
                ) : (
                    <>
                        {response.length > 0 ? (
                            response.map((items: object, index: number) => (
                                index % 4 === 0 && (
                                    <div className="card-group" key={`row-${index}`}>
                                        {response.slice(index, index + 4).map((subItem: ItemType) => (
                                            <div className="col-md-3 mb-4" key={subItem.id}>
                                                <a href="#" onClick={() => handlePreviewItem(subItem)}>
                                                    <div className="card rounded mx-2">
                                                        <img className="card-img-top card-img" src={subItem.image || "/defaultImages/item_default.jpg"} alt="item image" />
                                                        <div className="card-body d-flex justify-content-between align-items-center">
                                                            <h5 className="card-title">{subItem.name}</h5>
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
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                )
                            ))
                        ) : (
                            <div className="d-flex flex-column align-items-center mt-5 pb-5">
                                <h3 className="text-primary">No items</h3>
                                <FontAwesomeIcon className="text-primary fa-2x" icon={faHeartCrack} />
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    )
}

export default ProfileItems;