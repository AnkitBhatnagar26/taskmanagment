import { useEffect, useState } from "react";
import { Task } from "../utils/interface";
import { Button } from "./ui/Button";

interface TaskFormProps {
    onSubmit: (task: Task) => void;
    closeForm: () => void;
    task?: Task;  // task is optional to support adding new tasks
    formState: 'edit' | 'add';
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, formState, task, closeForm }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<'To Do' | 'In Progress' | 'Done'>('To Do');
    const [titleError, setTitleError] = useState<string | null>(null); // State for title error message
    const [descriptionError, setDescriptionError] = useState<string | null>(null); // State for title error message

    useEffect(() => {
        // Check if there's a task and the form is in edit mode
        if (task && formState === 'edit') {
            setTitle(task.title);
            setDescription(task.description);
            setStatus(task.status);
        }
    }, [task, formState]);  // Dependency array to only re-run if task or formState changes

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (title.trim() === '' && description.trim() === '') {
            setTitleError('Title is required');
            setDescriptionError('Description is required');
            return;
        }
        if (title.trim() === '') {
            setTitleError('Title is required');
            return;
        }
        if (description.trim() === '') {
            setDescriptionError('Description is required');
            return;
        }
        setTitleError(null);
        setDescriptionError(null);

        if (formState === 'add') {
            onSubmit({ title, description, status }); // Send title, description, and status for adding a task
        } else if (formState === 'edit' && task) {
            onSubmit({ _id: task?._id, title, description, status }); // Send id, title, description, and status for updating a task
        }
        // setTitle('');
        // setDescription('');
        // setStatus('To Do');
    };

    const cancelHandler = () => {
        setTitle('');
        setDescription('');
        setTitleError(null);
        setDescriptionError(null);
        closeForm();
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-4 border rounded-lg bg-white text-gray-900 mb-6"
        >
            <h2 className="inline-flex items-center mb-6 text-sm font-bold uppercase text-lg">
                {formState === 'add' ? 'Add Task' : 'Edit Task'}
            </h2>
            <label className="block mb-2 text-sm">Title:</label>
            <input
                type="text"
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value);
                    setTitleError(null); // Clear title error message when typing
                }}
                className={`w-full py-2 px-3 bg-gray-100 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${titleError ? 'border-red-500' : ''}`}
            />
            {titleError && <p className="text-red-500 text-sm mb-4">{titleError}</p>} {/* Display title error message */}
            <label className="block mb-2 text-sm">Description:</label>
            <textarea
                value={description}
                onChange={(e) => {
                    setDescription(e.target.value)
                    setDescriptionError(null); // Clear title error message when typing
                }}
                className="w-full py-2 px-3 bg-gray-100 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {descriptionError && <p className="text-red-500 text-sm mb-4">{descriptionError}</p>} {/* Display title error message */}
            <label className="block mb-2 text-sm">Status:</label>
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'To Do' | 'In Progress' | 'Done')}
                className="w-full py-2 px-3 mb-4 bg-gray-100 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
            </select>
            <div className="flex justify-between">
                <Button variant="outline" type="button" onClick={cancelHandler}>Cancel</Button>
                {formState === 'add' && <Button type="submit">Add Task</Button>}
                {formState === 'edit' && <Button type="submit">Update Task</Button>}
            </div>
        </form>
    );
};

export default TaskForm;