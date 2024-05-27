import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useApi from "../../customHooks/useApi";

function Collection() {
    const { id } = useParams();
    const { isLoading: collectionIsLoading, response: collectionsResponse, error: collectionError, fetchData: getItems } = useApi("http://localhost:1000/api/items");
    const { isLoading: itemIsLoading, response: itemResponse, error: itemError, fetchData: getCollection } = useApi("http://localhost:1000/api/collection/" + id);

    useEffect(() => {
        if (!collectionsResponse) {
            try {
                getCollection();
            } catch (e) {
                console.log("Error: " + e);
            }
        } else {
            console.log(collectionsResponse);
        }
    }, [ collectionsResponse ])

    return (
        <div className="container mt-3">
            {!collectionIsLoading && collectionsResponse ? (
                <div className="mt-5 text-center">
                    <img className="rounded" src="/profileImages/BUBBA.jpg" width="100px" height="100px" alt="collection image"></img>
                    <p className="h3">{collectionsResponse.name}</p>
                </div>
            ) : (
                <div className="spinner-border text-dark" role="status">
                    <span className="sr-only"></span>
                </div>
            )}
        </div>
    );
}

export default Collection;