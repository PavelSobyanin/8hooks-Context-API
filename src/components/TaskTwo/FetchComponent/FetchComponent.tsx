import React from 'react';
import useJsonFetch from '../fetch/useJsonFetch';


/**
 * структура ответа от сервера.
 */
interface DataResponse {
    status: string; // Статус ответа от сервера
}

/**
 * Описывает свойства для универсального компонента запроса.
 * 
 * @interface
 * @property {string} url URL для запроса.
 * @property {string} title Заголовок для отображения.
 * @property {RequestInit} opts Необязательные параметры запроса.
 */
interface FetchComponentProps {
    url: string;
    title: string;
    opts?: RequestInit;
}

/**
 * Универсальный компонент для выполнения запросов и отображения их состояния.
 * Использует хук `useJsonFetch` для выполнения HTTP запроса и отображает результаты.
 * @param props {FetchComponentProps} Свойства компонента, включая URL, заголовок и параметры запроса.
 * @returns {React.FC<FetchComponentProps>} Реакт компонент, который отображает состояние запроса: загрузку, данные или ошибку.
 */
export const FetchComponent: React.FC<FetchComponentProps> = ({ url, title, opts }) => {
    // Использование пользовательского хука для запроса данных
    const { data, loading, error } = useJsonFetch<DataResponse>(url, opts);

    // Рендеринг состояния запроса
    return (
        <div className="json-fetch__data">
            <h3>{title}</h3>
            <div className="json-fetch__content">
                {loading && <div className="json-fetch_item json-fetch__loader"></div>}
                {!error && !loading && <div className="json-fetch_item json-fetch__data">{data?.status}</div>}
                {error && <p className="json-fetch_item json-fetch__error">{error?.message}</p>}
            </div>
        </div>
    );
};

export default FetchComponent;