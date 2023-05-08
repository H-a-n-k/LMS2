import { useEffect, useState } from "react";
import CallApi, { CallApiWithToken } from "./callApi";

const useFetch = (url, reqBody, token) => { 
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => { 
        let mounted = true;

        const fetchApi = async () => { 
            setLoading(true);
            try {
                const resp = token ? await CallApiWithToken(token).get(url, reqBody) : await CallApi.get(url, reqBody);
                const data = resp.data;
                if (mounted) setData(data);
            } catch (err) {
                setError(err);
                console.log('useEffect Error', url, err);
            } finally { 
                setLoading(false);
            }
        }

        fetchApi();

        return () => { 
            mounted = false;
        }
    }, [url, reqBody, token])

    return { data, loading, error }
}

export default useFetch;