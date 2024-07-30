import React from 'react';
import './JsonFetch.css';
import FetchComponent from '../FetchComponent/FetchComponent';


/**
 * Компонент `JsonFetch` предназначен для демонстрации использования `FetchComponent` для выполнения различных HTTP-запросов.
 * Он отображает три различных типа запросов: получение данных, обработку ошибок и индикацию процесса загрузки.
 * 
 * @returns {React.FC} Реакт компонент, который отображает три `FetchComponent` с разными URL для демонстрации различных сценариев запросов.
 */
export const JsonFetch: React.FC = () => {
    return (
        <div className='container-two'>

            <div className="json-fetch__container">
                {/* FetchComponent для успешного получения данных */}
                <FetchComponent url={import.meta.env.REACT_APP_DATA_URL || ''} title="«Успешное получение данных»" />

                {/* FetchComponent для симуляции ошибки сервера (500) */}
                <FetchComponent url={import.meta.env.REACT_APP_ERROR_URL || ''} title="«Получение 500 ошибки»" />

                {/* FetchComponent для демонстрации индикатора загрузки */}
                <FetchComponent url={import.meta.env.REACT_APP_LOADING_URL || ''} title="«Индикатор загрузки»" />
            </div>
        </div>
    );
};

export default JsonFetch;