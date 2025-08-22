import { useState } from "react";

type UserFormProps = {
    onUserAdded: () => void;
};

const UserForm = ({ onUserAdded }: UserFormProps) => {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newUser = { name, role };
        await fetch('http://localhost:5285/api/Users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser),
        });
        setName('');
        setRole('');
        onUserAdded();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
             />
             <input 
                type="text" 
                placeholder="Role" 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required 
            />
            <button type="submit">Add User</button>
        </form>
    );
};

export default UserForm;