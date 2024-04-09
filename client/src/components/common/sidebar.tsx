const SidebarItem: React.FC<{ children: any, onClick: () => void, active: boolean }> = ({ children, onClick, active = false }) => {
    return (
        <button
            onClick={onClick}
            className={`w-full py-2 px-4 text-left bg-gray-800 hover:bg-gray-700 focus:outline-none flex justify-between self-center ${active ? 'bg-gray-700' : ''
                }`}
        >
            {children}
        </button>
    );
};

export default SidebarItem