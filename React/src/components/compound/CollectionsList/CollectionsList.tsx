import { useNavigate } from "react-router-dom";
import CollectionType from "../../../types/CollectionType";
import useCollectionStore from "../../../store/useCollectionStore";
import useApi from "../../../customHooks/useApi";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

function CollectionsList({ collections, isProfile}: { collections: CollectionType[], isProfile: boolean}) {
    const apiUrl = import.meta.env.VITE_API_URL;

    const navigate = useNavigate();
    const { setCollection } = useCollectionStore();
    const { fetchData: deleteCollection } = useApi(apiUrl + "collection/delete", "DELETE");
    const [isDeleteLoading, setIsDeleteLoading] = useState<{ [key: number]: boolean }>({});

    const cols = (isProfile) ? 4 : 6;
    const width = (isProfile) ? 3 : 2;
    const profileStyle = (isProfile) ? "d-flex justify-content-between align-items-center" : "";

    const enterCollection = (collection: CollectionType) => {
        setCollection(collection);
        navigate("/collection/" + collection.id);
        window.location.reload();
    }

    const handleEditCollection = (e: React.MouseEvent, collection: CollectionType) => {
        e.stopPropagation();
        setCollection(collection);
        navigate(`/collection/${collection.id}/edit`);
        window.location.reload();
    }

    const handleDeleteCollection = async (e: React.MouseEvent, collection: CollectionType) => {
        e.preventDefault()
        e.stopPropagation()

        setIsDeleteLoading((prev) => ({ ...prev, [collection.id]: true }));
        await deleteCollection({id: collection.id});
        setIsDeleteLoading((prev) => ({ ...prev, [collection.id]: false }));

        window.location.reload();
    }

    return (
        <>
            {collections.map((collection: CollectionType, index: number) => (
                index % cols === 0 && (
                    <div className="card-group" key={`row-${index}`}>
                        {collections.slice(index, index + cols).map((subCollection: CollectionType) => (
                            <div className={`col-md-${width} mb-4`} key={subCollection.id}>
                                <a href="#" onClick={() => enterCollection(subCollection)}>
                                    <div className="card rounded mx-2">
                                        <img className="card-img-top card-img" src={subCollection.image || "/defaultImages/collection_default.jpg"} alt="collection image" />
                                        <div className={`card-body ${profileStyle}`}>
                                            <h5 className="card-title">{subCollection.shortName}</h5>
                                            <p className="card-text text-light">{subCollection.shortDescription}</p>
                                            {isProfile ? (
                                                <div className="d-flex">
                                                <button className="edit-button" onClick={(e) => handleEditCollection(e, subCollection)}>
                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                </button>
                                                <button className="delete-button ms-2" onClick={(e) => handleDeleteCollection(e, subCollection)}>
                                                {isDeleteLoading[subCollection.id] ? (
                                                    <div className="spinner-border spinner-border-sm text-danger" role="status"></div>
                                                ) : (
                                                    <FontAwesomeIcon icon={faTrashCan} />
                                                )}
                                                </button>
                                            </div>
                                            ) : (
                                                <div className="row">
                                                    <div className="col">
                                                        <h6 className="text-light">Floor</h6>
                                                        <span className="text-light">{subCollection.floorPrice}</span>
                                                    </div>
                                                    <div className="col">
                                                        <h6 className="text-light">Volume</h6>
                                                        <span className="text-light">{subCollection.volume}</span>
                                                    </div>
                                                </div>
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
    );
}

export default CollectionsList;
