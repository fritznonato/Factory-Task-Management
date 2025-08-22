import type { Task } from './types';

type TaskListProps = {
    tasks: Task[];
    onTaskUpdated: () => void;
    onTaskDeleted: () => void;
};

const TaskList = ({ tasks, onTaskUpdated, onTaskDeleted }: TaskListProps) => {

    // Function to handle deleting a task
    const handleDelete = async (taskId: number) => {
        const confirmed = window.confirm("Are you sure you want to delete this task?");
        if (confirmed) {
            await fetch(`http://localhost:5285/api/Tasks/${taskId}`, {
                method: 'DELETE',
            });
            onTaskDeleted();
        }
    };

    // Function to handle updating a task
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
            {tasks.map((task) => (
                <li key={task.id} className="box mb-3 is-flex is-justify-content-space-between is-align-items-center">
                    <div>
                        <p className="has-text-weight-bold">{task.title}</p>
                        <p className="is-size-7">{task.description}</p>
                        <p className="is-size-7">Status: {task.status}</p>
                    </div>
                    <div className="buttons">
                        <button className="button is-small is-info" onClick={() => handleUpdate(task.id, task)}>Edit</button>
                        <button className="button is-small is-danger" onClick={() => handleDelete(task.id)}>Delete</button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;