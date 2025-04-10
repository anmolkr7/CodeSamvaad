import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from '../screens/Login';
import Register from '../screens/Register';
import { Home } from '../screens/Home.jsx';
import Project from '../screens/Project.jsx';
import UserAuth from '../auth/userAuth.jsx';

const AppRoutes = () => {
    return (
        
            <Routes>
                <Route path="/" element={<UserAuth><Home /></UserAuth>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/project" element={<UserAuth><Project /></UserAuth>} />
            </Routes>
        
    );
};

export default AppRoutes;