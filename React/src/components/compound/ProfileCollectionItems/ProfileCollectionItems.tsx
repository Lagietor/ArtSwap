import { useEffect, useState } from "react";
import useSearch from "../../../customHooks/useSearch";
import useItemStore from "../../../store/useItemStore";
import { useNavigate } from "react-router-dom";
import ItemType from "../../../types/ItemType";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faHeartCrack } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../../atomic/SearchBar/SearchBar";
import LoadingAnimation from "../../atomic/LoadingAnimation/LoadingAnimation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CollectionType from "../../../types/CollectionType";


const ProfileCollectionItems = ({collection, filter = "", onBack}: {collection: CollectionType, filter?: string, onBack: Function}) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const { isLoading, response, error, fetchData: searchCollectionItems } = useSearch(apiUrl + "collection/" + collection.id + "/items");

    const [ phrase, setPhrase ] = useState("");
    const [ sort ] = useState("");
    const { setItem } = useItemStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!response) {
            searchCollectionItems(phrase, sort, filter);
        }
    });

    useEffect(() => {
        searchCollectionItems(phrase, sort, filter);
    }, [phrase, sort, filter])

    const handlePreviewItem = (item: ItemType) => {
        setItem(item);
        navigate(`/collection/${item.collection.id}/item/${item.id}`);
        window.location.reload();
    }

    const handleEditCollection = (e: React.MouseEvent, item: ItemType) => {
        e.stopPropagation();
        setItem(item);
        navigate(`/item/${item.id}/edit`);
        window.location.reload();
    }

    return (
        <>
            <form className="form-inline w-100">
                <div className="d-flex justify-content-between ms-1">
                    <div className="d-flex justify-content-start w-50">
                        <button className="btn btn-primary" onClick={() => onBack()}><FontAwesomeIcon icon={faArrowLeft} /></button>
                        <SearchBar value={phrase} onChange={setPhrase} />
                    </div>
                    <p className="breadCrumb me-2 mt-2">{collection.name}</p>
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
                                        {response.slice(index, index + 4).map((subItem) => (
                                            <div className="col-md-3 mb-4" key={subItem.id}>
                                                <a href="#" onClick={() => handlePreviewItem(subItem)}>
                                                    <div className="card rounded mx-2">
                                                        <img className="card-img-top card-img" src={subItem.image || "/defaultImages/collection_default.jpg"} alt="item image" />
                                                        <div className="card-body d-flex justify-content-between">
                                                            <h5 className="card-title">{subItem.name}</h5>
                                                            <button className="edit-button" onClick={(e) => handleEditCollection(e, subItem)}>
                                                                <FontAwesomeIcon icon={faPenToSquare} />
                                                            </button>
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

export default ProfileCollectionItems