import { useEffect, useState } from 'react';
import './List.css';
import Details from '../Details/Details';


/**
 * общий список пользователей
 * @type {string} id - уникальный индетификатор пользователя
 * @type {string} name - имя пользователя
 */
interface User {
    id: string;
    name: string;
}


const List = () => {
    const [ user, setUser ] = useState<User[]>([]);
    const [ selectedUserId, setSelectedUserId] = useState<string | null>(null);


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json');
                if (!response.ok) {
                    throw new Error ('Ошибка при запросе на сервер.')
                }
                const data: User[] = await response.json();
                setUser(data)
            } catch (error) {
                console.log('Error: ', error);
            }
        }

        fetchUsers();
    }, []);

    return (
        <div className="container">
            <ul className="user-list">
                {user.map((user: User) => (
                    <li key={user.id}
                    onClick={() => setSelectedUserId(user.id)}
                    className={selectedUserId === user.id ? 'selected' : ''}>{user.name}</li>
                ))}
            </ul>
            {selectedUserId && <Details userID={selectedUserId} />}
        </div>
    )
}

export default List;