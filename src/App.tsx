import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {Sidebar} from "./components/SideBar";
import AppRouter from "./routes/AppRouter";


const App: React.FC = () => {
    return (
        <BrowserRouter>
            <div className="container-fluid">
                <div className="row">
                    <Sidebar />
                    <div className="col-md-10">
                        <AppRouter />
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;