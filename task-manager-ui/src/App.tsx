import { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import UserForm from './UserForm';
import UserList from './UserList';
import type { Task, User } from './types';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [message, setMessage] = useState('');

  const fetchTasks = async () => {
    const response = await fetch('http://localhost:5285/api/Tasks');
    const data = await response.json();
    setTasks(data);
  };

  const fetchUsers = async () => {
    const response = await fetch('http://localhost:5285/api/Users');
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  }

  return (
    <div className="container">
      {/* new structure for centering the content */}
      <div className="columns is-centered">
        <div className="column is-four-fifths">
          
          {/* All components are now stacked vertically inside this single column */}
          <h1 className="title is-2">Factory Task Manager</h1>
          {message && <div className="notification is-success">{message}</div>}
          
          <h2 className="subtitle is-4">Task Management</h2>
          <TaskForm onTaskAdded={() => {
            fetchTasks();
            showMessage('Task added successfully!');
          }} />
          <TaskList 
            tasks={tasks}
            users={users}
            onTaskUpdated={() => {
              fetchTasks();
              showMessage('Task updated successfully!');
            }} 
            onTaskDeleted={() => {
              fetchTasks();
              showMessage('Task deleted successfully!');
            }} 
          />

          <h2 className="subtitle is-4 mt-5">User Management</h2>
          <UserForm onUserAdded={() => {
            fetchUsers();
            showMessage('User added successfully!');
          }} />
          <UserList users={users} onUserDeleted={() => {
            fetchUsers();
            showMessage('User deleted successfully!');
          }} />

        </div>
      </div>
    </div>
  );
}

export default App;