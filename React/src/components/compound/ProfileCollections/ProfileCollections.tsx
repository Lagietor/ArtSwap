import { useEffect, useState } from "react";
import useSearch from "../../../customHooks/useSearch";
import LoadingAnimation from "../../atomic/LoadingAnimation/LoadingAnimation";
import SearchBar from "../../atomic/SearchBar/SearchBar";
import { faHeartCrack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import CollectionType from "../../../types/CollectionType";
import ProfileCollectionItems from "../ProfileCollectionItems/ProfileCollectionItems";
import { useInView } from "react-intersection-observer";
import useDebounce from "../../../customHooks/useDebounce";
import CollectionsList from "../CollectionsList/CollectionsList";

function ProfileCollections({ id, filter}: {id: string, filter: string}) {
    const apiUrl = import.meta.env.VITE_API_URL;

    const { isLoading, error, fetchData: searchCollections } = useSearch(apiUrl + "user/" + id + "/collections");
    const [ phrase, setPhrase ] = useState("");
    const [ sort ] = useState("");
    const [selectedCollection, setSelectedCollection] = useState<CollectionType | null>(null);
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const { ref, inView } = useInView({
        threshold: 0.2,
        triggerOnce: false,
    });
    const [collections, setCollections] = useState<CollectionType[]>([]);
    const debouncedPhrase = useDebounce(phrase, 300);

    useEffect(() => {
        if (hasMore) {
            loadCollections();
        }
    }, [page])

    useEffect(() => {
        if (inView && hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [inView, hasMore]);

    useEffect(() => {
        setPage(1);
        setCollections([]);
        updateURL();
    }, [sort, debouncedPhrase, filter]);

    useEffect(() => {
        loadCollections();
    }, [location.search, page]);

    const loadCollections = async () => {
        if (isFetching) return;

        setIsFetching(true);
        const params = new URLSearchParams(location.search);
        const filterFromUrl = params.get("filter") || "all";
        const sortFromUrl = params.get("sort") || "Popular";
        const phraseFromUrl = params.get("phrase") || "";
    
        const newCollections = await searchCollections(phraseFromUrl, sortFromUrl, filterFromUrl, page);
        if (newCollections && newCollections.length > 0) {
            setCollections((prevCollections) => [...prevCollections, ...newCollections]);
            setHasMore(newCollections.length === 12);
        } else {
            setHasMore(false);
        }

        setIsFetching(false);
    }

    const updateURL = () => {
        const params = new URLSearchParams();
        params.set("sort", sort);
        params.set("phrase", phrase);
        params.set("filter", filter);
        navigate({ search: params.toString() });
    };

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
                        {isLoading && collections.length === 0 ? (
                            <div className="d-flex justify-content-center">
                                <LoadingAnimation />
                            </div>
                        ) : (
                            <>
                                {collections.length > 0 ? (
                                    <>
                                        <CollectionsList collections={collections} isProfile={true} setSelectedCollection={setSelectedCollection} />
                                        {hasMore && collections.length != 0 && (
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
                                        <h3 className="text-primary">No Collections</h3>
                                        <FontAwesomeIcon className="text-primary fa-2x" icon={faHeartCrack} />
                                    </div>
                                )}
                                {hasMore && collections.length != 0 && (
                                    <>
                                        <div ref={ref} style={{ height: '20px' }} />
                                        <div className="d-flex justify-content-center">
                                            <LoadingAnimation />
                                        </div>
                                    </>
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