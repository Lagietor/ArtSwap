import { useState } from 'react';
import axios from 'axios';

const useSearch = (url: string) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
    const fetchData = async (phrase: string = "", filter: string = "") => {
        setIsLoading(true);
        url += "?phrase=" + phrase + "&filter=" + filter;
        try {
            let response = await axios.get(url);
            setResponse(response.data);
        } catch (error: any) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };
  
    return { response, error, isLoading, fetchData };
  };

export default useSearch;