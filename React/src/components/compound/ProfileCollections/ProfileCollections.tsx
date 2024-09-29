import { useEffect, useState } from "react";
import useSearch from "../../../customHooks/useSearch";
import LoadingAnimation from "../../atomic/LoadingAnimation/LoadingAnimation";
import SearchBar from "../../atomic/SearchBar/SearchBar";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import useCollectionStore from "../../../store/useCollectionStore";
import CollectionType from "../../../types/CollectionType";

function ProfileCollections({ id, filter}: {id: string, filter: string}) {
    const apiUrl = import.meta.env.VITE_API_URL;

    const { isLoading, response, error, fetchData: searchCollections } = useSearch(apiUrl + "user/" + id + "/collections");
    const [ phrase, setPhrase ] = useState("");
    const [ sort, setFilter ] = useState("");
    const { setCollection } = useCollectionStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!response) {
            searchCollections(phrase, sort, filter);
        }
    });

    useEffect(() => {
        searchCollections(phrase, sort, filter);
    }, [phrase, sort, filter])

    const handleEditCollection = (collection: CollectionType) => {
        setCollection(collection);
        navigate(`/collection/${collection.id}/edit`);
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
                        {response.map((collections: object, index: number) => (
                            index % 4 === 0 && (
                                <div className="card-group" key={`row-${index}`}>
                                    {response.slice(index, index + 4).map((subCollection) => (
                                        <div className="col-md-3 mb-4" key={subCollection.id}>
                                            <a href="#">
                                                <div className="card rounded mx-2">
                                                    <img className="card-img-top card-img" src="/defaultImages/item_default.jpg" alt="item image" />
                                                    <div className="card-body d-flex justify-content-between">
                                                        <h5 className="card-title">{subCollection.name}</h5>
                                                        <button className="edit-button" onClick={() => handleEditCollection(subCollection)}>
                                                            <FontAwesomeIcon icon={faPenToSquare} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            )
                        ))}
                    </>
                )}
            </div>
        </>
    )
}

export default ProfileCollections;