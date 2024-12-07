import "./Home.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useInView } from 'react-intersection-observer';
import useSearch from "../../customHooks/useSearch";
import CollectionType from "../../types/CollectionType";
import LoadingAnimation from "../../components/atomic/LoadingAnimation/LoadingAnimation";
import SearchBar from "../../components/atomic/SearchBar/SearchBar";
import useDebounce from "../../customHooks/useDebounce";
import CollectionsList from "../../components/compound/CollectionsList/CollectionsList";

function Home() {
    const apiUrl = import.meta.env.VITE_API_URL;

    const [sort, setSort] = useState("Popular");
    const [phrase, setPhrase] = useState("");
    const { search } = useLocation();
    const location = useLocation();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [collections, setCollections] = useState<CollectionType[]>([]);
    const [isFetching, setIsFetching] = useState(false);
    const { ref, inView } = useInView({
        threshold: 0.2,
        triggerOnce: false,
    });
    const debouncedPhrase = useDebounce(phrase, 300);
    const { isLoading, fetchData: searchCollections } = useSearch(apiUrl + "collection");

    useEffect(() => {
        if (inView && hasMore && !isFetching) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [inView, hasMore, isFetching]);

    useEffect(() => {
        const params = new URLSearchParams(search);
        const autoLogin = params.get("autoLogin");
        
        if (!autoLogin) {
            resetCollections();
            updateURL();
        }
    }, [sort, debouncedPhrase]);

    useEffect(() => {
        loadCollections();
    }, [location.search, page]);

    const resetCollections = () => {
        setPage(1);
        setCollections([]);
        setHasMore(true);
    };

    const loadCollections = async () => {
        if (isFetching) return;

        setIsFetching(true);
        const params = new URLSearchParams(location.search);
        const sortFromUrl = params.get("sort") || "Popular";
        const phraseFromUrl = params.get("phrase") || "";

        const newCollections = await searchCollections(phraseFromUrl, sortFromUrl, "", page);

        if (newCollections && newCollections.length > 0) {
            setCollections((prevCollections) => {
                const mergedCollections = [...prevCollections, ...newCollections];
                const uniqueCollections = Array.from(new Set(mergedCollections.map(c => c.id)))
                    .map(id => mergedCollections.find(c => c.id === id));
                return uniqueCollections;
            });
            setHasMore(newCollections.length === 12);
        } else {
            setHasMore(false);
        }
        setIsFetching(false);
    };

    const updateURL = () => {
        const params = new URLSearchParams();
        params.set("sort", sort);
        params.set("phrase", phrase);
        navigate({ search: params.toString() });
    };

    return(
        <div className="container">
            <div className="searchBar d-flex justify-content-center mt-5">
                <form className="form-inline w-50">
                    <div className="input-group">
                        <SearchBar value={phrase} onChange={setPhrase} />
                    </div>
                </form>
            </div>
            <div className="categories mt-5">
                <button className={`category-btn ${sort === "Popular" ? "active" : ""}`} onClick={() => setSort("Popular")}>Popular</button>
                <button className={`category-btn ${sort === "Expensive" ? "active" : ""}`} onClick={() => setSort("Expensive")}>Expensive</button>
                <button className={`category-btn ${sort === "Newest" ? "active" : ""}`} onClick={() => setSort("Newest")}>Newest</button>
                <button className={`category-btn ${sort === "Oldest" ? "active" : ""}`} onClick={() => setSort("Oldest")}>Oldest</button>
                <button className={`category-btn ${phrase ? "active" : ""}`}>
                    {phrase && (
                        <span className="mx-2">{phrase}</span>
                    )}
                    <FontAwesomeIcon icon={faSearch} className="text-primary" />
                </button>
            </div>
            <div className="nft-items mt-5">
                {isLoading && collections.length === 0 ? (
                    <div className="d-flex justify-content-center">
                        <LoadingAnimation />
                    </div>
                ) : (
                    <>
                        <CollectionsList collections={collections} isProfile={false} />
                        {hasMore && collections.length !== 0 && (
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
        </div>
    );
}

export default Home;
