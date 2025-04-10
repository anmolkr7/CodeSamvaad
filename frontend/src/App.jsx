// src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './context/userContext.jsx';
import Navbar from './components/Navbar.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

const App = () => {
    return (
        <UserProvider>
            <Router>
                <div className="h-screen flex flex-col overflow-hidden">
                    <Navbar />
                    <div className="flex-grow overflow-hidden">
                        <AppRoutes />
                    </div>
                </div>
            </Router>
        </UserProvider>
    );
};

export default App;