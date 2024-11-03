import { useEffect, useState } from "react";
import useSearch from "../../../customHooks/useSearch";
import LoadingAnimation from "../../atomic/LoadingAnimation/LoadingAnimation";
import SearchBar from "../../atomic/SearchBar/SearchBar";
import { faHeartCrack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ItemType from "../../../types/ItemType";
import ItemsList from "../ItemsList.tsx/ItemsList";
import useDebounce from "../../../customHooks/useDebounce";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

function ProfileItems({ id, filter}: {id: string, filter: string}) {
    const apiUrl = import.meta.env.VITE_API_URL;

    const { isLoading, fetchData: searchItems } = useSearch(apiUrl + "user/" + id + "/items");
    const [ phrase, setPhrase ] = useState("");
    const [ sort ] = useState("");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const navigate = useNavigate();
    const { ref, inView } = useInView({
        threshold: 0.2,
        triggerOnce: false,
    });
    const [items, setItems] = useState<ItemType[]>([]);
    const debouncedPhrase = useDebounce(phrase, 300);

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
    }

    useEffect(() => {
        loadItems();
    }, [location.search]);

    useEffect(() => {
        setPage(1);
        setItems([]);
        updateURL();
    }, [debouncedPhrase, sort, filter])

    const updateURL = () => {
        const params = new URLSearchParams();
        params.set("sort", sort);
        params.set("phrase", phrase);
        params.set("filter", filter);
        navigate({ search: params.toString() });
    };

    return (
        <>
            <form className="form-inline w-50">
                <div className="input-group ms-1">
                    <SearchBar value={phrase} onChange={setPhrase} />
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
                                <ItemsList items={items} isProfile={true} />
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
        </>
    )
}

export default ProfileItems;