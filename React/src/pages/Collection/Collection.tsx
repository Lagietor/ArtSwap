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

// TODO: trzeba przebudować całą kolekcję, żeby nie wczytywać osobno obiektów z kolekcji i osobno samej kolekcji
// skoro w symfony jest funkcja $collection->getItems(), trzeba tylko zrobić system pod filtry
// jak będzie jeden input API to będzie można zapisać dane o kolekcji po pierwszym przeładowaniu w CollectionStore
// ALBO poukładać jakoś ten kod żeby przy wpisywaniu frazy wyszukiwania nie przeładowywała się cała strona tylko lista obiektów nft

function Collection() {
    const apiUrl = import.meta.env.VITE_API_URL;

    const { id } = useParams();
    const isLogged = isUserLogged();
    const { user } = useUserStore();
    const { collection, setCollection } = useCollectionStore();
    const [ sort, setsort ] = useState("");
    const [ phrase, setPhrase ] = useState("");
    const [ owner, setOwner ] = useState(null);
    const navigate = useNavigate()

    if (!id) {
        navigate("/");
        return null;
    }

    const { isLoading, response, error, fetchData: searchItems } = useSearch(apiUrl + "collection/" + id + "/items");

    useEffect(() => {
        if (!response) {
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

    const enterItem = (itemId: number) => {
        navigate("/collection/" + id + "/item/" + itemId);
        window.location.reload();
    }

    const enterCreateItem = () => {
        navigate(`/collection/${id}/item/create`);
        window.location.reload();
    }

    return (
        <div className="container mt-5">
            {isLoading || !response ? (
                <div className="d-flex justify-content-center">
                    <LoadingAnimation />
                </div>
            ) : (
                <>
                    <CollectionDetails id={id} setOwner={setOwner}/>
                    <hr />
                    <div className="d-flex justify-content-center">
                        {isLogged && owner?.id && user?.id === owner?.id && (
                            <button className="btn btn-primary me-3" onClick={enterCreateItem}>+</button>
                        )}
                        <form className="form-inline w-50">
                            <div className="input-group">
                                <SearchBar value={phrase} onChange={setPhrase}/>
                            </div>
                        </form>
                    </div>
                    <div className="mt-5">
                        {response.map((item: object, index: number) => (
                            index % 6 === 0 && (
                                <div className="card-group" key={`row-${index}`}>
                                    {response.slice(index, index + 6).map((subItem: Item) => (
                                        <div className="col-md-2 mb-4" key={subItem.id}>
                                            <a href="" onClick={() => enterItem(subItem.id)}>
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
                </>
            )}
        </div>
    );
}

export default Collection;