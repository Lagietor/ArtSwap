import { useState } from 'react';
import axios from 'axios';

const useApi = (url: string, method = 'GET') => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
    const fetchData = async (body: object) => {
        setIsLoading(true);
        try {
            let response;
            switch (method.toUpperCase()) {
                case 'GET':
                    response = await axios.get(url);
                    break;
                case 'POST':
                    response = await axios.post(url, body);
                    break;
                case 'PUT':
                    response = await axios.put(url, body);
                    break;
                case 'DELETE':
                    response = await axios.delete(url);
                    break;
                default:
                    throw new Error('Unsupported HTTP method');
            }
            setResponse(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };
  
    return { response, error, isLoading, fetchData };
  };

export default useApi;