import { useCallback, useRef, useState } from 'react';

function useFetch() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const abortControllerRef = useRef(null);

    const doFetch = useCallback(async (url, options = {}) => {
        if (!url) return;

        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const controller = new AbortController();
        abortControllerRef.current = controller;
        const { signal } = controller;

        setLoading(true);
        setError(false);

        try {
            const res = await fetch(url, { ...options, signal });
            if (!res.ok) throw new Error(`Error: ${res.status}`);
            const json = await res.json();
            setData(json);
        } catch (err) {
            if (err.name !== 'AbortError') {
                setData(null);
                setError(err);
            }
        } finally {
            setLoading(false);
        }
    }, []);

    return { data, loading, error, doFetch };
}

export default useFetch;
