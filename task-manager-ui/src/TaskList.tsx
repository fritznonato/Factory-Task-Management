import type { Task, User } from './types'; // 1. Added 'User' to the import

type TaskListProps = {
    tasks: Task[];
    users: User[];
    onTaskUpdated: () => void;
    onTaskDeleted: () => void;
};

const TaskList = ({ tasks, users, onTaskUpdated, onTaskDeleted }: TaskListProps) => {
    
    // ... (handleDelete and handleUpdate functions are correct and don't need changes)
    const handleDelete = async (taskId: number) => {
        const confirmed = window.confirm("Are you sure you want to delete this task?");
        if (confirmed) {
            await fetch(`http://localhost:5285/api/Tasks/${taskId}`, {
                method: 'DELETE',
            });
            onTaskDeleted();
        }
    };

    const handleUpdate = async (taskId: number, currentTask: Task) => {
        const newTitle = prompt("Enter new title:", currentTask.title);
        const newDescription = prompt("Enter new description:", currentTask.description);
        const newStatus = prompt("Enter new status:", currentTask.status);

        if (newTitle !== null && newDescription !== null && newStatus !== null) {
            const updatedTask = {
                id: taskId,
                title: newTitle,
                description: newDescription,
                status: newStatus,
                assignedUserId: currentTask.assignedUserId,
            };

            await fetch(`http://localhost:5285/api/Tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTask),
            });
            onTaskUpdated();
        }
    };

    return (
        <ul>
            {tasks.map((task) => {
                const assignedUser = users.find(user => user.id === task.assignedUserId);
                return (
                    <li key={task.id} 
                        className="box task-item-box mb-3 is-flex is-justify-content-space-between is-align-items-center">
                        <div>
                            <p className="has-text-weight-bold has-text-light">{task.title}</p>
                            {/* 3. Added has-text-light class */}
                            <p className="is-size-7 has-text-light">{task.description}</p>
                            {/* 2. Added the line to display the user's name */}
                            <p className="is-size-7 has-text-light">
                                Assigned to: {assignedUser ? assignedUser.name : 'Unknown'}
                            </p>
                            {/* 3. Added has-text-light class */}
                            <p className="is-size-7 has-text-light">Status: {task.status}</p>
                        </div>
                        <div className="buttons">
                            <button className="button is-small is-info" onClick={() => handleUpdate(task.id, task)}>Edit</button>
                            <button className="button is-small is-danger" onClick={() => handleDelete(task.id)}>Delete</button>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

export default TaskList;
