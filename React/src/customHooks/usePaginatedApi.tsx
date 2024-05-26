import { useState, useEffect } from "react";

function usePaginatedApi(url) {
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchData = async (page) => {
        setIsLoading(true);
        try {
            const res = await fetch(`${url}?page=${page}`);
            const data = await res.json();
            setResponse(prev => [...prev, ...data.items]);
            setHasMore(data.items.length > 0);
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData(page);
    }, [page]);

    return { isLoading, response, error, setPage, hasMore };
}

export default usePaginatedApi;