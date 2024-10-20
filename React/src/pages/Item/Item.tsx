import { useNavigate, useParams } from "react-router-dom"
import ItemDetails from "../../components/compound/ItemDetails/ItemDetails";
import useItemStore from "../../store/useItemStore";
import useApi from "../../customHooks/useApi";
import { useEffect } from "react";

function Item() {
    const apiUrl = import.meta.env.VITE_API_URL;
    
    const { itemId } = useParams();
    const { item } = useItemStore();
    const navigate = useNavigate();

    const { fetchData: addView } = useApi(apiUrl + "item/" + itemId + "/view");

    if (!itemId) {
        navigate("/");
        return null;
    }

    useEffect(() => {
        addView();
    }, []);

    return (
        <div className="container mt-5">
            <ItemDetails item={item} />
        </div>
    )
}

export default Item