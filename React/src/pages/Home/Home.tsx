import "./Home.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import useSearch from "../../customHooks/useSearch";
import CollectionType from "../../types/CollectionType";
import LoadingAnimation from "../../components/atomic/LoadingAnimation/LoadingAnimation";
import SearchBar from "../../components/atomic/SearchBar/SearchBar";

function Home() {
    const apiUrl = import.meta.env.VITE_API_URL;

    const [ sort, setsort ] = useState("");
    const [ phrase, setPhrase ] = useState("");
    const { search } = useLocation();
    const location = useLocation();
    const navigate = useNavigate();
    const { isLoading, response, error, fetchData: searchCollections } = useSearch(apiUrl + "collection");

    useEffect(() => {
        if (!response) {
            const params = new URLSearchParams(location.search);
            const sortFromUrl = params.get("sort") || "Popular";
            const phraseFromUrl = params.get("phrase") || "";

            searchCollections(phraseFromUrl, sortFromUrl);

            setPhrase(phraseFromUrl);
            setsort(sortFromUrl);
        }
    }, [response])

    useEffect(() => {
        const params = new URLSearchParams(search);
        const autoLogin = params.get("autoLogin");

        if (!autoLogin) {
            updateURL();
            searchCollections(phrase, sort);
        }
    }, [sort, phrase]);

    const updateURL = () => {
        const params = new URLSearchParams();
        params.set("sort", sort);
        params.set("phrase", phrase);
        navigate({ search: params.toString() });
    };

    const enterCollection = (id: number) => {
        navigate("/collection/" + id);
        window.location.reload();
    }

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
                <button className={`category-btn ${sort === "Popular" ? "active" : ""}`} onClick={() => setsort("Popular")}>Popular</button>
                <button className={`category-btn ${sort === "Expensive" ? "active" : ""}`} onClick={() => setsort("Expensive")}>Expensive</button>
                <button className={`category-btn ${sort === "Newest" ? "active" : ""}`} onClick={() => setsort("Newest")}>Newest</button>
                <button className={`category-btn ${sort === "Oldest" ? "active" : ""}`} onClick={() => setsort("Oldest")}>Oldest</button>
                <button className={`category-btn ${phrase ? "active" : ""}`}>
                    {phrase && (
                        <span className="mx-2">{phrase}</span>
                    )}
                    <FontAwesomeIcon icon={faSearch} className="text-primary" />
                </button>
            </div>
            <div className="nft-items mt-5">
            
            {isLoading || !response ? (
                <div className="d-flex justify-content-center">
                    <LoadingAnimation />
                </div>
            ) : (
                <>
                    {response.map((collection: CollectionType, index: number) => (
                        index % 6 === 0 && (
                            <div className="card-group" key={`row-${index}`}>
                                {response.slice(index, index + 6).map((subCollection: CollectionType) => (
                                    <div className="col-md-2 mb-4" key={subCollection.id}>
                                        <a href="" onClick={() => enterCollection(subCollection.id)}>
                                            <div className="card rounded mx-2">
                                                <img className="card-img-top card-img" src={subCollection.image || "/defaultImages/collection_default.jpg"} alt="collection image" />
                                                <div className="card-body">
                                                    <h5 className="card-title">{subCollection.name}</h5>
                                                    <p className="card-text text-light">{subCollection.shortDescription}</p>
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
        </div>
    );
}

export default Home;