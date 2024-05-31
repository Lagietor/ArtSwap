import { useEffect } from "react";
import useApi from "../../../customHooks/useApi";

function CollectionDetails({ id } : { id: string }) {
    const apiUrl = import.meta.env.VITE_API_URL;
    
    const { isLoading: collectionIsLoading, response: collectionResponse, error: collectionError, fetchData: getCollection } = useApi(apiUrl + "collection/" + id);

    useEffect(() => {
        if (!collectionResponse) {
            getCollection();
        }
    }, [collectionResponse])

    return (
        <>
            {collectionIsLoading || !collectionResponse ? (
                <div className="spinner-border text-dark" role="status">
                    <span className="sr-only"></span>
                </div>
            ) : (
                <div className="text-center">
                    <img className="rounded" src="/profileImages/BUBBA.jpg" width="90px" height="90px" alt="collection image"></img>
                    <p className="h2 mt-3">{collectionResponse["name"]}</p>
                    <p>Author: <span className="h6">{collectionResponse["user"]["username"]}</span></p>
                    <p className="text-muted">{collectionResponse["description"]}</p>
                    <div className="row mt-5">
                        <div className="col text-center">
                            <p>Views </p>
                            <span className="h5">{collectionResponse["views"]}</span>
                        </div>
                        <div className="col text-center">
                            <p>Items</p>
                            <span className="h5">{collectionResponse["itemsCount"]}</span>
                        </div>
                        <div className="col text-center">
                            <p>Floor price</p>
                            <span className="h5">{collectionResponse["floorPrice"]}</span>
                        </div>
                        <div className="col text-center">
                            <p>Volume</p>
                            <span className="h5">{collectionResponse["volume"]}</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default CollectionDetails;