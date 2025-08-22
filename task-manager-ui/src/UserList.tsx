import type { User } from './types';

type UserListProps = {
    users: User[];
    onUserDeleted: () => void;
};

const UserList = ({ users, onUserDeleted }: UserListProps) => {
    const handleDelete = async (userID: number) => {
        const confirmed = window.confirm("Are you sure you want to delete this user?");
        if (confirmed) {
            await fetch(`http://localhost:5285/api/Users/${userID}`, {
                method: 'DELETE',
            });
            onUserDeleted();
        }
    };

    return (
        <ul>
            {users.map(user => (
                <li key={user.id}>
                    {user.name} - {user.role}
                    <button onClick={() => handleDelete(user.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};

export default UserList;