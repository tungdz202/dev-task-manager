import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Sidebar: React.FC = () => {
    const location = useLocation();

    return (
        <div className="sidebar col-md-2">
            <h4 className="h4 mb-4">Menu</h4>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link
                        to="/"
                        className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                    >
                        Dashboard
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to="/developers"
                        className={`nav-link ${location.pathname === '/developers' ? 'active' : ''}`}
                    >
                        Developers
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to="/projects"
                        className={`nav-link ${location.pathname === '/projects' ? 'active' : ''}`}
                    >
                        Projects
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to="/tasks"
                        className={`nav-link ${location.pathname === '/tasks' ? 'active' : ''}`}
                    >
                        Tasks
                    </Link>
                </li>
            </ul>
        </div>
    );
};