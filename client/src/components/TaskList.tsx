import { useState } from "react";
import { Task } from "../utils/interface";

const TaskList: React.FC<{
    tasks: Task[];
    onUpdateStatus: (id: number, newStatus: any) => void;
    onDeleteTask: (id: number) => void;
    onEditTask: (task: Task) => void;
}> = ({ tasks, onUpdateStatus, onDeleteTask, onEditTask }) => {
    const [editingTask, setEditingTask] = useState<Task | null>(null); // State to track editing task

    const handleEditTask = (task: Task) => {
        setEditingTask(task); // Set the task to edit
    };

    const handleSaveEdit = (editedTask: Task) => {
        setEditingTask(null); // Clear editing task
        onEditTask(editedTask); // Call onEditTask with edited task
    };

    const handleCancelEdit = () => {
        setEditingTask(null); // Clear editing task on cancel
    };


    return (
        <div className="p-4 border rounded-lg overflow-y-scroll">
            <h2 className="text-lg font-bold mb-4 text-blue-500">Tasks List</h2>
            {tasks.length === 0 && <h4 className="font-bold text-gray-800">You have no pending tasks!</h4>}
            <ul className="grid gap-4">
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        className="border p-4 rounded-lg bg-gray-100 text-gray-800 flex flex-col justify-between"
                    >
                        {editingTask?.id === task.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editingTask.title}
                                    onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                                    className="w-full py-2 px-3 mb-2 bg-gray-200 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <textarea
                                    value={editingTask.description}
                                    onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                                    className="w-full py-2 px-3 mb-2 bg-gray-200 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <div className="flex justify-between mt-2">
                                    <button
                                        onClick={() => handleSaveEdit(editingTask)}
                                        className="bg-green-500 text-white rounded-lg px-3 py-1 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={handleCancelEdit}
                                        className="bg-gray-500 text-white rounded-lg px-3 py-1 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <strong>{task.title}</strong>
                                <p>{task.description}</p>
                                <p>Status: {task.status}</p>
                                <div className="flex justify-between mt-2">
                                    <button
                                        onClick={() => onUpdateStatus(task.id, task.status === 'To Do' ? 'In Progress' : 'Done')}
                                        className="bg-blue-500 text-white rounded-lg px-3 py-1 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {task.status === 'To Do' ? 'Mark In Progress' : 'Mark Done'}
                                    </button>
                                    <div className="flex">
                                        <button
                                            onClick={() => handleEditTask(task)}
                                            className="mr-4 bg-yellow-500 text-white rounded-lg px-3 py-1 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => onDeleteTask(task.id)}
                                            className="bg-red-500 text-white rounded-lg px-3 py-1 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                        >
                                            Delete Task
                                        </button>

                                    </div>

                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList