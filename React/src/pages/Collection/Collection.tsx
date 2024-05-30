import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CollectionDetails from "../../components/compound/CollectionDetails/CollectionDetails";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import useSearch from "../../customHooks/useSearch";

function Collection() {
    const { id } = useParams();
    const [ filter, setFilter ] = useState("");
    const [ phrase, setPhrase ] = useState("");
    const navigate = useNavigate()

    if (!id) {
        navigate("/");
        return null;
    }

    const { isLoading, response, error, fetchData: searchItems } = useSearch("http://localhost:1000/api/collection/" + id + "/items");

    useEffect(() => {
        if (!response) {
            const params = new URLSearchParams(location.search);
            const filterFromUrl = params.get('filter') || 'Popular';
            const phraseFromUrl = params.get('phrase') || '';

            searchItems(phraseFromUrl, filterFromUrl);

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
        searchItems(phrase, filter);
    }, [filter, phrase, navigate]);

    const enterItem = (itemId: number) => {
        navigate("/collection/" + id + "/item/" + itemId);
        window.location.reload();
    }

    return (
        <div className="container mt-5">
            <CollectionDetails id={id}/>
            <hr />
            <div className="d-flex justify-content-center">
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
            <div className="mt-5">
                {isLoading || !response ? (
                    <div className="spinner-border text-dark" role="status">
                        <span className="sr-only"></span>
                    </div>
                ) : (
                    <>
                        {response.map((item: object, index: number) => (
                            index % 6 === 0 && (
                                <div className="card-group" key={`row-${index}`}>
                                    {response.slice(index, index + 6).map((subItem: object) => (
                                        <div className="col-md-2 mb-4" key={subItem.id}>
                                            <a href="" onClick={() => enterItem(subItem.id)}>
                                                <div className="card rounded mx-2">
                                                    <img className="card-img-top" src="/profileImages/BUBBA.jpg" alt="collection image" />
                                                    <div className="card-body">
                                                        <h5 className="card-title">{subItem.name}</h5>
                                                        <p className="card-text h6">{subItem.value} ETH</p>
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

export default Collection;