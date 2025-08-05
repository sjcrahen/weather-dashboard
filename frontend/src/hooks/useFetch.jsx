import { useEffect, useState } from 'react';

function useFetch(url, options = {}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) return;
        const controller = new AbortController();
        const { signal } = controller;

        const fetchData = async () => {
            setLoading(true);
            setError(false);

            try {
                const res = await fetch(url, { ...options, signal });
                if (!res.ok) throw new Error(`Error: ${res.status}`);
                const json = await res.json();
                setData(json);
            } catch (err) {
                if (err.name !== 'AbortError') setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();

        return () => controller.abort();
    }, [url, options]);

    return { data, loading, error };
}

export default useFetch;
