import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useUser from "../../customHooks/useUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import useSearch from "../../customHooks/useSearch";
import "./Home.css";

function Home() {
    const { user, isLogged } = useUser();
    const [ filter, setFilter ] = useState("");
    const [ phrase, setPhrase ] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const { isLoading, response, error, fetchData: searchCollections } = useSearch("http://localhost:1000/api/collection/search");

    useEffect(() => {
        if (!response) {
            const params = new URLSearchParams(location.search);
            const filterFromUrl = params.get('filter') || 'Popular';
            const phraseFromUrl = params.get('phrase') || '';

            searchCollections(phraseFromUrl, filterFromUrl);

            setPhrase(phraseFromUrl);
            setFilter(filterFromUrl);
        }
    }, [response])

    useEffect(() => {
        const updateURL = () => {
            const params = new URLSearchParams();
            params.set("filter", filter);
            params.set("phrase", phrase);
            navigate({ search: params.toString() });
        };

        updateURL();
        search();
    }, [filter, phrase, navigate]);

    const search = () => {
        searchCollections(phrase, filter);
    }

    const enterCollection = (id: number) => {
        navigate("/collection/" + id);
        window.location.reload();
    }

    return(
        <div className="container">
            <div className="searchBar d-flex justify-content-center mt-5">
                <form className="form-inline w-50">
                    <div className="input-group">
                        <input 
                            type="search"
                            value={phrase}
                            className="form-control rounded" 
                            placeholder="Search" 
                            aria-label="Search" 
                            aria-describedby="search-addon"
                            onChange={(e) => setPhrase(e.target.value)}
                        />
                        <span className="input-group-text border-0" id="search-addon">
                            <FontAwesomeIcon icon={faSearch} />
                        </span>
                    </div>
                </form>
            </div>
            <div className="categories mt-5">
                <button className={`category-btn ${filter === "Popular" ? "active" : ""}`} onClick={() => setFilter("Popular")}>Popular</button>
                <button className={`category-btn ${filter === "Expensive" ? "active" : ""}`} onClick={() => setFilter("Expensive")}>Expensive</button>
                <button className={`category-btn ${filter === "Newest" ? "active" : ""}`} onClick={() => setFilter("Newest")}>Newest</button>
                <button className={`category-btn ${filter === "Oldest" ? "active" : ""}`} onClick={() => setFilter("Oldest")}>Oldest</button>
                <button className={`category-btn ${phrase ? "active" : ""}`}>
                    {phrase && (
                        <span className="mx-2">{phrase}</span>
                    )}
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
            <div className="nft-items mt-5">
            
            {isLoading || !response ? (
                <div className="spinner-border text-dark" role="status">
                    <span className="sr-only"></span>
                </div>
            ) : (
                <>
                    {response.map((collection: object, index: number) => (
                        index % 6 === 0 && (
                            <div className="card-group" key={`row-${index}`}>
                                {response.slice(index, index + 6).map((subCollection: object) => (
                                    <div className="col-md-2 mb-4" key={subCollection.id}>
                                        <a href="" onClick={() => enterCollection(subCollection.id)}>
                                            <div className="card rounded mx-2">
                                                <img className="card-img-top" src="./profileImages/BUBBA.jpg" alt="collection image" />
                                                <div className="card-body">
                                                    <h5 className="card-title">{subCollection.name}</h5>
                                                    <p className="card-text">{subCollection.description}</p>
                                                    <div className="row">
                                                        <div className="col">
                                                            <h6>Floor</h6>
                                                            <span>{subCollection.floorPrice}</span>
                                                        </div>
                                                        <div className="col">
                                                            <h6>Volume</h6>
                                                            <span>{subCollection.volume}</span>
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