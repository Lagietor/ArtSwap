import { useEffect, useState } from "react";
import useSearch from "../../../customHooks/useSearch";
import { useNavigate } from "react-router-dom";
import ItemType from "../../../types/ItemType";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faHeartCrack } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../../atomic/SearchBar/SearchBar";
import LoadingAnimation from "../../atomic/LoadingAnimation/LoadingAnimation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CollectionType from "../../../types/CollectionType";
import ItemsList from "../ItemsList.tsx/ItemsList";
import { useInView } from "react-intersection-observer";
import useDebounce from "../../../customHooks/useDebounce";


const ProfileCollectionItems = ({collection, filter = "all", onBack}: {collection: CollectionType, filter?: string, onBack: Function}) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const { isLoading, response, error, fetchData: searchCollectionItems } = useSearch(apiUrl + "collection/" + collection.id + "/items");

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

    const loadItems = async () => {
        const params = new URLSearchParams(location.search);
        const filterFromUrl = params.get("filter") || "all";
        const sortFromUrl = params.get("sort") || "Popular";
        const phraseFromUrl = params.get("phrase") || "";
    
        const newItems = await searchCollectionItems(phraseFromUrl, sortFromUrl, filterFromUrl, page);
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
        if (inView && hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [inView, hasMore]);

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

    // useEffect(() => {
    //     if (!response) {
    //         searchCollectionItems(phrase, sort, filter);
    //     }
    // });

    // useEffect(() => {
    //     searchCollectionItems(phrase, sort, filter);
    // }, [phrase, sort, filter])

    // const handlePreviewItem = (item: ItemType) => {
    //     setItem(item);
    //     navigate(`/collection/${item.collection.id}/item/${item.id}`);
    //     window.location.reload();
    // }

    // const handleEditCollection = (e: React.MouseEvent, item: ItemType) => {
    //     e.stopPropagation();
    //     setItem(item);
    //     navigate(`/item/${item.id}/edit`);
    //     window.location.reload();
    // }

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

export default ProfileCollectionItems