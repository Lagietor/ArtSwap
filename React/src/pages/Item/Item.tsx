import { useNavigate, useParams } from "react-router-dom"
import ItemDetails from "../../components/compound/ItemDetails/ItemDetails";
import useItemStore from "../../store/useItemStore";

function Item() {

    const { itemId } = useParams();
    const { item } = useItemStore();
    const navigate = useNavigate();

    if (!itemId) {
        navigate("/");
        return null;
    }

    return (
        <div className="container mt-5">
            <ItemDetails item={item} />
        </div>
    )
}

export default Item