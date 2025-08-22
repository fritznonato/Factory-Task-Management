import { useState, useEffect } from 'react';
import type { User } from './types';

type TaskFormProps = {
    onTaskAdded: () => void;
};

const TaskForm = ({ onTaskAdded }: TaskFormProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Pending');
    const [assignedUserId, setAssignedUserId] = useState(1);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('http://localhost:5285/api/Users');
            const data = await response.json();
            setUsers(data);
        };
        fetchUsers();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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
            <p className="control">
                <select className="select" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </p>
            <p className="control">
                <div className="select">
                    <select 
                    value={assignedUserId}
                    onChange={(e) => setAssignedUserId(Number(e.target.value))}
                    >
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>
            </p>
            <p className="control">
                <button type="submit" className="button is-primary">Add Task</button>
            </p>
        </form>
    );
};

export default TaskForm;