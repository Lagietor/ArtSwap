import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CollectionDetails from "../../components/compound/CollectionDetails/CollectionDetails";
import isUserLogged from "../../utils/isUserLogged";
import useUserStore from "../../store/useUserStore";
import useCollectionStore from "../../store/useCollectionStore";
import useApi from "../../customHooks/useApi";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import ItemType from "../../types/ItemType";
import useDebounce from "../../customHooks/useDebounce";
import ItemsList from "../../components/compound/ItemsList.tsx/ItemsList";
import SearchBar from "../../components/atomic/SearchBar/SearchBar";
import useSearch from "../../customHooks/useSearch";
import LoadingAnimation from "../../components/atomic/LoadingAnimation/LoadingAnimation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartCrack } from "@fortawesome/free-solid-svg-icons";

function Collection() {
    const apiUrl = import.meta.env.VITE_API_URL;

    const { id } = useParams();
    const isLogged = isUserLogged();
    const { user } = useUserStore();
    const { collection } = useCollectionStore();
    const [ phrase, setPhrase ] = useState("");
    const [ sort ] = useState("");
    const { fetchData: addView } = useApi(apiUrl + "collection/" + id + "/view");
    const [isFetching, setIsFetching] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const navigate = useNavigate();
    const { ref, inView } = useInView({
        threshold: 0.2,
        triggerOnce: false,
    });
    const [items, setItems] = useState<ItemType[]>([]);
    const debouncedPhrase = useDebounce(phrase, 300);
    const { isLoading, fetchData: searchItems } = useSearch(apiUrl + "collection/" + id + "/items");

    if (!id) {
        navigate("/");
        return null;
    }

    useEffect(() => {
        if (hasMore) {
            loadItems();
        }
    }, [page])

    useEffect(() => {
        if (inView && hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [inView, hasMore]);

    const loadItems = async () => {
        if (isFetching) return;

        setIsFetching(true);
        const params = new URLSearchParams(location.search);
        const filterFromUrl = params.get("filter") || "all";
        const sortFromUrl = params.get("sort") || "Popular";
        const phraseFromUrl = params.get("phrase") || "";
    
        const newItems = await searchItems(phraseFromUrl, sortFromUrl, filterFromUrl, page);
        if (newItems && newItems.length > 0) {
            setItems((prevItems) => [...prevItems, ...newItems]);
            setHasMore(newItems.length === 12);
        } else {
            setHasMore(false);
        }

        setIsFetching(false);
    }

    useEffect(() => {
        loadItems();
    }, [location.search, page]);

    useEffect(() => {
        setPage(1);
        setItems([]);
        updateURL();
    }, [debouncedPhrase, sort])

    const updateURL = () => {
        const params = new URLSearchParams();
        params.set("sort", sort);
        params.set("phrase", phrase);
        navigate({ search: params.toString() });
    };

    useEffect(() => {
        addView();
    }, [])

    const enterCreateItem = () => {
        navigate(`/collection/${id}/item/create`);
        // window.location.reload();
    }

    return (
        <div className="container mt-5">
            <CollectionDetails collection={collection} />
            <hr />
            <form className="form-inline w-50 mx-auto">
                <div className="d-flex justify-content-center align-items-center">
                    <div>
                        {isLogged && collection.user.id && user?.id === collection.user.id && (
                            <button className="btn btn-primary me-3" onClick={enterCreateItem}>+</button>
                        )}
                    </div>
                    <div className="input-group ms-1">
                        <SearchBar value={phrase} onChange={setPhrase} />
                    </div>
                </div>
            </form>
            <div className="mt-3">
                {isLoading && items.length === 0 ? (
                    <div className="d-flex justify-content-center">
                        <LoadingAnimation />
                    </div>
                ) : (
                    <>
                        {items.length > 0 ? (
                            <>
                                <ItemsList items={items} isProfile={false} />
                                {hasMore && items.length != 0 && (
                                    <>
                                        <div ref={ref} style={{ height: '20px' }} />
                                        <div className="d-flex justify-content-center">
                                            <LoadingAnimation />
                                        </div>
                                    </>
                                )}
                            </>
                        ) : (
                            <div className="d-flex flex-column align-items-center mt-5 pb-5">
                                <h3 className="text-primary">No items</h3>
                                <FontAwesomeIcon className="text-primary fa-2x" icon={faHeartCrack} />
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Collection;