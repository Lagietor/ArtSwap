import "./CollectionDetails.css";
import CollectionType from "../../../types/CollectionType";

function CollectionDetails({collection}: {collection: CollectionType}) {
    return (
        <>
            <div className="text-center">
                <img className="rounded collection-details-img" src={collection.image || "/defaultImages/collection_default.jpg"} width="90px" height="90px" alt="collection image"></img>
                <h2 className="mt-3 text-primary">{collection.name}</h2>
                <p className="text-light">Author: <span className="h6">{collection.user.username}</span></p>
                <p className="text-light">{collection.description}</p>
                <div className="row mt-5">
                    <div className="col text-center">
                        <p className="text-light">Views </p>
                        <span className="h5 text-light">{collection.views}</span>
                    </div>
                    <div className="col text-center">
                        <p className="text-light">Items</p>
                        <span className="h5 text-light">{collection.itemsCount}</span>
                    </div>
                    <div className="col text-center">
                        <p className="text-light">Floor price</p>
                        <span className="h5 text-light">{collection.floorPrice}</span>
                    </div>
                    <div className="col text-center">
                        <p className="text-light">Volume</p>
                        <span className="h5 text-light">{collection.volume}</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CollectionDetails;