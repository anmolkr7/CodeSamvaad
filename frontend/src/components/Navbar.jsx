// src/components/Navbar.jsx
import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../context/userContext.jsx';
import axios from '../config/axios.js';

const Navbar = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        try {
            await axios.get('/users/logout');
            localStorage.removeItem('token');
            setUser(null);
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    // Hide Navbar entirely on /login and /register, or show minimal version
    if (location.pathname === '/login' || location.pathname === '/register' || location.pathname==='/') {
        return null; // Or a minimal logo-only version if desired
    }

    return (
        <nav className="p-2 bg-white flex items-center">
            <div className="h-16 w-28 flex items-center justify-center">
                <img
                    src="/logo.png"
                    alt="Logo"
                    className="h-full object-contain"
                />
            </div>
            {user && (
                <button
                    onClick={handleLogout}
                    className="ml-auto bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-700 transition-colors text-sm"
                >
                    Logout
                </button>
            )}
        </nav>
    );
};

export default Navbar;