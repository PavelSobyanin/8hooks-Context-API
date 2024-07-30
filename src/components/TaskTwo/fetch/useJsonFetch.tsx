import { useState, useEffect } from 'react';


// Определение интерфейса для параметров запроса, расширяющего стандартный RequestInit
interface FetchOptions extends RequestInit { }

// Определение интерфейса для состояния запроса, включающего данные, статус загрузки и ошибку
interface FetchState<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
}

/**
 * Хук `useJsonFetch` используется для выполнения HTTP запросов и получения ответа в формате JSON.
 * @param url {string} URL-адрес запроса.
 * @param opts {FetchOptions} Необязательные параметры запроса, расширяющие стандартный RequestInit.
 * @returns {FetchState<T>} Возвращает объект состояния запроса, содержащий данные (`data`), статус загрузки (`loading`) и объект ошибки (`error`).
 * @template T Тип данных, который ожидается в ответе.
 * Использует React хуки `useState` и `useEffect` для управления состоянием запроса.
 * При изменении `url` или `opts` хук повторно выполняет запрос.
 */
function useJsonFetch<T>(url: string, opts?: FetchOptions): FetchState<T> {
    const [state, setState] = useState<FetchState<T>>({
        data: null,
        loading: true,
        error: null
    });

    useEffect(() => {
        const fetchData = async () => {
            setState({ data: null, loading: true, error: null });

            try {
                const response = await fetch(url, opts);
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

                const data = await response.json() as T;
                setState({ data, loading: false, error: null });
            } catch (error) {
                setState({ data: null, loading: false, error: error as Error });
            }
        };

        fetchData();
    }, [url, opts]);

    return state;
}

export default useJsonFetch;
