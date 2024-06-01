import { useEffect, useState } from "react";
import useSearch from "../../../customHooks/useSearch";

function ProfileItems({ id, filter}: {id: string, filter: string}) {
    const apiUrl = import.meta.env.VITE_API_URL;

    const { isLoading, response, error, fetchData: searchItems } = useSearch(apiUrl + "user/" + id + "/items");
    const [ phrase, setPhrase ] = useState("");
    const [ sort, setFilter ] = useState("");

    useEffect(() => {
        if (!response) {
            searchItems(phrase, sort, filter);
        }
    });

    useEffect(() => {
        searchItems(phrase, sort, filter);
    }, [phrase, sort, filter])

    return (
        <>
            <input type="search" className="form-control rounded" value={phrase} placeholder="Search" onChange={(e) => setPhrase(e.target.value)}/>
            <div className="mt-3">
                {isLoading || !response ? (
                    <div className="spinner-border text-dark" role="status">
                        <span className="sr-only"></span>
                    </div>
                ) : (
                    <>
                        {response.map((items: object, index: number) => (
                            index % 4 === 0 && (
                                <div className="card-group" key={`row-${index}`}>
                                    {response.slice(index, index + 4).map((subItem) => (
                                        <div className="col-md-3 mb-4" key={subItem.id}>
                                            <a href="#">
                                                <div className="card rounded mx-2">
                                                    <img className="card-img-top" src="/profileImages/BUBBA.jpg" alt="item image" />
                                                    <div className="card-body">
                                                        <h5 className="card-title">{subItem.name}</h5>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            )
                        ))}
                    </>
                )}
            </div>
        </>
    )
}

export default ProfileItems;