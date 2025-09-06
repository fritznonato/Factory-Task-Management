import { useState, useEffect } from 'react';
import type { Task } from './types';

type EditTaskModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (updatedTask: Task) => void;
    task: Task | null;
};

const EditTaskModal = ({ isOpen, onClose, onSave, task }: EditTaskModalProps) => {
    // Internal state to manage the form fields
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Pending');

    // When the task prop changes (i.e., when the modal is opened),
    // update the internal state to show the task's current data.
    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setStatus(task.status);
        }
    }, [task]);
    if (!isOpen || !task) {
        return null;
    }
    const handleSubmit = () => {
        const updatedTask = {
            ...task,
            title,
            description,
            status,
        };
        onSave(updatedTask);
    };

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={onClose}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Edit Task</p>
                    <button className="delete" aria-lable="close" onClick={onClose}></button>
                </header>
                <section className="modal-card-body">
                    <div className="field">
                        <label className="label">Title</label>
                        <div className="control">
                            <input 
                            className="input"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} 
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Description</label>
                        <div className="control">
                            <textarea 
                            className="textarea" 
                            value={description}
                            onChange={(e)=> setDescription(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Status</label>
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-success" onClick={handleSubmit}>Save cahnges</button>
                    <button className="button" onClick={onClose}>Cancel</button>
                </footer>
            </div>
        </div>
    );
};

export default EditTaskModal;