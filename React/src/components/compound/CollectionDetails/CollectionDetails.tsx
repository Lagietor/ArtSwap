import "./CollectionDetails.css";
import { useEffect } from "react";
import useApi from "../../../customHooks/useApi";
import LoadingAnimation from "../../atomic/LoadingAnimation/LoadingAnimation";

function CollectionDetails({ id, setOwner } : { id: string, setOwner: Function }) {
    const apiUrl = import.meta.env.VITE_API_URL;
    
    const { isLoading, response, error, fetchData: getCollection } = useApi(apiUrl + "collection/" + id);

    useEffect(() => {
        if (!response) {
            getCollection();
        } else {
            setOwner(response["user"]);
        }
    }, [response])

    return (
        <>
            {isLoading || !response ? (
                <div className="d-flex justify-content-center">
                    <LoadingAnimation />
                </div>
            ) : (
                <div className="text-center">
                    <img className="rounded collection-details-img" src={response["image"] || "/defaultImages/collection_default.jpg"} width="90px" height="90px" alt="collection image"></img>
                    <h2 className="mt-3 text-primary">{response["name"]}</h2>
                    <p className="text-light">Author: <span className="h6">{response["user"]["username"]}</span></p>
                    <p className="text-light">{response["description"]}</p>
                    <div className="row mt-5">
                        <div className="col text-center">
                            <p className="text-light">Views </p>
                            <span className="h5 text-light">{response["views"]}</span>
                        </div>
                        <div className="col text-center">
                            <p className="text-light">Items</p>
                            <span className="h5 text-light">{response["itemsCount"]}</span>
                        </div>
                        <div className="col text-center">
                            <p className="text-light">Floor price</p>
                            <span className="h5 text-light">{response["floorPrice"]}</span>
                        </div>
                        <div className="col text-center">
                            <p className="text-light">Volume</p>
                            <span className="h5 text-light">{response["volume"]}</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default CollectionDetails;