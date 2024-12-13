import { useState } from 'react';
import axios from 'axios';
import { Cookies } from 'react-cookie';

const useApi = (url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET') => {
    const ApiAuth = import.meta.env.API_AUTH;
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const cookies = new Cookies();
  
    const fetchData = async (body: object = {}) => {
        setIsLoading(true);

        const token = cookies.get("userToken");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        try {
            let response;
            switch (method.toUpperCase()) {
                case 'GET':
                    response = await axios.get(url, { headers });
                    break;
                case 'POST':
                    response = await axios.post(url, body, { headers });
                    break;
                case 'PUT':
                    response = await axios.put(url, body, { headers });
                    break;
                case 'DELETE':
                    response = await axios.delete(url, {
                        headers,
                        data: body
                    });
                    break;
                default:
                    throw new Error('Unsupported HTTP method');
            }

            setResponse(response.data);
        } catch (error: any) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchFile = async (formData: FormData) => {
        setIsLoading(true);
        try {
            const token = cookies.get("userToken");
            const headers = {
                'Content-Type': 'multipart/form-data',
                Authorization: token ? `Bearer ${token}` : '',
            };
            const response = await axios.post(url, formData, { headers });
            setResponse(response.data);
        } catch (error: any) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const resetError = () => setError(null);
    const resetResponse = () => setResponse(null);

    return { response, error, isLoading, fetchData, fetchFile, resetError, resetResponse };
  };

export default useApi;