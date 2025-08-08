import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {Dashboard} from "../pages/Dashboard";
import {DeveloperList} from "../pages/DeveloperList";
import {ProjectList} from "../pages/ProjectList";
import {TaskList} from "../pages/TaskList";


export const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/developers" element={<DeveloperList />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/tasks" element={<TaskList />} />
        </Routes>
    );
};

export default AppRouter;