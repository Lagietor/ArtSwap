import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CollectionDetails from "../../components/compound/CollectionDetails/CollectionDetails";
import { useEffect, useState } from "react";
import useSearch from "../../customHooks/useSearch";
import Item from "../../types/ItemType";
import LoadingAnimation from "../../components/atomic/LoadingAnimation/LoadingAnimation";
import SearchBar from "../../components/atomic/SearchBar/SearchBar";
import isUserLogged from "../../utils/isUserLogged";
import useUserStore from "../../store/useUserStore";
import useCollectionStore from "../../store/useCollectionStore";
import useItemStore from "../../store/useItemStore";
import ItemType from "../../types/ItemType";
import useApi from "../../customHooks/useApi";

function Collection() {
    const apiUrl = import.meta.env.VITE_API_URL;

    const { id } = useParams();
    const isLogged = isUserLogged();
    const { user } = useUserStore();
    const { setItem } = useItemStore();
    const { collection } = useCollectionStore();
    const [ sort, setsort ] = useState("");
    const [ phrase, setPhrase ] = useState("");
    const navigate = useNavigate()

    if (!id) {
        navigate("/");
        return null;
    }

    const { isLoading, response, error, fetchData: searchItems } = useSearch(apiUrl + "collection/" + id + "/items");
    const { fetchData: addView } = useApi(apiUrl + "collection/" + id + "/view");

    useEffect(() => {
        if (!response) {
            addView();

            const params = new URLSearchParams(location.search);
            const sortFromUrl = params.get("sort") || "Popular";
            const phraseFromUrl = params.get("phrase") || "";

            searchItems(phraseFromUrl, sortFromUrl);

            setPhrase(phraseFromUrl);
            setsort(sortFromUrl);
        }
    }, [response])

    useEffect(() => {
        const updateURL = () => {
            const params = new URLSearchParams();
            params.set("sort", sort);
            params.set("phrase", phrase);
            navigate({ search: params.toString() });
        };

        updateURL();
        searchItems(phrase, sort);
    }, [sort, phrase, navigate]);

    const enterItem = (item: ItemType) => {
        setItem(item);
        navigate("/collection/" + id + "/item/" + item.id);
        window.location.reload();
    }

    const enterCreateItem = () => {
        navigate(`/collection/${id}/item/create`);
        window.location.reload();
    }

    return (
        <div className="container mt-5">
            <CollectionDetails collection={collection} />
            <hr />
            <div className="d-flex justify-content-center">
                {isLogged && collection.user.id && user?.id === collection.user.id && (
                    <button className="btn btn-primary me-3" onClick={enterCreateItem}>+</button>
                )}
                <form className="form-inline w-50">
                    <div className="input-group">
                        <SearchBar value={phrase} onChange={setPhrase}/>
                    </div>
                </form>
            </div>
            {isLoading || !response ? (
                <div className="d-flex justify-content-center">
                    <LoadingAnimation />
                </div>
            ) : (
                <div className="mt-5">
                    {response.map((item: object, index: number) => (
                        index % 6 === 0 && (
                            <div className="card-group" key={`row-${index}`}>
                                {response.slice(index, index + 6).map((subItem: Item) => (
                                    <div className="col-md-2 mb-4" key={subItem.id}>
                                        <a href="" onClick={() => enterItem(subItem)}>
                                            <div className="card rounded mx-2">
                                                <img className="card-img-top card-img" src={subItem.image || "/defaultImages/item_default.jpg"} alt="item image" />
                                                <div className="card-body">
                                                    <h5 className="card-title">{subItem.name}</h5>
                                                    <p className="card-text h6 text-light">{subItem.value} ETH</p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        )
                    ))}
                </div>
            )}
        </div>
    );
}

export default Collection;