import { useState } from 'react';
import axios from 'axios';

const useSearch = (url: string): {
    isLoading: boolean;
    response: Array<any> | null;
    error: any;
    fetchData: (phrase?: string, sort?: string, filter?: string, page?: number, limit?: number) => void
    } => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
    const fetchData = async (phrase: string = "", sort: string = "", filter: string = "", page: number = 1, limit: number = 12) => {
        setIsLoading(true);

        const config = { headers: {
            'Content-Type': 'multipart/form-data' ,
        }};

        url += "?phrase=" + phrase + "&sort=" + sort + "&filter=" + filter + "&page=" + page + "&limit=" + limit;
        try {
            let response = await axios.get(url, config);
            setResponse(response.data);
            return response.data;
        } catch (error: any) {
            setError(error);
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    return { response, error, isLoading, fetchData };
  };

export default useSearch;