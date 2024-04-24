import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BarChart, Users } from 'lucide-react';

const Sidebar = () => {
    const location = useLocation();

    // Define sidebar items as an array of objects
    const sidebarItems = [
        {
            label: "Dashboard",
            icon: <BarChart />,
            link: "/dashboard",
        },
        {
            label: "Users",
            icon: <Users />,
            link: "/dashboard/users",
        },
        // Add more sidebar items as needed
    ];

    return (
        <aside className="fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 hidden w-64 h-full pt-16 font-normal duration-75 lg:flex transition-width">
            <div className="relative flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200">
                <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
                    <div className="flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200">
                        <ul className="pb-2 space-y-2">
                            {/* Map through the sidebarItems array to generate dynamic sidebar items */}
                            {sidebarItems.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        to={item.link}
                                        className={`flex items-center p-2 text-base rounded-lg group ${location.pathname === item.link ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-100"
                                            }`}
                                    >
                                        {item.icon}
                                        <span className="ml-3">{item.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
