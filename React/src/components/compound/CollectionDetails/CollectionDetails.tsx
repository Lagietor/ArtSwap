import { useEffect } from "react";
import useApi from "../../../customHooks/useApi";
import LoadingAnimation from "../../atomic/LoadingAnimation/LoadingAnimation";

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
                <div className="d-flex justify-content-center">
                    <LoadingAnimation />
                </div>
            ) : (
                <div className="text-center">
                    <img className="rounded" src="/profileImages/BUBBA.jpg" width="90px" height="90px" alt="collection image"></img>
                    <h2 className="mt-3 text-primary">{collectionResponse["name"]}</h2>
                    <p className="text-light">Author: <span className="h6">{collectionResponse["user"]["username"]}</span></p>
                    <p className="text-light">{collectionResponse["description"]}</p>
                    <div className="row mt-5">
                        <div className="col text-center">
                            <p className="text-light">Views </p>
                            <span className="h5 text-light">{collectionResponse["views"]}</span>
                        </div>
                        <div className="col text-center">
                            <p className="text-light">Items</p>
                            <span className="h5 text-light">{collectionResponse["itemsCount"]}</span>
                        </div>
                        <div className="col text-center">
                            <p className="text-light">Floor price</p>
                            <span className="h5 text-light">{collectionResponse["floorPrice"]}</span>
                        </div>
                        <div className="col text-center">
                            <p className="text-light">Volume</p>
                            <span className="h5 text-light">{collectionResponse["volume"]}</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default CollectionDetails;