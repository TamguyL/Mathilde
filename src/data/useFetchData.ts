import { useState, useEffect } from 'react';

// Fonction générique pour récupérer les données
async function fetchData<T>(): Promise<T> {
    const response = await fetch('./data.json');
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
}

// Hook personnalisé pour gérer les états liés au fetch
export function useFetchData<T>() {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                const result = await fetchData<T>();
                setData(result);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchDataAsync();
    },);

    return { data, loading, error };
}
