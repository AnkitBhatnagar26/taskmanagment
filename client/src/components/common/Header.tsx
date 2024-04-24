import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser, removeUserSession } from '../../utils/common';
import { useAppSelector } from '../../store/redux/hooks';
import { selectAuthToken } from '../../store/redux/authSlice';


const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const auth = useAppSelector(selectAuthToken);
    const user = getUser();

    const handleToggle = () => {
        setIsOpen((prev) => !prev);
    };

    const signOutHandler = () => {
        removeUserSession();
        navigate('/');
    };

    return (
        <nav className="fixed z-30 w-full bg-white border-b border-gray-200">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start">
                        <button aria-expanded="true" aria-controls="sidebar" className="p-2 text-gray-600 rounded cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100  " >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                            <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                        <Link to="/dashboard" className="flex ml-2 md:mr-24">
                            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap">Task Management App</span>
                        </Link>
                    </div>
                    <div className="flex items-center">
                        <div className="hidden mr-3 -mb-1 sm:block">
                            <span></span>
                        </div>

                        <button type="button" className="p-2 text-gray-500 rounded-lg lg:hidden hover:text-gray-900 hover:bg-gray-100 ">
                            <span className="sr-only">Search</span>

                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                        </button>

                        <div className="flex items-center ml-3">
                            <div>
                                <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 " aria-expanded="false" onClick={handleToggle}>
                                    <span className="sr-only">Open user menu</span>
                                    <img className="w-8 h-8 rounded-full" src="/assets/images/81B29A.png" alt="user photo" />
                                </button>
                            </div>

                            <div className={`z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow ${isOpen ? 'block' : 'hidden'}`} style={{ position: 'absolute', inset: '0px auto auto 0px', margin: '0px', transform: `translate(${isOpen ? '1714px' : '1869px'}, 61px)` }}>
                                <div className="px-4 py-3" role="none">
                                    <p className="text-sm text-gray-900 " role="none">

                                    </p>
                                    <p className="text-sm font-medium text-gray-900 truncate " role="none">
                                        {user?.email}
                                    </p>
                                </div>
                                <ul className="py-1" role="none">
                                    <li>
                                        <a onClick={signOutHandler} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 " role="menuitem">Sign out</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
