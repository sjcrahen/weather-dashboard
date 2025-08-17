import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

function useFetch() {
    const { logout } = useAuth();
    const { navigate } = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const abortControllerRef = useRef(null);

    const doFetch = useCallback(
        async (url, options = {}) => {
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
                if (res.status === 403) {
                    logout();
                    setData(null);
                    navigate('/login');
                    return;
                }
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
        },
        [navigate],
    );

    return { data, loading, error, doFetch };
}

export default useFetch;
