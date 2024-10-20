import { useEffect, useState } from "react";
import useSearch from "../../../customHooks/useSearch";
import LoadingAnimation from "../../atomic/LoadingAnimation/LoadingAnimation";
import SearchBar from "../../atomic/SearchBar/SearchBar";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faHeartCrack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import useCollectionStore from "../../../store/useCollectionStore";
import CollectionType from "../../../types/CollectionType";
import ProfileCollectionItems from "../ProfileCollectionItems/ProfileCollectionItems";
import useApi from "../../../customHooks/useApi";

function ProfileCollections({ id, filter}: {id: string, filter: string}) {
    const apiUrl = import.meta.env.VITE_API_URL;

    const { isLoading, response, error, fetchData: searchCollections } = useSearch(apiUrl + "user/" + id + "/collections");
    const { fetchData: deleteCollection } = useApi(apiUrl + "collection/delete", 'DELETE');
    const [ phrase, setPhrase ] = useState("");
    const [ sort ] = useState("");
    const [isDeleteLoading, setIsDeleteLoading] = useState<{ [key: number]: boolean }>({});
    const { setCollection } = useCollectionStore();
    const [selectedCollection, setSelectedCollection] = useState<CollectionType | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!response) {
            searchCollections(phrase, sort, filter);
        }
    });

    useEffect(() => {
        searchCollections(phrase, sort, filter);
    }, [phrase, sort, filter])

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

    const handleBack = () => {
        setSelectedCollection(null);
    };

    return (
        <>
            {selectedCollection ? ( 
                <ProfileCollectionItems collection={selectedCollection} onBack={handleBack}/>
            ) : (
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
                                    response.map((collections: object, index: number) => (
                                        index % 4 === 0 && (
                                            <div className="card-group" key={`row-${index}`}>
                                                {response.slice(index, index + 4).map((subCollection) => (
                                                    <div className="col-md-3 mb-4" key={subCollection.id}>
                                                        <a href="#" onClick={() => setSelectedCollection(subCollection)}>
                                                            <div className="card rounded mx-2">
                                                                <img className="card-img-top card-img" src={subCollection.image || "/defaultImages/collection_default.jpg"} alt="item image" />
                                                                <div className="card-body d-flex justify-content-between">
                                                                    <h5 className="card-title">{subCollection.name}</h5>
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
                                        <h3 className="text-primary">No Collections</h3>
                                        <FontAwesomeIcon className="text-primary fa-2x" icon={faHeartCrack} />
                                    </div>
                                )}
                                
                            </>
                        )}
                    </div>
                </>
            )}
        </>
    )
}

export default ProfileCollections;