import { useState, useEffect } from 'react';
import type { User } from './types';

type TaskFormProps = {
    onTaskAdded: () => void;
};

const TaskForm = ({ onTaskAdded }: TaskFormProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Pending');
    const [assignedUserId, setAssignedUserId] = useState<number | ''>(''); 
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('http://localhost:5285/api/Users');
            const data = await response.json();
            setUsers(data);

            //If we get users, set the default selected user to the first one in the list.
            if (data.length > 0) {
                setAssignedUserId(data[0].id);
            }
        };
        fetchUsers();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!assignedUserId) return;

        const newTask = { title, description, status, assignedUserId };

        await fetch('http://localhost:5285/api/Tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask),
        });

        setTitle('');
        setDescription('');
        setStatus('Pending');

        onTaskAdded();
    };

    return (
        <form onSubmit={handleSubmit} className="field is-grouped">
            <p className="control is-expanded">
                <input
                    className="input"
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </p>
            <p className="control is-expanded">
                <textarea 
                    className="textarea" 
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </p>
            <div className="control">
                <select className="select" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
            <div className="control">
                <div className="select">
                    <select 
                        value={assignedUserId}
                        onChange={(e) => setAssignedUserId(Number(e.target.value))}
                        disabled={users.length === 0} // Disable dropdown if no users
                    >
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <p className="control">
                {/* Disable button if no users are loaded */}
                <button type="submit" className="button is-primary" disabled={users.length === 0}>
                    Add Task
                </button>
            </p>
        </form>
    );
};

export default TaskForm;