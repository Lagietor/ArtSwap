import "./ItemDetails.css";
import { useEffect, useState } from "react";
import LoginModal from "../LoginModal/LoginModal";
import BuyNowModal from "../BuyNowModal/BuyNowModal";
import ItemType from "../../../types/ItemType";
import isUserLogged from "../../../utils/isUserLogged";
import useUserWalletStore from "../../../store/useUserWalletStore";
import { getTokenOwner } from "../../../utils/Contract/contractConnector";
import getNftHistory from "../../../utils/Contract/getNftHistory";
import NFTHistoryChart from "../NftHistoryChart/NftHistoryChart";

function ItemDetails({ item }: { item: ItemType }) {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showBuyNowModal, setShowBuyNowModal] = useState(false);
    const [tokenOwner, setTokenOwner] = useState();
    const { userWallet } = useUserWalletStore();
    const isLogged = isUserLogged();
    const [history, setHistory ] = useState([]);

    useEffect(() => {
        const fetchTokenOwner = async () => {
            const nftHistory = await getNftHistory(item.tokenId);
            setHistory(nftHistory);
            let tokenOwner = await getTokenOwner(item.tokenId);
            tokenOwner = tokenOwner.toLowerCase();
            setTokenOwner(tokenOwner);
        }

        fetchTokenOwner();
    })

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
                <img src={item.image || "/defaultImages/item_default.jpg"} className="rounded item-details-img" width="500px" height="600px" />
            </div>
            <div className="col text-center bg-info rounded border border-dark p-4">
                <h1 className="text-primary">{item.name}</h1>
                <p className="text-light">Owner: <span className="h5">{item.owner.username}</span></p>
                <p className="text-light">Views: <span className="h6">{item.views}</span></p>
                <hr className="text-light"/>
                <p className="text-light">Current Price: </p>
                <h4 className="text-light">{item.value} ETH</h4>
                <button className={`btn btn-primary mt-4 ${(isLogged && userWallet?.ethAddress == tokenOwner) && 'disabled'}`} onClick={handleBuyNowClick}>Buy Now</button>
                <hr className="text-light" />
                <NFTHistoryChart history={history} />
            </div>
        </div>
    );
}

export default ItemDetails;