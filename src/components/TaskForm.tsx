import { useState } from "react";
import { Task } from "../utils/interface";

const TaskForm: React.FC<{ onSubmit: (task: Task) => void }> = ({ onSubmit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<'To Do' | 'In Progress' | 'Done'>('To Do');
    const [titleError, setTitleError] = useState<string | null>(null); // State for title error message
    const [descriptionError, setDescriptionError] = useState<string | null>(null); // State for title error message

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(title, 'title')
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
        onSubmit({ id: Math.floor(Math.random() * 1000), title, description, status });
        setTitle('');
        setDescription('');
        setStatus('To Do');
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-4 border rounded-lg bg-white text-gray-900"
        >
            <h2 className="text-lg font-bold mb-4 text-blue-500">Create Task</h2>
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
            <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Add Task
            </button>
        </form>
    );
};

export default TaskForm;