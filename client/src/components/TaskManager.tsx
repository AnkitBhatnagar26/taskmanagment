import React, { useEffect, useState } from 'react';
import { Task } from '../utils/interface';
import TaskForm from './TaskForm';
import { useDelete, useGet, usePost, usePut } from "../hooks/useFetch";
import { DELETE, GET, POST, PUT, TASKS_API } from '../api/config';
import { Button } from './ui/Button';
import Drawer from './common/Drawer';

const TaskManager: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [editingTask, setEditingTask] = useState<Task | undefined>(); // State to track editing task
    // State to manage the open/close status of the drawer
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [formState, setFormState] = useState<'edit' | 'add' | 'delete'>('add');
    const [filter, setFilter] = useState<'all' | 'To Do' | 'In Progress' | 'Done'>('all');
    const { data: getData, refresh: refreshGetData } = useGet(TASKS_API[GET], {}, {
        apiCall: "onload",
    });
    const { refresh: postData } = usePost(TASKS_API[POST]);
    const { refresh: putData } = usePut(TASKS_API[PUT]);
    const { refresh: deleteData } = useDelete(TASKS_API[DELETE]);

    useEffect(() => {
        if (getData) {
            setTasks(getData.response || []);
        }
    }, [getData]);

    const showAddDrawer = () => {
        setFormState('add');
        setIsDrawerOpen(true);
    }

    const showUdpateDrawer = (task: Task) => {
        setEditingTask(task); // Set the task to edit
        setFormState('edit');
        setIsDrawerOpen(true);
    };

    const taskDeleteDrawer = (task: Task) => {
        setEditingTask(task);
        setFormState('delete');
        setIsDrawerOpen(true);
    };

    const closeDrawer = () => {
        setEditingTask(undefined); // Clear editing task
        setIsDrawerOpen(false);
    };

    const taskAddHandler = (task: Task) => {
        //call api to delete the task
        postData({ data: task }, { refreshGetData, closeDrawer });
    };

    const taskEditHandler = (task: Task) => {
        //call api to edit the task
        putData({ data: task }, { refreshGetData, closeDrawer });
    };

    const taskDeleteHandler = () => {
        console.log(editingTask, 'sss');
        //call api to delete the task
        if (editingTask) {
            deleteData({ data: { _id: editingTask?._id } }, { refreshGetData, closeDrawer });
        }
    };

    return (
        <>
            <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
                <div className="w-full mb-1">
                    <div className="mb-4">
                        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">All Tasks</h1>
                    </div>
                    <div className="items-center justify-between block sm:flex md:divide-x md:divide-gray-100">
                        <div className="flex items-center mb-4 sm:mb-0"></div>
                        <Button onClick={showAddDrawer}>Add Task</Button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden shadow">
                            {tasks.length === 0 ? <h1 className='flex items-center justify-center text-2xl font-bold pt-4'>No Tasks Found</h1> :
                                <table className="min-w-full divide-y divide-gray-200 table-fixed">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase ">
                                                Title
                                            </th>
                                            <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase ">
                                                Description
                                            </th>
                                            <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase ">
                                                Status
                                            </th>
                                            <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase ">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {tasks.map(task => (
                                            <tr key={task._id} className="hover:bg-gray-100">
                                                <td className="w-1/5 p-4 text-sm font-normal text-gray-500 whitespace-nowrap">
                                                    <div className="text-base font-semibold text-gray-900">{task.title}</div>
                                                </td>
                                                <td className="w-3/5 p-4 overflow-hidden text-base font-normal text-gray-500">{task.description}</td>
                                                <td className="w-1/10 p-4 text-base font-medium text-gray-900 whitespace-nowrap">{task.status}</td>
                                                <td className="w-auto p-4 space-x-2 whitespace-nowrap">
                                                    <Button type='button' onClick={() => showUdpateDrawer(task)}> <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path></svg>Update</Button>
                                                    <Button type='button' onClick={() => taskDeleteDrawer(task)} variant="destructive"><svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>Delete</Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}>
                {formState === 'delete' ?
                    <DeletePopUp taskDeleteHandler={taskDeleteHandler} cancelHandler={() => setIsDrawerOpen(false)} /> :
                    <TaskForm onSubmit={formState === 'add' ? taskAddHandler : taskEditHandler} formState={formState} task={formState === 'edit' ? editingTask : undefined} closeForm={closeDrawer} />}
            </Drawer>

        </>
    );
};

export default TaskManager;


const DeletePopUp: React.FC<{ taskDeleteHandler: () => void, cancelHandler: () => void; }> = ({ taskDeleteHandler, cancelHandler }) => {
    return (
        <>
            <svg className="w-10 h-10 mt-8 mb-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <h3 className="mb-6 text-lg text-gray-500">Are you sure you want to delete this task?</h3>
            <Button type="button" variant="destructive" className='mr-2' onClick={taskDeleteHandler}>Yes, I am sure</Button>
            <Button type="button" variant="outline" onClick={cancelHandler}>No, Cancel</Button>
        </>
    )
};