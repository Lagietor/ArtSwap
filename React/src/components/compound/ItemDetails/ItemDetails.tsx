import { useState } from "react";
import LoginModal from "../LoginModal/LoginModal";
import BuyNowModal from "../BuyNowModal/BuyNowModal";
import useUser from "../../../customHooks/useUser";
import ItemType from "../../../types/ItemType";

function ItemDetails({ item }: { item: ItemType }) {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showBuyNowModal, setShowBuyNowModal] = useState(false);
    const { isLogged, user } = useUser();

    const handleBuyNowClick = () => {
        if (isLogged) {
            setShowBuyNowModal(true);
        } else {
            setShowLoginModal(true);
        }
    }

    return (
        <div className="row mt-5">
            <LoginModal open={showLoginModal} handleClose={() => setShowLoginModal(false)} />
            <BuyNowModal open={showBuyNowModal} handleClose={() => setShowBuyNowModal(false)} />
            <div className="col">
                <img src="/profileImages/BUBBA.jpg" width="500px" height="600px" />
            </div>
            <div className="col text-center bg-light rounded border border-dark p-4">
                <h1>{item.name}</h1>
                <p>Owner: <span className="h5">{item.owner.username}</span></p>
                <p>Views: <span className="h6">{item.views}</span></p>
                <hr />
                <p className="bold">Current Price: </p>
                <h4>{item.value} ETH</h4>
                <button className="btn btn-primary mt-4" onClick={handleBuyNowClick}>Buy Now</button>
                <hr />
                <p>Some other data</p>
            </div>
            <div className="mt-5">
                <h6>Here will be blockchain history</h6>
            </div>
        </div>
    );
}

export default ItemDetails;