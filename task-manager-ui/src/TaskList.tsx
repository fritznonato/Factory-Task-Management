import { useState } from 'react';
import type { Task, User } from './types';
import EditTaskModal from './EditTaskModal';

type TaskListProps = {
    tasks: Task[];
    users: User[];
    onTaskUpdated: () => void;
    onTaskDeleted: () => void;
};

const TaskList = ({ tasks, users, onTaskUpdated, onTaskDeleted }: TaskListProps) => {
    // State to manage the modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'In Progress': return 'is-info';
            case 'Completed': return 'is-success';
            default: return 'is-warning';
        }
    };

    const handleDelete = async (taskId: number) => {
        const confirmed = window.confirm("Are you sure you want to delete this task?");
        if (confirmed) {
            await fetch(`http://localhost:5285/api/Tasks/${taskId}`, {
                method: 'DELETE',
            });
            onTaskDeleted();
        }
    };

    // This function now just open the modal
    const handleOpenEditModal = (task: Task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const handleSaveChanges = async (updatedTask: Task) => {
        await fetch(`http://localhost:5285/api/Tasks/${updatedTask.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTask),
        });
        onTaskUpdated();
        setIsModalOpen(false); // Close the modal after saving
    };

    if (tasks.length === 0) {
        return (
            <div className="box task-item-box has-text-centered">
                <p className="has-text-light">No tasks yet. Add one above to get started!</p>
            </div>
        );
    }

    return (
        <> {/* Use a Fragment to wrap the list and the modal */}
            <ul>
                {tasks.map((task) => {
                    const assignedUser = users.find(user => user.id === task.assignedUserId);
                    return (
                        <li key={task.id} className="box task-item-box mb-3 is-flex is-justify-content-space-between is-align-items-center">
                            <div>
                                <p className="has-text-weight-bold has-text-light">{task.title}</p>
                                <p className="is-size-7 has-text-light">{task.description}</p>
                                <p className="is-size-7 has-text-light">
                                    Assigned to: {assignedUser ? assignedUser.name : 'Unknown'}
                                </p>
                                <p className="is-size-7 has-text-light">
                                    Status: <span className={`tag ${getStatusClass(task.status)}`}>{task.status}</span>
                                </p>
                            </div>
                            <div className="buttons">
                                {/* Update the onClick handler for the Edit button */}
                                <button className="button is-small is-info" onClick={() => handleOpenEditModal(task)}>Edit</button>
                                <button className="button is-small is-danger" onClick={() => handleDelete(task.id)}>Delete</button>
                            </div>
                        </li>
                    );
                })}
            </ul>

            {/* Render the modal component */}
            <EditTaskModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveChanges}
                task={editingTask}
            />
        </>
    );
};

export default TaskList;