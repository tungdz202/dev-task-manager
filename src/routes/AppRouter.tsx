import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Dashboard } from '../pages/Dashboard';
import { DeveloperList } from '../pages/DeveloperList';
import { ProjectList } from '../pages/ProjectList';
import { TaskList } from '../pages/TaskList';

const AppRouter: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<string>(window.location.hash.slice(1) || 'dashboard');

    useEffect(() => {
        const handleHashChange = () => {
            setCurrentPage(window.location.hash.slice(1) || 'dashboard');
        };
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4">
                {currentPage === 'dashboard' && <Dashboard />}
                {currentPage === 'developers' && <DeveloperList />}
                {currentPage === 'projects' && <ProjectList />}
                {currentPage === 'tasks' && <TaskList />}
            </div>
        </>
    );
};

export default AppRouter;