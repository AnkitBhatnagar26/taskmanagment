const TaskFilter: React.FC<{ onChangeFilter: (filter: 'all' | 'To Do' | 'In Progress' | 'Done') => void }> = ({
    onChangeFilter,
}) => {
    return (
        <select
            onChange={(e) => onChangeFilter(e.target.value as 'all' | 'To Do' | 'In Progress' | 'Done')}
            className="py-2 px-4 bg-blue-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <option value="all">All</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
        </select>
    );
};

export default TaskFilter 