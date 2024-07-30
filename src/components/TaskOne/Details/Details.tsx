import { useEffect, useState } from 'react';
import './Details.css';


interface DetailsProps {
    userID: string;
}

/**
 * @interface DetailsUser данные от сервера
 * @type {number} id - ID пользователя
 * @type {string} name - имя пользователя
 * @type {string} avatar - аватарка пользователя
 * @type {string} city - город проживания
 * @type {string} company - компания в которой работает
 * @type {string} position - должность
 */
interface DetailsUser {
    "id": number;
    "name": string;
    "avatar": string;
    "details": {
        "city": string;
        "company": string;
        "position": string;
    }
}

const Details: React.FC<DetailsProps> = ({ userID }) => {
    const [userDetails, setUserDetails] = useState<DetailsUser | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/${userID}.json`);
                if (!response.ok) {
                    throw new Error('Ошибка при запросе на сервер.')
                }
                const data: DetailsUser = await response.json();
                setUserDetails(data);
            } catch (error) {
                console.log('Error: ', error);
            }
        };
        fetchData();
    }, [userID]);

    const avatarUrl = `${userDetails?.avatar}?random=${Math.random()}`;

    return (
        <div className="details-container">
            {userDetails ? (
                <div className="user-details">
                    <div className="user-foto">
                        <img src={avatarUrl} alt={`Avatar of ${userDetails.name}`} />
                    </div>
                    <div className="user-content">
                        <h2>{userDetails.name}</h2>
                        <p><strong>City:</strong> {userDetails.details.city}</p>
                        <p><strong>Company:</strong> {userDetails.details.company}</p>
                        <p><strong>Position:</strong> {userDetails.details.position}</p>
                    </div>
                </div>
            ) : (
                <div className="loading-animation"></div>
            )}
        </div>
    )
};

export default Details;