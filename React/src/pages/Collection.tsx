import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Collection() {
    const { id } = useParams();

    useEffect(() => {
        // TODO: załaduj dane kolekcji
    })

    return (
        <div className="container">
            <h1>{id}</h1>
        </div>
    )
}

export default Collection;