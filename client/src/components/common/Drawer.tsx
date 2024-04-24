import React, { useState } from "react";
import { Button } from "../ui/Button";

interface DrawerProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    children: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, setIsOpen, children }) => {
    // Function to toggle the drawer
    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className={`fixed top-0 right-0 z-40 w-full h-screen max-w-md p-4 overflow-y-auto bg-white transition-transform ${isOpen ? 'transform-none' : 'translate-x-full'}`} tabIndex={-1} aria-labelledby="drawer-label" aria-modal="true" role="dialog">
                <Button variant="icon" onClick={toggleDrawer}>
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                    <span className="sr-only">Close menu</span>
                </Button>
                {children}
            </div>
            {isOpen && <div className="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-30"></div>}
        </>
    );
};

export default Drawer;
