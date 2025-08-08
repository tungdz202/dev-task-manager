import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {DeveloperList} from "../pages/DeveloperList";
import {ProjectList} from "../pages/ProjectList";
import {TaskList} from "../pages/TaskList";
import DevTaskDashboard from "../pages/Dashboard";


export const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<DevTaskDashboard />} />
            <Route path="/developers" element={<DeveloperList />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/tasks" element={<TaskList />} />
        </Routes>
    );
};

export default AppRouter;