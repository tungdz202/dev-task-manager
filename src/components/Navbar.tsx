import React from 'react';

export const Navbar: React.FC = () => {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between">
                <h1 className="text-xl font-bold">Dev Task Management</h1>
                <div className="space-x-4">
                    <a href="#dashboard" className="hover:text-gray-300">Dashboard</a>
                    <a href="#developers" className="hover:text-gray-300">Developers</a>
                    <a href="#projects" className="hover:text-gray-300">Projects</a>
                    <a href="#tasks" className="hover:text-gray-300">Tasks</a>
                </div>
            </div>
        </nav>
    );
};