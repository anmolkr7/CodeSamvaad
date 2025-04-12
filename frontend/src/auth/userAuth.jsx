import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const UserAuth = ({ children }) => {
    const { user, loading } = useContext(UserContext);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (loading) return; // Wait for UserContext to load
        if (!token || !user) {
            navigate('/');
        }
    }, [loading, user, token, navigate]);

    if (loading) return <div>Loading...</div>;

    return <>{children}</>;
};

export default UserAuth;