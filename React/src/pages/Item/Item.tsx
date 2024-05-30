import { useNavigate, useParams } from "react-router-dom"
import useApi from "../../customHooks/useApi";
import { useEffect } from "react";
import ItemDetails from "../../components/compound/ItemDetails/ItemDetails";

function Item() {
    const { itemId } = useParams();
    const navigate = useNavigate();

    if (!itemId) {
        navigate("/");
        return null;
    }

    const { isLoading, response, error, fetchData: getItem } = useApi("http://localhost:1000/api/item/" + itemId);

    useEffect(() => {
        if (!response) {
            getItem();
        }
    }, [response])

    return (
        <div className="container mt-5">
            {isLoading || !response ? (
                <div className="spinner-border text-dark" role="status">
                    <span className="sr-only"></span>
                </div>
            ) : (
                <ItemDetails item={response} />
            )}
        </div>
    )
}

export default Item