import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Task } from '../utils/interface';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import SidebarItem from './common/sidebar';


const TaskManager: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState<'all' | 'To Do' | 'In Progress' | 'Done'>('all');
    const [showTaskForm, setShowTaskForm] = useState<boolean>(false);
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const sidebarRef = useRef<HTMLDivElement>(null);

    // useEffect(() => {
    //     function handleClickOutside(event: MouseEvent) {
    //         if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
    //             setSidebarOpen(false);
    //         }
    //     }

    //     document.addEventListener('mousedown', handleClickOutside);
    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     };
    // }, []);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 768px)');
        setSidebarOpen(mediaQuery.matches);

        const handleMediaQueryChange = (e: MediaQueryListEvent) => {
            setSidebarOpen(e.matches);
        };

        mediaQuery.addEventListener('change', handleMediaQueryChange);
        return () => mediaQuery.removeEventListener('change', handleMediaQueryChange);
    }, []);

    const handleAddTask = (newTask: Task) => {
        setTasks([...tasks, newTask]);
        setShowTaskForm(false);
    };

    const handleUpdateStatus = (taskId: number, newStatus: 'To Do' | 'In Progress' | 'Done') => {
        const updatedTasks = tasks.map((task) =>
            task.id === taskId ? { ...task, status: task.status === 'Done' ? task.status : newStatus } : task
        );
        setTasks(updatedTasks);
    };

    const handleDeleteTask = (taskId: number) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
    };

    const handleEditTask = (editedTask: Task) => {
        const updatedTasks = tasks.map((task) => (task.id === editedTask.id ? editedTask : task));
        setTasks(updatedTasks);
    };

    const filteredTasks = filter === 'all' ? tasks : tasks.filter((task) => task.status === filter);

    return (
        <div className="flex h-screen bg-gray-900 text-white">
            {/* Sidebar */}
            <div
                ref={sidebarRef}
                className={`md:w-1/5 bg-gray-800 transition-all duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } fixed inset-y-0 z-50`}
            >
                <div className="p-4">
                    <SidebarItem onClick={() => setShowTaskForm(true)} active={showTaskForm}>Create Task</SidebarItem>
                </div>
                <div className="p-4">
                    <SidebarItem onClick={() => setFilter('all')} active={filter === 'all'}>All Tasks <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">{tasks.length}</span></SidebarItem>
                    <SidebarItem onClick={() => setFilter('To Do')} active={filter === 'To Do'}>To Do</SidebarItem>
                    <SidebarItem onClick={() => setFilter('In Progress')} active={filter === 'In Progress'}>In Progress</SidebarItem>
                    <SidebarItem onClick={() => setFilter('Done')} active={filter === 'Done'}>Done</SidebarItem>
                </div>
                {window.innerWidth < 768 && (
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="w-full py-2 px-4 mt-auto bg-gray-800 hover:bg-gray-700 focus:outline-none focus:bg-gray-700 text-white"
                    >
                        Close Sidebar
                    </button>
                )}
            </div>
            {/* Content */}
            <div className={`md:flex-1 p-4 bg-white ${sidebarOpen ? 'md:ml-0 transition-all duration-300 ease-in-out' : 'w-full'
                }`}
                style={{ marginLeft: `${sidebarOpen ? '20%' : '0'}` }}>
                {/* Navbar */}
                <nav className="flex justify-between items-center bg-gray-800 p-4">
                    <button
                        className="text-gray-200 focus:outline-none"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        {sidebarOpen ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        )}
                    </button>
                    <h1 className="text-lg font-bold text-white">Task Management</h1>
                </nav>
                {/* Main Content */}
                <div
                    className={`${sidebarOpen ? 'md:ml-0 transition-all duration-300 ease-in-out' : 'md:ml-1/5'
                        }`}

                >
                    {showTaskForm ? (
                        <TaskForm onSubmit={handleAddTask} />
                    ) : (
                        <TaskList tasks={filteredTasks} onUpdateStatus={handleUpdateStatus} onDeleteTask={handleDeleteTask} onEditTask={handleEditTask} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskManager;
